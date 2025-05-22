import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { errorResponse, notFound, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";



@Injectable()
export class GetDetailUserAdminService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getDetailUser(id: number) {
        console.log("hello")
        try {
            // Check coi có user có tồn tại ko 
            const userExist = await this.prisma.account.findUnique({
                where: {
                    id
                },
                select: {
                    id: true,
                    fullname: true,
                    email: true,
                    roleID: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true
                }
            })
            let result: any = userExist;
            if (!userExist) {
                return errorResponse(400, `User id ${id} không tồn tại trong hệ thống`)
            }

            // Nếu là học sinh join bảng student và parentInfo để lấy thêm thông tin 
            if (userExist.roleID === 5) {
                const student = await this.prisma.student.findUnique({
                    where: {
                        accountID: userExist.id
                    },
                    include: {
                        ParentInfo: {
                            select: {
                                id: true,
                                fullname: true,
                                email: true,
                                phone: true
                            }
                        },

                    }
                })
                result = {
                    ...userExist,
                    ...student,
                }

            }
            // Nếu là 
            if (userExist.roleID === 4) {
                const parent = await this.prisma.parent.findUnique({
                    where: {
                        accountID: userExist.id
                    }
                })
                result = {
                    ...userExist,
                    ...parent
                }
            }
            return successResponse(200, result, 'Lấy thông tin chi tiết thành công')
        } catch (error) {
            console.log(error)
            throw error
        }


        // Kiểm tra role để lấy đầy đủ thông tin 

        return "Detail User"
    }


}