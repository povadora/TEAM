import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { CreateOtherInhabitantDto } from './dto/create-other-inhabitant.dto';
import { UpdateOtherInhabitantDto } from './dto/update-other-inhabitant.dto';
import { OtherInhabitantsService } from './other-inhabitants.service';

@Controller('other-inhabitants')
export class OtherInhabitantsController {
  constructor(
    private readonly otherInhabitantsService: OtherInhabitantsService,
  ) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('oiProfilePhoto', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  createOtherInhabitant(
    @Body() createOtherInhabitantDto: CreateOtherInhabitantDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.otherInhabitantsService.createOtherInhabitant(
      createOtherInhabitantDto,
      file,
    );
  }

  @Get('all-other-inhabitants')
  findAllOtherInhabitants() {
    return this.otherInhabitantsService.findAllOtherInhabitants();
  }

  @Get('other-inhabitant/:id')
  findOneOtherInhabitant(@Param('id') id: string) {
    return this.otherInhabitantsService.findOneOtherInhabitant(+id);
  }

  @Patch('update-other-inhabitant/:id')
  @UseInterceptors(
    FileInterceptor('oiProfilePhoto', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  updateOtherInhabitant(
    @Param('id') id: string,
    @Body() updateOtherInhabitantDto: UpdateOtherInhabitantDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.otherInhabitantsService.updateOtherInhabitant(
      +id,
      updateOtherInhabitantDto,
      file,
    );
  }

  @Delete('delete-other-inhabitant/:id')
  removeOtherInhabitant(@Param('id') id: string) {
    return this.otherInhabitantsService.removeOtherInhabitant(+id);
  }
}
