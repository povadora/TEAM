import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOtherInhabitantDto } from './dto/create-other-inhabitant.dto';
import { UpdateOtherInhabitantDto } from './dto/update-other-inhabitant.dto';
import { OtherInhabitant } from './entities/other-inhabitant.entity';

@Injectable()
export class OtherInhabitantsService {
  constructor(
    @InjectRepository(OtherInhabitant)
    private readonly otherInhabitantRepository: Repository<OtherInhabitant>,
  ) {}

  async createOtherInhabitant(
    createOtherInhabitantDto: CreateOtherInhabitantDto,
    file: Express.Multer.File,
  ) {
    const otherInhabitant = this.otherInhabitantRepository.create({
      ...createOtherInhabitantDto,
      oiProfilePhoto: file ? file.filename : null,
    });
    return this.otherInhabitantRepository.save(otherInhabitant);
  }

  async findAllOtherInhabitants() {
    return this.otherInhabitantRepository.find();
  }

  async findOneOtherInhabitant(id: number) {
    const otherInhabitant = await this.otherInhabitantRepository.findOneBy({
      otherInhabitantId: id,
    });
    if (!otherInhabitant) {
      throw new NotFoundException(`Other Inhabitant with ID ${id} not found`);
    }
    return otherInhabitant;
  }

  async updateOtherInhabitant(
    id: number,
    updateOtherInhabitantDto: UpdateOtherInhabitantDto,
    file: Express.Multer.File,
  ) {
    const otherInhabitant = await this.findOneOtherInhabitant(id);
    if (!otherInhabitant) {
      throw new NotFoundException(`Other Inhabitant with ID ${id} not found`);
    }

    Object.assign(otherInhabitant, updateOtherInhabitantDto);
    if (file) {
      otherInhabitant.oiProfilePhoto = file.filename;
    }

    return this.otherInhabitantRepository.save(otherInhabitant);
  }

  async removeOtherInhabitant(id: number) {
    const result = await this.otherInhabitantRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Other Inhabitant with ID ${id} not found`);
    }
    return result;
  }
}
