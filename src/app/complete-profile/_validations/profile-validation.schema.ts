import { z } from "zod";

// Profile completion validation schema
export const profileCompletionSchema = z.object({
  address: z
    .string()
    .min(1, "La dirección es requerida")
    .min(10, "La dirección debe tener al menos 10 caracteres")
    .max(200, "La dirección no puede exceder 200 caracteres"),
  postalCode: z
    .string()
    .min(1, "El código postal es requerido")
    .regex(
      /^\d{5}$/,
      "El código postal debe tener exactamente 5 dígitos"
    ),
});

// Type inference from schema
export type ProfileCompletionData = z.infer<typeof profileCompletionSchema>;
