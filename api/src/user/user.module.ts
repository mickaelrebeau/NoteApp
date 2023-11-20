import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './model/user.entity';
import { Note } from 'src/note/model/note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteModule } from 'src/note/note.module';
import { NoteService } from 'src/note/note.service';
import { UploadService } from 'src/upload/upload.service';
import { File } from 'src/upload/model/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Note]),
    TypeOrmModule.forFeature([File]),
    NoteModule,
  ],
  providers: [UserService, NoteService, UploadService],
  controllers: [UserController],
})
export class UserModule {}
