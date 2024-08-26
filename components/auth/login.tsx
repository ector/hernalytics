"use client";

import { useForm } from "react-hook-form";
import AuthFormWrapper from "./auth-form-wrapper";
import {
  defaultLoginFormValues,
  loginFormSchema,
} from "@/definitions/auth-form-schemas";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import CustomFormLabel from "../forms/form-label";
import FormControlInput from "../forms/form-control-input";
import FormControlPasswordInput from "../forms/form-control-password";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { loginUser, User } from "@/store/slices/auth";

export default function LoginForm(): React.ReactNode {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: defaultLoginFormValues,
  });
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.auth);

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      const user: User = await dispatch(loginUser(values)).unwrap();
      localStorage.setItem("auth_token", user.access_token);
      router.push('/observer');
      
    } catch (err) {
      console.error("Login failed:", err);
    }
  }

  return (
    <AuthFormWrapper
      form={form}
      title="Welcome back!"
      desc="Login to access your account"
    >
      <div className="space-y-4">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormLabel text="Email Address *" />
                <FormControlInput
                  placeholder="Email Address"
                  field={field}
                  fieldState={fieldState}
                  type="email"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormLabel text="Password *" />
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
        <div className="w-full !mt-[60px]">
          <button
            type="button"
            onClick={form.handleSubmit(onSubmit)}
            className="w-full py-[15px] bg-primary-cGreen74 text-center text-white font-medium rounded"
          >
            {status === "loading" ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </AuthFormWrapper>
  );
}
