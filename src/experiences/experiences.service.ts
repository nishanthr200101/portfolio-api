import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from './experience.entity';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(Experience)
    private readonly repo: Repository<Experience>,
  ) {}

  findAll() {
    return this.repo.find({ order: { sort_order: 'ASC' } });
  }

  create(dto: Partial<Experience>) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: Partial<Experience>) {
    const exp = await this.repo.findOne({ where: { id } });
    if (!exp) throw new NotFoundException();
    Object.assign(exp, dto);
    return this.repo.save(exp);
  }

  async remove(id: number) {
    const exp = await this.repo.findOne({ where: { id } });
    if (!exp) throw new NotFoundException();
    return this.repo.remove(exp);
  }
}
