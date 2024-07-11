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

  @Get('/:uuid')
  findOneOtherInhabitant(@Param('uuid') oiUuid: string) {
    return this.otherInhabitantsService.findOneOtherInhabitant(oiUuid);
  }

  @Patch('/:uuid')
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
    @Param('uuid') oiUuid: string,
    @Body() updateOtherInhabitantDto: UpdateOtherInhabitantDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.otherInhabitantsService.updateOtherInhabitant(
      oiUuid,
      updateOtherInhabitantDto,
      file,
    );
  }

  @Delete('delete-other-inhabitant/:uuid')
  removeOtherInhabitant(@Param('uuid') oiUuid: string) {
    return this.otherInhabitantsService.removeOtherInhabitant(oiUuid);
  }
}
