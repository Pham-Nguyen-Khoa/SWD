
import {
  PipeTransform,
  Injectable,
  NotFoundException,
  ArgumentMetadata,
} from '@nestjs/common';

/**
 * Pipe kiểm tra ID có tồn tại trong DB không.
 * Dùng chung cho các entity như User, Product, Course,...
 */
@Injectable()
export class BaseIdExistsPipe implements PipeTransform {
  constructor(
    private readonly findById: (id: string | number) => Promise<any>,
    private readonly entityName = 'Entity',
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const result = await this.findById(value);
    if (!result) {
      throw new NotFoundException(`${this.entityName} with ID ${value} not found`);
    }
    return value;
  }
}