"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Input,
  Button,
} from "@heroui/react";
import { Home, LocationOn } from "@mui/icons-material";
import { ProfileCompletionData, profileCompletionSchema } from "../_validations/profile-validation.schema";
import { ApiRoutesConfigService } from "@/app/_services/api-routes-config.service";
import { ProfileCompletionResponse } from "../_interfaces/profile-completion.interface";

interface ProfileCompletionFormProps {
  onComplete?: () => void;
}

export function ProfileCompletionForm({ onComplete }: ProfileCompletionFormProps) {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ProfileCompletionData>({
    resolver: zodResolver(profileCompletionSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ProfileCompletionData) => {
    if (!session?.user?.email) {
      setSubmitError("No se encontró información de sesión");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(ApiRoutesConfigService.getPath("USER_COMPLETE_PROFILE"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result: ProfileCompletionResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Error al completar el perfil");
      }

      // Update the session with new user data and trigger token refresh
      await update();

      // Reset form and call completion callback
      reset();
      onComplete?.();

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error completing profile:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Error inesperado al completar el perfil"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-6">

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Address Field */}
        <div className="space-y-2">
          <Input
            {...register("address")}
            label="Dirección"
            variant="bordered"
            color="default"
            startContent={
              <Home className="text-default-400" />
            }
            isInvalid={!!errors.address}
            errorMessage={errors.address?.message}
          />
        </div>

        {/* Postal Code Field */}
        <div className="space-y-2">
          <Input
            {...register("postalCode")}
            label="Código Postal"
            variant="bordered"
            color="default"
            maxLength={5}
            startContent={
              <LocationOn className="text-default-400" />
            }
            isInvalid={!!errors.postalCode}
            errorMessage={errors.postalCode?.message}
          />
        </div>

        {/* Submit Error */}
        {submitError && (
          <div className="bg-danger-50 dark:bg-danger-900/20 rounded-large p-4">
            <p className="text-danger text-sm text-center">
              {submitError}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          color="primary"
          variant="solid"
          isLoading={isSubmitting}
          isDisabled={!isValid || isSubmitting}
          spinner={
            <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
          }
        >
          {isSubmitting ? "Completando..." : "Continuar al Dashboard"}
        </Button>
      </form>
    </div>
  );
}