"use client";

import { FormState } from "#/lib/type";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface FormWrapperProps {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  children: React.ReactNode;
  onSuccess?: (state: FormState) => void;
  className?: string;
}

import { useRouter } from "next/navigation";

export function FormWrapper({
  action,
  children,
  onSuccess,
  className,
}: FormWrapperProps) {
  const [state, formAction, isPending] = useActionState(action, null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!state) return;

    // SUCCESS
    if (state.success) {
      toast.success(state.message || "Success!");
      formRef.current?.reset();
      onSuccess?.(state);

      if (state.redirectTo) {
        router.push(state.redirectTo);
      }
      return;
    }

    // FAILED (general)
    if (state.success === false && !state.errors) {
      toast.error(state.message || "Something went wrong.");
      return;
    }

    // VALIDATION ERRORS
    if (state.errors) {
      Object.entries(state.errors).forEach(([field, messages]) => {
        if (Array.isArray(messages)) {
          messages.forEach((msg) => {
            toast.error(msg, {
              description: field,
            });
          });
        }
      });
    }
  }, [state, onSuccess, router]);

  return (
    <form ref={formRef} action={formAction} className={className}>
      <fieldset disabled={isPending} className="contents">
        {children}
      </fieldset>
    </form>
  );
}
