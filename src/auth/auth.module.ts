import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';
import { IConfig } from 'config';

const jwtConfig = <IConfig>config.get('jwt');

@Module({
  imports: [
    PassportModule.register(
      // will find the sub-class of PassportStrategy(Strategy) in the providers
      { defaultStrategy: 'jwt' },
    ), // PassportModule is what makes AuthGuard() works
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.get('secret'),
      signOptions: {
        expiresIn: jwtConfig.get('expiresIn'),
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}
