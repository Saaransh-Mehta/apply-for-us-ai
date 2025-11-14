import { Injectable } from '@nestjs/common';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

@Injectable()
export class ParserService {
    async parseResume(file: Express.Multer.File) {
        console.log("Received file for parsing:", {
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size
        });

        if (file.mimetype !== 'application/pdf') {
            throw new Error('Only PDF files are supported');
        }

     
        const uint8Array = new Uint8Array(file.buffer);
        const blob = new Blob([uint8Array], { type: 'application/pdf' });
        
        const loader = new PDFLoader(blob);

        const documents = await loader.load();
        
        
        return {
            filename: file.originalname,
            pages: documents.length,
            content: documents.map(doc => ({
                pageContent: doc.pageContent,
                metadata: doc.metadata
            }))
        };
    }
}
