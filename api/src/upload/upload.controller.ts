import { Controller, Delete, Param } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('files')
export class UploadController {
    constructor(private fileService: UploadService) { }
    
    @Delete(':idFile')
    destroyFile(@Param('idFile') id: string) {
        return this.fileService.delete(id);
    }
}
