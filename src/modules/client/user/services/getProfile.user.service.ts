import { BadRequestException, HttpCode, Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { notFound, successResponse } from "src/common/utils/response.util";

@Injectable()
export class GetProfileService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getProfile(reqUser) {
        const { id, roleID } = reqUser
        // Nếu là admin, nurse, manager 
        let resultProfile: any = {}
        if (roleID === 4) {
            const parentInfo = await this.prisma.parent.findUnique({
                where: {
                    accountID: id
                },
                select: {
                    id: true,
                    fullname: true,
                    email: true,
                    phone: true,
                    createdAt: true,
                }
            })
            const studentOfParent = await this.prisma.student.findMany({
                where: {
                    parentId: parentInfo?.id
                },
                select: {
                    account: {
                        select: {
                            fullname: true,
                            email: true,
                            roleID: true,
                        }
                    },
                    classAssignments: {
                        orderBy: { academicYearID: "desc" },
                        select: {
                            class: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            })
            resultProfile = {
                parentInfo,
                studentOfParent
            }
        } else if (roleID === 5) {
            const studentProfile = await this.prisma.student.findUnique({
                where: {
                    accountID: id,

                },
                select: {
                    student_code: true,
                    dateOfBirth: true,
                    gender: true,
                    graduated: true,
                    account: {
                        select: {
                            fullname: true,
                            email: true,
                            roleID: true,
                        }
                    },
                    classAssignments: {
                        orderBy: { academicYearID: "desc" },
                        select: {
                            class: {
                                select: {
                                    name: true,
                                }
                            }
                        }
                    },
                    ParentInfo: {
                        select: {
                            fullname: true,
                            email: true,
                            phone: true,
                        }
                    }
                }
            })
            // Làm phẳng dữ liệu:
            resultProfile = {
                student_code: studentProfile?.student_code,
                dateOfBirth: studentProfile?.dateOfBirth,
                gender: studentProfile?.gender,
                graduated: studentProfile?.graduated,
                fullname: studentProfile?.account?.fullname,
                email: studentProfile?.account?.email,
                roleID: studentProfile?.account?.roleID,
                className: studentProfile?.classAssignments?.[0]?.class?.name || null,
                parentFullname: studentProfile?.ParentInfo?.fullname || null,
                parentEmail: studentProfile?.ParentInfo?.email || null,
                parentPhone: studentProfile?.ParentInfo?.phone || null,
            };
        } else {
            resultProfile = await this.prisma.account.findUnique({
                where: { id },
                select: {
                    id: true,
                    fullname: true,
                    email: true,
                    roleID: true
                }
            })
        }
        return successResponse(200, resultProfile, 'Lấy thông tin thành công')
    }
}