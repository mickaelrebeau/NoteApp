import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository, UpdateResult } from 'typeorm';
import { Note } from './model/note.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  async getAll(options?: FindManyOptions<Note>): Promise<Note[]> {
    return this.noteRepository.find(options);
  }

  async getById(id: string): Promise<Note | null> {
    return await this.noteRepository.findOneBy({ id });
  }

  async create(note: Note): Promise<Note> {
    return await this.noteRepository.save(note);
  }

  async update(id: string, note: Note): Promise<UpdateResult> {
    return await this.noteRepository.update(id, note);
  }

  async delete(id: string): Promise<void> {
    await this.noteRepository.delete(id);
  }

  async getByTitle(title: string): Promise<Note | null> {
    return await this.noteRepository.findOneBy({ title });
  }
}
