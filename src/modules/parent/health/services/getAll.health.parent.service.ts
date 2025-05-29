import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";



@Injectable()

export class GetAlLHealthProfileParentService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getAll(reqUser) {
        try {
            const parentEntity = await this.prisma.parent.findUnique({
                where: {
                    accountID: reqUser.id
                }
            })
            if (!parentEntity) {
                throw new Error('Phụ huynh không tồn tại');
            }
            const parentID = parentEntity?.id
            const students = await this.prisma.student.findMany({
                where: {
                    parentId: parentID,
                    healthProfile: {
                        isNot: null,
                    },
                },
                select: {
                    id: true,
                    student_code: true,
                    dateOfBirth: true,
                    gender: true,
                    graduated: true,
                    account: {
                        select: {
                            id: true,
                            fullname: true,
                            email: true,
                        },
                    },
                },
            });

            return successResponse(200, students, 'Lấy hồ sơ học sinh thành công')
        } catch (error) {
            console.log(error)
            return errorResponse(400, 'Lấy hồ sơ học sinh thất bại')

        }

    }
}