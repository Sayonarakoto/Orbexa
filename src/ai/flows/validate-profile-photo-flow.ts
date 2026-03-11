'use server';
/**
 * @fileOverview A Genkit flow for validating professional profile photos.
 *
 * - validateProfilePhoto - A function that analyzes a photo for compliance.
 * - ValidateProfilePhotoInput - The input type containing the photo data URI.
 * - ValidateProfilePhotoOutput - The return type with compliance status and reasons.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateProfilePhotoInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a person, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ValidateProfilePhotoInput = z.infer<typeof ValidateProfilePhotoInputSchema>;

const ValidateProfilePhotoOutputSchema = z.object({
  isCompliant: z.boolean().describe('Whether the photo meets professional standards.'),
  postureOk: z.boolean().describe('Whether the person has a straight, forward-facing posture.'),
  backgroundOk: z.boolean().describe('Whether the background is plain and neutral.'),
  reason: z.string().optional().describe('Reason for non-compliance, if any.'),
});
export type ValidateProfilePhotoOutput = z.infer<typeof ValidateProfilePhotoOutputSchema>;

export async function validateProfilePhoto(input: ValidateProfilePhotoInput): Promise<ValidateProfilePhotoOutput> {
  return validateProfilePhotoFlow(input);
}

const validateProfilePhotoPrompt = ai.definePrompt({
  name: 'validateProfilePhotoPrompt',
  input: {schema: ValidateProfilePhotoInputSchema},
  output: {schema: ValidateProfilePhotoOutputSchema},
  prompt: `You are an expert in professional portrait photography and visa/passport compliance. 
Your task is to analyze the provided photo for a professional resume.

Check the following criteria:
1. Straight Posture: The person should be facing forward with their head and shoulders straight.
2. Plain Background: The background should be a single, solid, neutral color (like white, off-white, or light grey) without patterns or distracting objects.

Photo: {{media url=photoDataUri}}

Respond with a JSON object indicating if the photo is compliant and the status of each check. If not compliant, provide a helpful reason.`,
});

const validateProfilePhotoFlow = ai.defineFlow(
  {
    name: 'validateProfilePhotoFlow',
    inputSchema: ValidateProfilePhotoInputSchema,
    outputSchema: ValidateProfilePhotoOutputSchema,
  },
  async (input) => {
    const {output} = await validateProfilePhotoPrompt(input);
    if (!output) {
      throw new Error('Failed to analyze photo.');
    }
    return output;
  }
);
