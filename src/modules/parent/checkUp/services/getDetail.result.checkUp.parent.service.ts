import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { DateHelper } from "src/helpers/date.helper";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { GetDetailResultCheckUpNurseService } from "src/modules/nurse/checkUp/services/getDetail.result.checkUp.nurse.service";


@Injectable()
export class GetDetailResultCheckUpParentService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly GetDetailResultCheckUpNurseService: GetDetailResultCheckUpNurseService

    ) { }
    async getDetailCheckupResult(checkupID: number, studentID: number) {
        const result = await this.GetDetailResultCheckUpNurseService.getDetailCheckupResult(+checkupID, +studentID)
        return successResponse(200, result, 'Lấy kết quả khám sức khỏe thành công')
    }


}