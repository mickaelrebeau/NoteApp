import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository, UpdateResult } from 'typeorm';
import { Note } from './model/note.entity';
import { UploadService } from 'src/upload/upload.service';
import { unlinkSync } from 'fs';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
    private fileService: UploadService,
  ) {}

  async getAll(options?: FindManyOptions<Note>): Promise<Note[]> {
    return this.noteRepository.find(options);
  }

  async getById(id: string): Promise<Note | null> {
    const note = await this.noteRepository.findOneBy({ id });
    const files = await this.fileService.getByNoteId(note.id);

    note.files = files;
    return note;
  }

  async create(note: Note): Promise<Note> {
    return await this.noteRepository.save(note);
  }

  async update(id: string, note: Note): Promise<UpdateResult> {
    return await this.noteRepository.update(id, note);
  }

  async delete(id: string): Promise<void> {
    const note = await this.getById(id);

    const files = await this.fileService.getByNoteId(note.id);

    for (let i = 0; i < files.length; i++) {
      unlinkSync(files[i].path);

      await this.fileService.delete(files[i].id);
    }

    await this.noteRepository.delete(id);
  }

  async getByTitle(title: string): Promise<Note | null> {
    return await this.noteRepository.findOneBy({ title });
  }
}
