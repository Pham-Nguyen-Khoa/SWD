import { BadRequestException, HttpCode, Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { CreateUserDto } from "../dto/create.user.admin.dto";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { hash } from "bcrypt"

@Injectable()
export class CreateUserService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async create(data: CreateUserDto) {
        try {
            // check Email Exist 
            const user = await this.prisma.account.findUnique({
                where: {
                    email: data.email
                }
            })
            if (user) {
                return errorResponse(400, `Email ${user.email} đã tồn tại`)
            }
            const hashPassword = await hash(data.password, 10);
            const newUser = await this.prisma.account.create({
                data: {
                    fullname: data.fullname,
                    email: data.email,
                    password: hashPassword,
                    roleID: Number(data.roleID),
                    // createdBy: reqUser.id
                }
            })
            const { password, ...result } = newUser
            if (!newUser) {
                return new BadRequestException('Tạo user không thành công');
            }
            return successResponse(200, result, 'Tạo user  thành công')
        } catch (error) {
            console.error('Create user error:', error);
            throw new BadRequestException(error)
        }

    }
}