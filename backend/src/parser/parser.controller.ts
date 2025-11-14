import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParserService } from './parser.service';
import { analyzeResume } from 'src/services/aiServices';

@Controller('parser')
export class ParserController {
    constructor(private readonly parseService: ParserService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async parseResume(@UploadedFile() file: Express.Multer.File) {
        console.log("Received file:", file);
        
        if (!file) {
            return {
                success: false,
                message: "No file uploaded. Please upload a PDF file with the key 'file'"
            };
        }

        const parsedFile = await this.parseService.parseResume(file);
        const result = await analyzeResume(parsedFile.content.map(page => page.pageContent).join('\n'));

        return {
            success: true,
            data: result
        };
        
    }
}
