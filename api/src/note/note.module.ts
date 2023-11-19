import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { Note } from './model/note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadModule } from 'src/upload/upload.module';
import { UploadService } from 'src/upload/upload.service';
import { File } from 'src/upload/model/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Note]),
    TypeOrmModule.forFeature([File]),
    UploadModule,
  ],
  providers: [NoteService, UploadService],
  controllers: [NoteController],
})
export class NoteModule {}
