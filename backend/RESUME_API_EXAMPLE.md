# Resume Parser & AI Analysis API

## Endpoint

`POST /parser`

## Description

Upload a PDF resume and get back:

1. Raw parsed content from the PDF
2. **Structured JSON analysis** from AI (forced format with Zod schema)

---

## 📬 How to Test in Postman

### Request

- **Method**: `POST`
- **URL**: `http://localhost:3000/parser`
- **Body Type**: `form-data`
- **Key**: `file`
- **Value Type**: `File` (select PDF)

---

## ✅ Example Response (Structured JSON)

```json
{
  "success": true,
  "data": {
    "parsedContent": {
      "filename": "john_doe_resume.pdf",
      "pages": 2,
      "content": [
        {
          "pageContent": "Full text from page 1...",
          "metadata": { "pdf": {...} }
        }
      ]
    },
    "aiAnalysis": {
      "personalInfo": {
        "name": "John Doe",
        "email": "john.doe@email.com",
        "phone": "+1 (555) 123-4567",
        "location": "San Francisco, CA",
        "linkedin": "linkedin.com/in/johndoe",
        "portfolio": "johndoe.dev",
        "github": "github.com/johndoe"
      },
      "professionalSummary": "Experienced Full Stack Developer with 5+ years building scalable web applications using React, Node.js, and AWS. Strong problem-solving skills with a track record of delivering high-impact features for Fortune 500 companies.",
      "skills": {
        "technical": [
          "React",
          "Node.js",
          "TypeScript",
          "PostgreSQL",
          "MongoDB",
          "GraphQL",
          "REST APIs"
        ],
        "soft": [
          "Leadership",
          "Team Collaboration",
          "Problem Solving",
          "Communication",
          "Agile Methodologies"
        ],
        "tools": [
          "AWS",
          "Docker",
          "Kubernetes",
          "Git",
          "Jenkins",
          "Terraform",
          "VS Code"
        ],
        "languages": [
          "JavaScript",
          "TypeScript",
          "Python",
          "Java",
          "Go"
        ]
      },
      "experience": [
        {
          "title": "Senior Full Stack Developer",
          "company": "Tech Corp Inc.",
          "location": "San Francisco, CA",
          "duration": "January 2021 - Present",
          "responsibilities": [
            "Led development of microservices architecture serving 1M+ users",
            "Architected and implemented real-time notification system using WebSockets",
            "Mentored team of 5 junior developers on best practices"
          ],
          "achievements": [
            "Improved application performance by 40% through optimization",
            "Reduced deployment time from 2 hours to 15 minutes with CI/CD pipeline",
            "Received 'Employee of the Quarter' award for exceptional contributions"
          ]
        },
        {
          "title": "Full Stack Developer",
          "company": "StartupXYZ",
          "location": "Remote",
          "duration": "June 2019 - December 2020",
          "responsibilities": [
            "Built responsive React applications with TypeScript",
            "Developed RESTful APIs using Node.js and Express",
            "Implemented authentication and authorization using JWT"
          ],
          "achievements": [
            "Launched 3 major features ahead of schedule",
            "Reduced API response time by 60%"
          ]
        }
      ],
      "education": [
        {
          "degree": "Bachelor of Science in Computer Science",
          "institution": "Stanford University",
          "year": "2019",
          "gpa": "3.8/4.0",
          "relevantCourses": [
            "Data Structures & Algorithms",
            "Web Development",
            "Database Systems",
            "Machine Learning"
          ]
        }
      ],
      "projects": [
        {
          "name": "E-commerce Platform",
          "description": "Full-stack e-commerce application with payment integration, inventory management, and admin dashboard",
          "technologies": [
            "React",
            "Node.js",
            "PostgreSQL",
            "Stripe API",
            "AWS S3"
          ],
          "link": "github.com/johndoe/ecommerce-platform"
        },
        {
          "name": "Real-time Chat Application",
          "description": "WebSocket-based chat app with group messaging, file sharing, and emoji support",
          "technologies": [
            "React",
            "Socket.io",
            "Redis",
            "MongoDB"
          ],
          "link": "chatapp-demo.com"
        }
      ],
      "certifications": [
        "AWS Certified Solutions Architect - Associate",
        "Google Cloud Professional Cloud Architect",
        "MongoDB Certified Developer"
      ],
      "achievements": [
        "Open source contributor with 500+ GitHub stars across projects",
        "Speaker at ReactConf 2023",
        "Published technical articles with 10K+ views on Medium"
      ],
      "strengths": [
        "Strong full-stack development expertise with modern technologies",
        "Proven track record of improving application performance",
        "Leadership experience with mentoring junior developers",
        "Excellent problem-solving and system design skills",
        "Active contributor to open-source community"
      ],
      "areasForImprovement": [
        "Add more quantifiable metrics to achievements (e.g., percentage improvements, user counts)",
        "Include links to published articles or conference talks",
        "Consider adding a section for professional development or courses",
        "Expand on leadership experience with specific team sizes and outcomes",
        "Include keywords from target job descriptions to improve ATS compatibility"
      ],
      "overallScore": 88
    }
  }
}
```

---

## 🔒 Guaranteed JSON Structure

The AI response is **forced** to follow this exact structure using **Zod schema validation**:

### Key Features:

✅ **Type-safe** - TypeScript types generated from Zod schema  
✅ **Validated** - All fields conform to expected types  
✅ **Structured** - Consistent JSON format every time  
✅ **Complete** - All sections included (empty arrays if not found)  
✅ **Descriptive** - Each field has clear descriptions

### Schema Enforcement:

- Uses `llm.withStructuredOutput(ResumeSchema)` from LangChain
- Zod schema defines exact structure and types
- AI cannot deviate from the defined format
- Automatic parsing and validation

---

## Error Response

If something goes wrong:

```json
{
  "success": false,
  "message": "Error processing resume: <error details>"
}
```

---

## 🎯 Benefits

1. **Consistent Format**: Always get the same JSON structure
2. **Type Safety**: Full TypeScript support with `ResumeAnalysis` type
3. **Validation**: Zod ensures all fields match expected types
4. **Reliable**: No more parsing LLM responses manually
5. **Scalable**: Easy to add new fields to the schema

---

## 💡 Usage in Your Application

```typescript
import { ResumeAnalysis } from './services/aiServices';

// The response type is guaranteed
const result = await analyzeResume(file);
const analysis: ResumeAnalysis = result.data.aiAnalysis;

// Type-safe access to all fields
console.log(analysis.personalInfo.name);
console.log(analysis.skills.technical);
console.log(analysis.overallScore);
```
