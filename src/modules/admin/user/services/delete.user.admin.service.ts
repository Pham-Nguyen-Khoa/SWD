import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";



@Injectable()
export class DeleteUserAdminService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async delete(id: number) {
        try {
            // Check tài khoản tồn tại 
            const account = await this.prisma.account.findUnique({
                where: { id },
                include: {
                    Student: true,
                    Parent: true,
                }

            })
            if (!account) {
                return errorResponse(400, `Tài khoản id ${id} không tồn tại`);
            }
            if (account.Student) {
                await this.prisma.student.delete({
                    where: { accountID: id }
                })
                if (account.Student.parentId) {
                    await this.prisma.parent.delete({
                        where: { accountID: id }
                    })
                }
            } else if (account.Parent) {
                await this.prisma.student.updateMany({
                    where: { parentId: account.Parent.id },
                    data: {
                        parentId: null
                    }
                })
                await this.prisma.parent.delete({
                    where: { accountID: id }
                })
            }
            await this.prisma.account.delete({
                where: { id }
            })
            return successResponse(200, 'Xóa tài khoản thành công')
        } catch (error) {
            console.log(error)
            return error
        }
    }
}