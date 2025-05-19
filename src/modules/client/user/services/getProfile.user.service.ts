import { BadRequestException, HttpCode, Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { notFound, successResponse } from "src/common/utils/response.util";

@Injectable()
export class GetProfileService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getProfile(reqUser) {
        return "Profile"
        // const user = await this.prisma.user.findUnique({
        //     where: {
        //         id: reqUser.id,
        //     },
        //     select: {
        //         id: true,
        //         fullname: true,
        //         email: true,
        //         createdAt: true,
        //         updatedAt: true,
        //         role: {
        //             select: {
        //                 name: true
        //             },
        //         }
        //     },
        // })
        // if (!user) {
        //     return notFound("UserId không tìm thấy")
        // }
        // return successResponse(200, user, 'Lấy thông tin người dùng thành công')

    }
}