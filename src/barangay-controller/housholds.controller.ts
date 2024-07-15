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
import { CreateHouseholdDto } from "src/barangay-dto's/create-household.dto";
import { UpdateHouseholdDto } from "src/barangay-dto's/update-household.dto";
import { HouseholdsService } from 'src/barangay-service/households.service';
import { Inhabitant } from 'src/inhabitant/entities/inhabitant.entity';

@Controller('household')
export class HouseholdController {
  constructor(private readonly householdService: HouseholdsService) {}

  @Post('create-household')
  @UseInterceptors(
    FileInterceptor('householdPhoto', {
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
  createHousehold(
    @Body() createHouseholdDto: CreateHouseholdDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.householdService.createHousehold(createHouseholdDto, file);
  }

  // @Post('create-household')
  // @UseInterceptors(
  //   FileInterceptor('householdPhoto', {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: (req, file, cb) => {
  //         const uniqueSuffix =
  //           Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         cb(
  //           null,
  //           `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
  //         );
  //       },
  //     }),
  //   }),
  // )
  // createHousehold(
  //   @Body() createHouseholdDto: CreateHouseholdDto,
  //   @UploadedFile() file?: Express.Multer.File, // Optional file parameter
  // ) {
  //   return this.householdService.createHousehold(createHouseholdDto, file);
  // }

  @Get('all-household')
  findAllHousehold() {
    return this.householdService.findAllHousehold();
  }

  @Get('/:uuid')
  findOneHousehold(@Param('uuid') uuid: string) {
    return this.householdService.findOneHousehold(uuid);
  }

  @Patch('update-household/:uuid')
  @UseInterceptors(
    FileInterceptor('householdPhoto', {
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
  updateHousehold(
    @Param('uuid') uuid: string,
    @Body() updateHouseholdDto: UpdateHouseholdDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.householdService.updateHousehold(
      uuid,
      updateHouseholdDto,
      file,
    );
  }

  @Delete('delete-household/:uuid')
  removehousehold(@Param('uuid') uuid: string) {
    return this.householdService.removeHousehold(uuid);
  }

  @Get(':uuid/inhabitants')
  async findInhabitants(@Param('uuid') uuid: string): Promise<Inhabitant[]> {
    return this.householdService.findInhabitant(uuid);
  }
  //////
}
