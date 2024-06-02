import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { Express } from 'express';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('uploadImage/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id') productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000000,
            message: 'File is too large',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|gif|svg)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.filesService.uploadImage(file, productId);
  }
}
