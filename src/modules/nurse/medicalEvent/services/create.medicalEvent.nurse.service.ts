import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { CreateMedicalEventNurseDTO } from "../dtos/create.medicalEvent.nurse.dto";
import { errorResponse } from "src/common/utils/response.util";


@Injectable()

export class CreateMedicalEventNurseService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async create(data: CreateMedicalEventNurseDTO, reqUser) {
        console.log(data)
        const {
            student_code,
            type,
            occurredAt,
            description,
            severity,
            hospitalName,
            transferredAt
        } = data
        //  Kiểm tra học sinh tồn tại 
        const studentEntity = await this.prisma.student.findFirst({
            where: {
                student_code
            },
            select: {
                id: true,
                account: {
                    select: {
                        id: true,
                        fullname: true
                    }
                },
                ParentInfo: {
                    select: {
                        fullname: true,
                        email: true,
                        phone: true
                    }
                }
            }
        })
        console.log(studentEntity)
        if (!studentEntity) {
            return errorResponse(400, "Không tìm thấy học sinh có mã số này", 'NOT_FOUND_STUDENT')
        }
        const newMedicalEvent = await this.prisma.medicalEvent.create({
            data: {
                studentID: studentEntity.id,
                type,
                occurredAt,
                description,
                severity,
                createdBy: reqUser.id
            }
        })
        if (severity === "HOSPITAL") {
            if (!hospitalName || !transferredAt) {
                return errorResponse(400, "Nhập tên bệnh viện và thười gian chuyển")
            }
            // Update medicalEvent status sang nhập viện 
            await this.prisma.medicalEvent.update({
                where: { id: newMedicalEvent.id },
                data: {
                    status: "HOSPITALIZED"
                }
            })
            // Tạo bảng ghi nhập viện
            const newHospital = await this.prisma.hospitalTransfer.create({
                data: {
                    medicalEventID: newMedicalEvent.id,
                    hospitalName,
                    transferredAt,
                    createdBy: reqUser.id
                }
            })
        }
    }
}