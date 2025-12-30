import { getMaterials } from "#/app/(protected)/material/_partials/action";

export type FormState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  timestamp?: number;
  redirectTo?: string;
} | null;

export type Material = Awaited<ReturnType<typeof getMaterials>>[number];
