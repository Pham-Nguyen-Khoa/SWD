import { Injectable } from "@nestjs/common";
import { ChangePasswordDto } from "../dto/change-password.dto";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { compare, hash } from "bcrypt"
import { error } from "console";
import { errorResponse, successResponse } from "src/common/utils/response.util";


@Injectable()
export class ChangePasswordService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async changePassword(data: ChangePasswordDto, reqUser) {
        const { currentPassword, newPassword } = data
        const user = await this.prisma.account.findUnique({
            where: { id: reqUser.id }
        })
        const verify = await compare(currentPassword, user?.password);
        if (!verify) {
            return errorResponse(400, 'Mật khẩu cũ không chính xác')
        }
        // Hash Password
        const hashNewPassword = await hash(newPassword, 10);
        await this.prisma.account.update({
            where: { id: reqUser.id },
            data: {
                password: hashNewPassword,
                updatedBy: reqUser.id
            }
        })
        return successResponse(200, 'Đổi mật khẩu thành công')


    }
}