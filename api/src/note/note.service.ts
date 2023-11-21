import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Note } from './model/note.entity';
import { UploadService } from 'src/upload/upload.service';

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

  async update(
    id: string,
    note: Note,
    newFiles: Express.Multer.File[],
  ): Promise<UpdateResult> {
    const existingNote = await this.getById(id);

    const updatedNote = {
      title: note.title,
      description: note.description,
      label: note.label,
    };

    const noteUpdateResult = await this.noteRepository.update(id, updatedNote);

    if (newFiles && newFiles.length > 0) {
      const uploadedFiles = await this.fileService.addFilesToNote(id, newFiles);

      existingNote.files = uploadedFiles;

      await this.noteRepository.save(existingNote);
    }

    return noteUpdateResult;
  }

  async delete(id: string): Promise<DeleteResult> {
    const note = await this.getById(id);

    const files = await this.fileService.getByNoteId(note.id);

    for (let i = 0; i < files.length; i++) {
      await this.fileService.delete(files[i].id);
    }

    return await this.noteRepository.delete(id);
  }

  async destroyFiles(id: string): Promise<void> {
    const note = await this.getById(id);

    const files = await this.fileService.getByNoteId(note.id);

    for (let i = 0; i < files.length; i++) {
      await this.fileService.delete(files[i].id);
    }
  }

  async getByTitle(title: string): Promise<Note | null> {
    return await this.noteRepository.findOneBy({ title });
  }
}
