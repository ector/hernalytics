"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthFormWrapper from "./auth-form-wrapper";
import {
  defaultResetFormValues,
  resetFormSchema,
} from "@/definitions/auth-form-schemas";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import CustomFormLabel from "../forms/form-label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormControlPasswordInput from "../forms/form-control-password";

export default function ChangePasswordForm(): React.ReactNode {
  const router = useRouter();
  const form = useForm<z.infer<typeof resetFormSchema>>({
    resolver: zodResolver(resetFormSchema),
    defaultValues: defaultResetFormValues,
  });

  function onSubmit(values: z.infer<typeof resetFormSchema>) {
    console.log(values);
    router.push("/observer")
  }

  return (
    <AuthFormWrapper
      form={form}
      title="Change Password"
      desc="Change Password to access your account"
    >
      <div className="space-y-4">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormLabel text="New Password *" />
                <FormControlPasswordInput
                  placeholder="Enter Passowrd"
                  field={field}
                  fieldState={fieldState}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormLabel text="Confirm Password *" />
                <FormControlPasswordInput
                  placeholder="Enter password"
                  field={field}
                  fieldState={fieldState}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex flex-col gap-3 !mt-[60px]">
          <button
            type="button"
            onClick={form.handleSubmit(onSubmit)}
            className="w-full py-[15px] bg-primary-cGreen74 text-center text-white font-medium rounded"
          >
            CHANGE PASSWORD
          </button>
          <Link
            href="/observer"
            className="w-full py-[15px] text-center text-primary-cDark7D font-medium rounded"
          >
            SKIP
          </Link>
        </div>
      </div>
    </AuthFormWrapper>
  );
}
