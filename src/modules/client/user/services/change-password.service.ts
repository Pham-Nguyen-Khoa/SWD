import { BadRequestException, HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { errorResponse, notFound, successResponse } from "src/common/utils/response.util";
import { ChangePasswordDto } from "../dto/change-password.dto";
import { compare, hash } from "bcrypt"


@Injectable()
export class ChangePasswordService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async changePassword(data: ChangePasswordDto, reqUser) {
        const { id } = reqUser
        const account = await this.prisma.account.findUnique({
            where: { id }
        })
        const verify = await compare(data.oldPassword, account?.password);
        if (!verify) {
            return errorResponse(400, "Mật khẩu cũ không đúng", "OLD_INCORRECT")
        }
        if (data.confirmPassword !== data.newPassword) {
            return errorResponse(400, 'Xác thực mật khẩu mới không trùng ')
        }
        if (data.newPassword === data.oldPassword) {
            return errorResponse(400, "Mật khẩu mới không được trùng với mật khẩu cũ", "NEW_NOT_MATCH_OLD")
        }
        const newPassword = await hash(data.newPassword, 10);
        try {
            await this.prisma.account.update({
                where: { id },
                data: {
                    password: newPassword
                }
            })
            return successResponse(200, 'Cập nhật mật khẩu thành công')
        } catch (error) {
            return errorResponse(400, 'Cập nhật mật khẩu thất bại')
        }
    }
}