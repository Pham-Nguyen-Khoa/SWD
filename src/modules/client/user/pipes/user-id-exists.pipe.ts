import { Injectable } from '@nestjs/common';
import { UserQueryService } from '../services/user-query.service';
import { BaseIdExistsPipe } from 'src/common/pipes/id-exists.pipe';

@Injectable()
export class UserIdExistsPipe extends BaseIdExistsPipe {
    constructor(userQueryService: UserQueryService) {
        super((id) => userQueryService.findById(id), 'User');
    }
}