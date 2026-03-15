import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly repo: Repository<Message>,
  ) {}

  create(dto: { name: string; email: string; message: string }) {
    const msg = this.repo.create(dto);
    return this.repo.save(msg);
  }

  findAll() {
    return this.repo.find({ order: { submitted_at: 'DESC' } });
  }

  async markRead(id: string) {
    const msg = await this.repo.findOne({ where: { id } });
    if (!msg) throw new NotFoundException();
    msg.is_read = true;
    return this.repo.save(msg);
  }

  async remove(id: string) {
    const msg = await this.repo.findOne({ where: { id } });
    if (!msg) throw new NotFoundException();
    return this.repo.remove(msg);
  }
}
