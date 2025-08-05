import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    ConfigModule, 
  ],
  providers: [
    AuthService,
    JwtStrategy,
    ConfigService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}



