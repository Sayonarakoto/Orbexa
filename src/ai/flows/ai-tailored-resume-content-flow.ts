'use server';
/**
 * @fileOverview A Genkit flow for generating tailored resume content based on a job description and user keywords.
 *
 * - aiTailoredResumeContent - A function that generates tailored resume content.
 * - AiTailoredResumeContentInput - The input type for the aiTailoredResumeContent function.
 * - AiTailoredResumeContentOutput - The return type for the aiTailoredResumeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExistingResumeSectionsSchema = z
  .object({
    summary: z.string().optional().describe('Existing summary statement.'),
    experience: z
      .array(z.string())
      .optional()
      .describe('Existing experience bullet points.'),
    education: z
      .array(z.string())
      .optional()
      .describe('Existing education bullet points.'),
    skills: z.array(z.string()).optional().describe('Existing skills.'),
    // Add more sections as needed
  })
  .optional()
  .describe('Optional existing resume content to be considered for tailoring.');

const AiTailoredResumeContentInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The job description for which the resume content should be tailored.'),
  userKeywords: z
    .array(z.string())
    .optional()
    .describe('Optional keywords provided by the user to emphasize in the tailored content.'),
  existingResumeSections: ExistingResumeSectionsSchema,
});
export type AiTailoredResumeContentInput = z.infer<
  typeof AiTailoredResumeContentInputSchema
>;

const AiTailoredResumeContentOutputSchema = z.object({
  suggestedSummary: z
    .string()
    .describe('A suggested summary statement tailored to the job description and keywords.'),
  suggestedBulletPoints: z
    .record(z.string(), z.array(z.string()))
    .describe(
      'Suggested bullet points for various resume sections (e.g., experience, education) tailored to the job.'
    ),
});
export type AiTailoredResumeContentOutput = z.infer<
  typeof AiTailoredResumeContentOutputSchema
>;

export async function aiTailoredResumeContent(
  input: AiTailoredResumeContentInput
): Promise<AiTailoredResumeContentOutput> {
  return aiTailoredResumeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiTailoredResumeContentPrompt',
  input: {schema: AiTailoredResumeContentInputSchema},
  output: {schema: AiTailoredResumeContentOutputSchema},
  prompt: `You are an expert resume writer. Your task is to generate and suggest resume content (summary statement and bullet points for various sections) that is highly tailored to a specific job description and user-provided keywords. The goal is to maximize relevance and increase the candidate's chances of selection.

---
Job Description:
{{{jobDescription}}}

---
{{#if userKeywords}}
Keywords to emphasize:
{{#each userKeywords}}- {{{this}}}
{{/each}}

---
{{/if}}
Existing Resume Content (use this as a base, improve upon it, or add new relevant points):
{{#if existingResumeSections}}
  {{#if existingResumeSections.summary}}
  Summary: {{{existingResumeSections.summary}}}
  {{/if}}
  {{#if existingResumeSections.experience}}
  Experience:
  {{#each existingResumeSections.experience}}
  - {{{this}}}
  {{/each}}
  {{/if}}
  {{#if existingResumeSections.education}}
  Education:
  {{#each existingResumeSections.education}}
  - {{{this}}}
  {{/each}}
  {{/if}}
  {{#if existingResumeSections.skills}}
  Skills:
  {{#each existingResumeSections.skills}}
  - {{{this}}}
  {{/each}}
  {{/if}}
{{else}}
No existing resume content provided. Generate content from scratch based on the job description and keywords.
{{/if}}

---
Based on the above, generate a suggested summary statement and suggested bullet points for relevant sections (e.g., experience, education, skills). Ensure the suggestions are concise, impactful, and directly address the job description and incorporate the provided keywords. If no existing content is provided for a section, generate new content for it. Only provide suggestions for sections that are relevant to the job description.

Output MUST be a JSON object conforming to the following schema:
{{jsonSchema output}}`,
});

const aiTailoredResumeContentFlow = ai.defineFlow(
  {
    name: 'aiTailoredResumeContentFlow',
    inputSchema: AiTailoredResumeContentInputSchema,
    outputSchema: AiTailoredResumeContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
