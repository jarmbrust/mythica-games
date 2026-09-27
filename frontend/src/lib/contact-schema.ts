import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(100, "Please keep your name under 100 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(200, "Please keep your email under 200 characters.")
    .email("Please enter a valid email address."),
  subject: z
    .string()
    .trim()
    .min(1, "Please enter a subject.")
    .max(150, "Please keep the subject under 150 characters.")
    .regex(/^[^\r\n\u0000]*$/, "Please keep the subject to a single line."),
  message: z
    .string()
    .trim()
    .min(1, "Please enter a message.")
    .max(5000, "Please keep your message under 5000 characters."),
  company: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;
