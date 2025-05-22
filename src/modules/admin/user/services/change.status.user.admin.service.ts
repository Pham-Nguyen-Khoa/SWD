import { Injectable } from "@nestjs/common";
import { ChangeAccountStatusDto } from "../dto/change-status.admin.dto";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";



@Injectable()

export class ChangeStatusUserAdminService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async changeStatus(data: any, reqUser) {
        try {
            const { id, status } = data
            const account = await this.prisma.account.findUnique({
                where: { id },
            });
            if (!account) {
                return errorResponse(400, `Account id ${id} không tồn tại`);
            }
            if (account.roleID === 1) {
                return errorResponse(400, `Tài khoản admin không thể cập nhật `);
            }

            const updatedAccount = await this.prisma.account.update({
                where: { id },
                data: {
                    status: status,
                    updatedBy: reqUser.id
                },
                select: {
                    fullname: true,
                    email: true,
                    roleID: true,
                    status: true,
                    updatedBy: true,
                    createdBy: true,
                    updatedAt: true,
                    createdAt: true
                }
            })
            return successResponse(200, updatedAccount, 'Update trạng thái tài khoản thành công')
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}