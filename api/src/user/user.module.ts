import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './model/user.entity';
import { Note } from 'src/note/model/note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteModule } from 'src/note/note.module';
import { NoteService } from 'src/note/note.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Note]),
    NoteModule,
  ],
  providers: [UserService, NoteService],
  controllers: [UserController],
})
export class UserModule {}
