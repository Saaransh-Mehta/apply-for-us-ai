import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { z } from "zod";
import 'dotenv/config';

const ResumeSchema = z.object({
    personalInfo: z.object({
        name: z.string().describe("Full name of the candidate"),
        email: z.string().describe("Email address"),
        phone: z.string().describe("Phone number"),
        location: z.string().describe("City, State or Country"),
        linkedin: z.string().optional().describe("LinkedIn profile URL"),
        portfolio: z.string().optional().describe("Portfolio or personal website URL"),
        github: z.string().optional().describe("GitHub profile URL")
    }),
    professionalSummary: z.string().describe("A concise 2-3 sentence professional summary"),
    skills: z.object({
        technical: z.array(z.string()).describe("Technical skills (programming languages, frameworks)"),
        soft: z.array(z.string()).describe("Soft skills (communication, leadership, etc.)"),
        tools: z.array(z.string()).describe("Tools and platforms (AWS, Docker, Git, etc.)"),
        languages: z.array(z.string()).describe("Programming languages")
    }),
    experience: z.array(z.object({
        title: z.string().describe("Job title"),
        company: z.string().describe("Company name"),
        location: z.string().describe("Job location"),
        duration: z.string().describe("Duration (e.g., Jan 2020 - Present)"),
        responsibilities: z.array(z.string()).describe("Key responsibilities and duties"),
        achievements: z.array(z.string()).describe("Notable achievements and accomplishments")
    })),
    education: z.array(z.object({
        degree: z.string().describe("Degree name (e.g., B.S. Computer Science)"),
        institution: z.string().describe("University or institution name"),
        year: z.string().describe("Graduation year or duration"),
        gpa: z.string().optional().describe("GPA if mentioned"),
        relevantCourses: z.array(z.string()).describe("Relevant courses if mentioned")
    })),
    projects: z.array(z.object({
        name: z.string().describe("Project name"),
        description: z.string().describe("Brief description of the project"),
        technologies: z.array(z.string()).describe("Technologies and tools used"),
        link: z.string().optional().describe("Project link (GitHub, live demo, etc.)")
    })),
    certifications: z.array(z.string()).describe("Professional certifications"),
    achievements: z.array(z.string()).describe("Awards, honors, or notable achievements"),
    strengths: z.array(z.string()).describe("Key strengths identified from the resume"),
    areasForImprovement: z.array(z.string()).describe("Suggestions to improve the resume"),
    overallScore: z.number().min(0).max(100).describe("Overall resume quality score (0-100)")
});

export type ResumeAnalysis = z.infer<typeof ResumeSchema>;

const llm = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: 'gemini-2.0-flash',
    temperature: 0
});

const structuredLLM = llm.withStructuredOutput(ResumeSchema, {
    name: "resume_analysis"
});

export const analyzeParsedText = async (parsedData: string): Promise<ResumeAnalysis> => {
    const systemPrompt = `You are an expert resume analyzer and career counselor with years of experience in recruitment and talent acquisition.

Your task is to thoroughly analyze the provided resume text and extract ALL relevant information into the structured format.

IMPORTANT INSTRUCTIONS:
1. Extract personal information accurately (name, email, phone, location, LinkedIn, portfolio, GitHub)
2. Generate a compelling professional summary that highlights the candidate's key strengths
3. Categorize skills properly:
   - Technical skills: Programming languages, frameworks, databases
   - Soft skills: Communication, leadership, teamwork, problem-solving
   - Tools: Development tools, cloud platforms, version control
   - Languages: Specific programming languages
4. Extract complete work experience with all details
5. List education with all available information
6. Identify projects with technologies used
7. List all certifications and achievements
8. Analyze strengths based on the resume content
9. Provide 3-5 actionable suggestions to improve the resume
10. Calculate an overall score (0-100) based on:
    - Completeness of information (30%)
    - Clarity and formatting (20%)
    - Impact and achievements (25%)
    - Skills relevance (15%)
    - Professional presentation (10%)

If any field is not found in the resume, use empty string "" for strings or empty array [] for arrays.
Be thorough and extract as much detail as possible.`;

    const humanPrompt = `Analyze the following resume text and extract all information in the structured JSON format:

RESUME TEXT:
${parsedData}

Please provide a complete and detailed analysis.`;

    try {
        const response = await structuredLLM.invoke([
            ["system", systemPrompt],
            ["human", humanPrompt]
        ]);

        return response as ResumeAnalysis;
    } catch (error) {
        console.error("Error in analyzeParsedText:", error);
        throw new Error(`Failed to analyze resume: ${error.message}`);
    }
};