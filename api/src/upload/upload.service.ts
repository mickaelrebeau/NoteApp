import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { File } from './model/file.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
}
