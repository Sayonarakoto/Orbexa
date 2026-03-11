'use server';
/**
 * @fileOverview A Genkit flow for generating impactful bullet points for work experience.
 *
 * - generateExperienceBulletPoints - A function that handles the generation of bullet points.
 * - AiGeneratedExperienceBulletPointsInput - The input type for the generateExperienceBulletPoints function.
 * - AiGeneratedExperienceBulletPointsOutput - The return type for the generateExperienceBulletPoints function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiGeneratedExperienceBulletPointsInputSchema = z.object({
  role: z.string().describe('The job role or title.'),
  company: z.string().describe('The name of the company.'),
  responsibilities: z.string().describe('A detailed description of the responsibilities and duties performed in this role.'),
  achievements: z.string().optional().describe('Optional: Specific achievements or quantifiable results from this role.'),
  jobDescriptionKeywords: z.array(z.string()).optional().describe('Optional: Keywords from the target job description to incorporate.').default([]),
});
export type AiGeneratedExperienceBulletPointsInput = z.infer<typeof AiGeneratedExperienceBulletPointsInputSchema>;

const AiGeneratedExperienceBulletPointsOutputSchema = z.object({
  bulletPoints: z.array(z.string()).describe('A list of impactful, achievement-oriented bullet points for the work experience.'),
});
export type AiGeneratedExperienceBulletPointsOutput = z.infer<typeof AiGeneratedExperienceBulletPointsOutputSchema>;

export async function generateExperienceBulletPoints(input: AiGeneratedExperienceBulletPointsInput): Promise<AiGeneratedExperienceBulletPointsOutput> {
  return aiGeneratedExperienceBulletPointsFlow(input);
}

const aiGeneratedExperienceBulletPointsPrompt = ai.definePrompt({
  name: 'aiGeneratedExperienceBulletPointsPrompt',
  input: {schema: AiGeneratedExperienceBulletPointsInputSchema},
  output: {schema: AiGeneratedExperienceBulletPointsOutputSchema},
  prompt: `You are an expert resume writer. Your task is to generate 3-5 impactful, achievement-oriented bullet points for a work experience entry. Focus on quantifiable results, active verbs, and demonstrating value.

Here is the information about the role:

Role: {{{role}}}
Company: {{{company}}}
Responsibilities: {{{responsibilities}}}

{{#if achievements}}
Specific Achievements/Results: {{{achievements}}}
{{/if}}

{{#if jobDescriptionKeywords}}
Target Job Description Keywords to incorporate: {{#each jobDescriptionKeywords}}- {{{this}}} 
{{/each}}
{{/if}}

Generate the bullet points as a JSON array of strings.`,
});

const aiGeneratedExperienceBulletPointsFlow = ai.defineFlow(
  {
    name: 'aiGeneratedExperienceBulletPointsFlow',
    inputSchema: AiGeneratedExperienceBulletPointsInputSchema,
    outputSchema: AiGeneratedExperienceBulletPointsOutputSchema,
  },
  async (input) => {
    const {output} = await aiGeneratedExperienceBulletPointsPrompt(input);
    return output!;
  }
);
