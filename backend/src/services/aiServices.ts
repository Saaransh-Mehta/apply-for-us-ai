 import { Injectable } from '@nestjs/common';
import { Cohere } from '@langchain/cohere';
import 'dotenv/config';

export interface ResumeAnalysis {
    personalInfo: {
        name: string;
        email: string;
        phone: string;
        location: string;
        linkedin: string;
        portfolio: string;
    };
    professionalSummary: string;
    skills: {
        technical: string[];
        soft: string[];
        tools: string[];
        languages: string[];
    };
    experience: Array<{
        title: string;
        company: string;
        location: string;
        duration: string;
        responsibilities: string[];
        achievements: string[];
    }>;
    education: Array<{
        degree: string;
        institution: string;
        year: string;
        gpa: string;
        relevantCourses: string[];
    }>;
    projects: Array<{
        name: string;
        description: string;
        technologies: string[];
        link: string;
    }>;
    certifications: string[];
    achievements: string[];
    strengths: string[];
    weaknesses: string[];
    suggestedImprovements: string[];
    overallScore: number;
}

 export const  analyzeResume = async(resumeText: string): Promise<ResumeAnalysis> =>{
        const llm = new Cohere({
            apiKey: process.env.COHERE_API_KEY,
            model: 'command-r-plus',
        });

        const prompt = `You are an expert resume analyzer and career counselor. Analyze the following resume text and extract ALL relevant information into a structured JSON format.

RESUME TEXT:
${resumeText}

INSTRUCTIONS:
1. Extract personal information (name, email, phone, location, LinkedIn, portfolio/website)
2. Generate a concise professional summary (2-3 sentences)
3. Categorize skills into: technical skills, soft skills, tools/frameworks, and programming languages
4. Extract work experience with title, company, location, duration, key responsibilities, and achievements
5. Extract education details including degree, institution, graduation year, GPA (if mentioned), and relevant courses
6. Identify projects with name, description, technologies used, and links
7. List certifications and achievements
8. Analyze strengths and areas for improvement
9. Provide 3-5 actionable suggestions to improve the resume
10. Give an overall resume score out of 100 based on completeness, clarity, and impact

IMPORTANT: 
- If information is not available, use empty string "" or empty array []
- Be thorough and extract as much detail as possible
- Ensure all JSON keys match the exact structure shown below

Return ONLY valid JSON in this EXACT structure:
{
  "personalInfo": {
    "name": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "portfolio": ""
  },
  "professionalSummary": "",
  "skills": {
    "technical": [],
    "soft": [],
    "tools": [],
    "languages": []
  },
  "experience": [
    {
      "title": "",
      "company": "",
      "location": "",
      "duration": "",
      "responsibilities": [],
      "achievements": []
    }
  ],
  "education": [
    {
      "degree": "",
      "institution": "",
      "year": "",
      "gpa": "",
      "relevantCourses": []
    }
  ],
  "projects": [
    {
      "name": "",
      "description": "",
      "technologies": [],
      "link": ""
    }
  ],
  "certifications": [],
  "achievements": [],
  "strengths": [],
  "weaknesses": [],
  "suggestedImprovements": [],
  "overallScore": 0
}

ANALYZE THE RESUME NOW:`;

        const response = await llm.invoke(prompt);

        try {
            const jsonMatch = response.toString().match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No valid JSON found in response');
            }

            const parsedResponse: ResumeAnalysis = JSON.parse(jsonMatch[0]);
            return parsedResponse;
        } catch (error) {
            console.error('Error parsing AI response:', error);
            return {
                personalInfo: {
                    name: '',
                    email: '',
                    phone: '',
                    location: '',
                    linkedin: '',
                    portfolio: '',
                },
                professionalSummary: 'Unable to parse resume. Please check the format.',
                skills: {
                    technical: [],
                    soft: [],
                    tools: [],
                    languages: [],
                },
                experience: [],
                education: [],
                projects: [],
                certifications: [],
                achievements: [],
                strengths: [],
                weaknesses: ['Unable to analyze resume'],
                suggestedImprovements: ['Please ensure resume is in a standard format'],
                overallScore: 0,
            };
        }
    }