import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { UpdateProfileParentDto } from "../dtos/updateProfile.parent.dto";


@Injectable()
export class UpdatedProfileParentService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async updated(reqUser, data: UpdateProfileParentDto) {
        const parentOld = await this.prisma.parent.findFirst({
            where: {
                accountID: reqUser.id
            },
            select: {
                id: true,
                email: true,
                phone: true,
            }
        })
        if (!parentOld) return
        const student = await this.prisma.student.findFirst({
            where: {
                parentId: parentOld?.id
            },
            select: {
                parentInfoID: true
            }
        })
        const updates: any = [];
        if (data.email && data.email !== parentOld.email) {
            // Check email tồn tại chưa 
            const checkEmailExist = await this.prisma.account.findFirst({
                where: {
                    email: data.email
                }
            })
            if (checkEmailExist) {
                return errorResponse(400, 'Email này đã tồn tại trong hệ thống')
            }
            updates.push(
                this.prisma.account.update({
                    where: { id: reqUser.id },
                    data: {
                        email: data.email
                    }
                }),
                this.prisma.parent.update({
                    where: { accountID: reqUser.id },
                    data: {
                        email: data.email,
                    }
                }),
                this.prisma.parentInfo.update({
                    where: {
                        id: student?.parentInfoID
                    },
                    data: {
                        email: data.email,
                    }
                })
            )
        }
        if (data.phone && data.phone !== parentOld.phone) {
            // Check phone tồn tại chưa 
            const checkPhoneExist = await this.prisma.parent.findFirst({
                where: {
                    phone: data.phone
                }
            })
            if (checkPhoneExist) {
                return errorResponse(400, 'Phone number này đã tồn tại trong hệ thống')
            }
            updates.push(
                this.prisma.parent.update({
                    where: { accountID: reqUser.id },
                    data: {
                        phone: data.phone,
                    }
                }),
                this.prisma.parentInfo.update({
                    where: {
                        id: student?.parentInfoID
                    },
                    data: {
                        phone: data.phone
                    }
                })
            )
        }


        if (updates.length === 0) {
            return errorResponse(400, 'Không có gì thay đổi');
        }

        await this.prisma.$transaction(updates);
        return successResponse(200, 'Update thông tin thành công')
    }
}