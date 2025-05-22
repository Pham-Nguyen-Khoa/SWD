import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RegisterDto } from "../dto/register.dto";
import { PrismaService } from "src/libs/prisma/prisma.service";

import { hash } from "bcrypt"
import { notFound, successResponse } from "src/common/utils/response.util";

@Injectable()
export class RegisterService {
    constructor(
        private prisma: PrismaService
    ) { }
    async register(data: RegisterDto) {
        try {
            // Check tài khoản tồn tại
            const user = await this.prisma.account.findUnique({
                where: {
                    email: data.email
                }
            })
            if (user) {
                throw new HttpException({ message: 'Email đã tồn tại' }, HttpStatus.BAD_REQUEST)
            }
            // Check có phải là phụ huynh của học sinh trong trường không 
            const parentInfo = await this.prisma.parentInfo.findUnique({
                where: {
                    fullname: data.fullname,
                    email: data.email,
                }
            })

            // Không tìm thấy thông tin match 
            if (!parentInfo) {
                return notFound('Thông tin phụ huynh không trùng khớp với dữ liệu của học sinh trong trường')
            }

            // Match thông tin học sinh cung cấp bắt đầu tạo tài khoản cho phụ huynh
            // Hash Password
            const hashPassword = await hash(data.password, 10);
            // Tạo account
            const newAccount = await this.prisma.account.create({
                data: {
                    fullname: data.fullname,
                    email: data.email,
                    password: hashPassword,
                    roleID: 4,
                }
            })

            // Parent 
            const newParrent = await this.prisma.parent.create({
                data: {
                    fullname: parentInfo.fullname,
                    email: parentInfo.email,
                    phone: parentInfo.phone,
                    accountID: newAccount.id
                }
            })
            const students = await this.prisma.student.findMany({
                where: {
                    parentInfoID: parentInfo.id
                }
            })
            await Promise.all(
                students.map(student =>
                    this.prisma.student.update({
                        where: { id: student.id },
                        data: { parentId: newParrent.id },
                    }),
                ),
            );
            await this.prisma.parentInfo.update({
                where: {
                    id: parentInfo.id
                },
                data: {
                    isRegistered: true
                }
            })
            return successResponse(200, 'Tạo tài khoản thành công')
        } catch (error) {
            console.log(error)
            throw error
        }



        // return newUser
    }
}   