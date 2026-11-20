import { z } from "zod";

const email = z.email("Enter a valid email address.");

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Enter your password."),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name."),
    email,
    password: z.string().min(8, "Use at least 8 characters."),
    confirmPassword: z.string().min(1, "Re-enter your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export const verifyEmailSchema = z.object({
  email,
  otp: z.string().trim().regex(/^\d{4,8}$/, "Enter the numeric code from your email."),
});
