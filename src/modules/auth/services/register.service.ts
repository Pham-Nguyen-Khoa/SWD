import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RegisterDto } from "../dto/register.dto";
import { PrismaService } from "src/libs/prisma/prisma.service";

import { hash } from "bcrypt"

@Injectable()
export class RegisterService {
    constructor(
        private prisma: PrismaService
    ) { }
    async register(data: RegisterDto) {
        // Check tài khoản tồn tại
        const user = await this.prisma.account.findUnique({
            where: {
                email: data.email
            }
        })
        if (user) {
            throw new HttpException({ message: 'Email đã tồn tại' }, HttpStatus.BAD_REQUEST)
        }

        // Hash Password
        const hashPassword = await hash(data.password, 10);
        const newUser = await this.prisma.account.create({
            data: {
                email: data.email,
                fullname: data.fullname,
                password: hashPassword,
                roleID: 5,
                // createdBy: "User"
            }
        })

        return newUser
    }
}   