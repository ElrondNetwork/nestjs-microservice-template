import { ArgumentMetadata, HttpException, HttpStatus, PipeTransform } from "@nestjs/common";

export class ParseTokenValidationPipe implements PipeTransform<string | undefined, Promise<string | undefined>> {
  transform(value: string | undefined, _: ArgumentMetadata): Promise<string | undefined> {
    return new Promise(resolve => {
      if (value === undefined || value === '') {
        return resolve(undefined);
      }

      if (value.split('-').length === 2) {
        return resolve(value);
      }

      throw new HttpException('Invalid token format', HttpStatus.BAD_REQUEST);
    });
  }
}
