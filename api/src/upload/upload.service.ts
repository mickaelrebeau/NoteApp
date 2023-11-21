import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { File } from './model/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { unlinkSync } from 'fs';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async uploadFiles(files: Express.Multer.File[]): Promise<File[]> {
    const newFiles = await this.fileRepository.save(files);
    return newFiles;
  }

  getByNoteId(id: string) {
    return this.fileRepository.find({ where: { note: { id } } });
  }

  async delete(id: string) {
    const file = await this.fileRepository.findOneBy({ id });
    if (file) {
      unlinkSync(file.path);
    }
    return this.fileRepository.delete(id);
  }

  async addFilesToNote(
    noteId: string,
    files: Express.Multer.File[],
  ): Promise<File[]> {
    const existingFiles = await this.getByNoteId(noteId);

    const uploadedFiles = await this.uploadFiles(files);

    const combinedfiles = existingFiles.concat(uploadedFiles);

    return combinedfiles;
  }
}
