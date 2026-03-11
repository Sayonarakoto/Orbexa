'use server';
/**
 * @fileOverview This file implements a Genkit flow to generate a professional summary statement
 * based on user-provided key skills and career goals.
 *
 * - aiGeneratedSummaryStatement - A function that handles the generation of the summary statement.
 * - AiGeneratedSummaryStatementInput - The input type for the aiGeneratedSummaryStatement function.
 * - AiGeneratedSummaryStatementOutput - The return type for the aiGeneratedSummaryStatement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiGeneratedSummaryStatementInputSchema = z.object({
  keySkills: z.string().describe('A comma-separated list or description of the student\'s key skills.'),
  careerGoals: z.string().describe('A description of the student\'s career goals and aspirations.'),
});
export type AiGeneratedSummaryStatementInput = z.infer<typeof AiGeneratedSummaryStatementInputSchema>;

const AiGeneratedSummaryStatementOutputSchema = z.object({
  summaryStatement: z.string().describe('A concise and professional summary statement for a resume.'),
});
export type AiGeneratedSummaryStatementOutput = z.infer<typeof AiGeneratedSummaryStatementOutputSchema>;

export async function aiGeneratedSummaryStatement(input: AiGeneratedSummaryStatementInput): Promise<AiGeneratedSummaryStatementOutput> {
  return aiGeneratedSummaryStatementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSummaryStatementPrompt',
  input: {schema: AiGeneratedSummaryStatementInputSchema},
  output: {schema: AiGeneratedSummaryStatementOutputSchema},
  prompt: `You are an expert career counselor specializing in resume writing. Your task is to generate a professional, concise, and compelling summary statement for a student's resume.

Use the provided key skills and career goals to craft a summary that highlights their strengths and aligns with their aspirations.

Key Skills: {{{keySkills}}}
Career Goals: {{{careerGoals}}}`,
});

const aiGeneratedSummaryStatementFlow = ai.defineFlow(
  {
    name: 'aiGeneratedSummaryStatementFlow',
    inputSchema: AiGeneratedSummaryStatementInputSchema,
    outputSchema: AiGeneratedSummaryStatementOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate summary statement. Output was null or undefined.');
    }
    return output;
  }
);
