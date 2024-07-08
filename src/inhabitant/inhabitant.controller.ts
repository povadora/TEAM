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
import { CreateInhabitantDto } from './dto/create-inhabitant.dto';
import { UpdateInhabitantDto } from './dto/update-inhabitant.dto';
import { InhabitantService } from './inhabitant.service';

@Controller('inhabitant')
export class InhabitantController {
  constructor(private readonly inhabitantService: InhabitantService) {}

  @Post('create-inhabitant')
  @UseInterceptors(
    FileInterceptor('profilePhoto', {
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
  createInhabitant(
    @Body() createInhabitantDto: CreateInhabitantDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.inhabitantService.createInhabitant(createInhabitantDto, file);
  }

  @Get('all-inhabitants')
  findAllInhabitant() {
    return this.inhabitantService.findAllInhabitants();
  }

  @Get('inhabitant/:uuid')
  findOneInhabitant(@Param('uuid') uuid: string) {
    return this.inhabitantService.findOneInhabitant(uuid);
  }

  @Patch('update-inhabitant/:uuid')
  @UseInterceptors(
    FileInterceptor('profilePhoto', {
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
  updateInhabitant(
    @Param('uuid') uuid: string,
    @Body() updateInhabitantDto: UpdateInhabitantDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.inhabitantService.updateInhabitant(
      uuid,
      updateInhabitantDto,
      file,
    );
  }

  @Delete('delete-inhabitant/:uuid')
  removeInhabitant(@Param('uuid') uuid: string) {
    return this.inhabitantService.removeInhabitant(uuid);
  }
}
