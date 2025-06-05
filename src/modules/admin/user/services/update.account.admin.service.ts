import { Injectable } from "@nestjs/common";
import { UpdateUserDto } from "../dto/update.user.admin.dto";


@Injectable()
export class UpdateUserAdminService {
    async update(data: UpdateUserDto, reqUser) {

    }
}