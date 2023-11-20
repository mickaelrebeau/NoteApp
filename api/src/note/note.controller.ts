import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { NoteService } from './note.service';
import { Note } from './model/note.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadService } from 'src/upload/upload.service';

@Controller('note')
export class NoteController {
  constructor(
    private readonly noteService: NoteService,
    private readonly fileService: UploadService,
  ) {}

  @Get()
  getAll(): Promise<Note[]> {
    return this.noteService.getAll({
      relations: ['files'],
    });
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Note | null> {
    return this.noteService.getById(id);
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          const date = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename: string = `${
            file.originalname.split('.')[0]
          }-${date}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async create(
    @Body() note: Note,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<any> {
    const newFiles = await this.fileService.uploadFiles(files);
    note.files = newFiles;
    const newNote = this.noteService.create(note);
    return newNote;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() note: Note): Promise<UpdateResult> {
    return this.noteService.update(id, note);
  }

  @Delete(':id')
  destroy(@Param('id') id: string): Promise<void> {
    return this.noteService.delete(id);
  }
}
