import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParserService } from './parser.service';
import { analyzeParsedText, ResumeAnalysis } from 'src/services/aiServices';

@Controller('parser')
export class ParserController {
    constructor(private readonly parseService: ParserService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async parseResume(@UploadedFile() file: Express.Multer.File): Promise<{
        success: boolean;
        message?: string;
        data?: {
            parsedContent: any;
            aiAnalysis: ResumeAnalysis;
        };
    }> {
        console.log("Received file:", file);
        
        if (!file) {
            return {
                success: false,
                message: "No file uploaded. Please upload a PDF file with the key 'file'"
            };
        }

        try {
            const parsedFile = await this.parseService.parseResume(file);
            
            const resumeText = parsedFile.content
                .map(page => page.pageContent)
                .join('\n\n');
            
            const aiAnalysis = await analyzeParsedText(resumeText);

            return {
                success: true,
                data: {
                    parsedContent: parsedFile,
                    aiAnalysis: aiAnalysis
                }
            };
        } catch (error) {
            console.error("Error processing resume:", error);
            return {
                success: false,
                message: `Error processing resume: ${error.message}`
            };
        }
    }
}
