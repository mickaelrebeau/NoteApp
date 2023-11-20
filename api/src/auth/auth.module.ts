import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/model/user.entity';
import { UserService } from 'src/user/user.service';
import { Note } from 'src/note/model/note.entity';
import { NoteService } from 'src/note/note.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { UploadService } from 'src/upload/upload.service';
import { File } from 'src/upload/model/file.entity';

dotenv.config();

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Note]),
    TypeOrmModule.forFeature([File]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, UserService, NoteService, UploadService],
  controllers: [AuthController],
})
export class AuthModule {}
