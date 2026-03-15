import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AdminUser } from './admin-user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminUser)
    private readonly users: Repository<AdminUser>,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.users.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwt.sign(payload) };
  }
}
