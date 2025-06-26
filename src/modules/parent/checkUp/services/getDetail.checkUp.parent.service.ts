import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { DeclinedCheckUpParentDto } from "../dtos/declined.checkUp.parent.dto";
import { GetDetailCheckUpNurseService } from "src/modules/nurse/checkUp/services/getDetail.checkUp.nurse.service";




@Injectable()
export class DetailCheckUpParentService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly getDetailCheckUpNurseService: GetDetailCheckUpNurseService
    ) { }
    async detail(id: number,) {
        const result = await this.getDetailCheckUpNurseService.getDetail(+id);
        delete result.data.vaccineEventStock;
        delete result.data.studentResponseEntity;
        delete result.data.studentResponseCount;
        return successResponse(200, result, 'Lấy chi tiết khám sức khỏe định kỳ thành công')
    }
}