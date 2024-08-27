"use client";

import React, { useState } from "react";
import { LogOut } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import CustomFormLabel from "@/components/forms/form-label";
import ProfilePasswordFormWrapper from "./profile-password-form-wrapper";
import FormControlPasswordSettingInput from "@/components/forms/form-control-password-setting";
import ProfileDetailsFormWrapper from "./profile-details-form-wrapper";
import FormControlSettingInput from "@/components/forms/form-control-input-setting";
import { defaultProfileDetailFormValues, profleDetailFormValues } from "@/definitions/profile-form-schemas";
import CustomFormSettingLabel from "@/components/forms/form-setting-label";
import { Button } from "@/components/ui/button";
import { forgotPassword, User } from "@/store/slices/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

export default function PersonalDetailsForm(props: { user: User }): React.ReactNode {
  const { user } = props;
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Initialize form with user data
  const form = useForm<z.infer<typeof profleDetailFormValues>>({
    resolver: zodResolver(profleDetailFormValues),
    defaultValues: {
      name: user ? `${user.firstname} ${user.lastname}` : "",
      email: user?.email || "",
      gender: user?.gender || "",
      dob: user?.dob || "",
      role: user?.role || "",
      phone: user?.phone || "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  // Handle password change
  const handlePasswordChange = async () => {
    const { newPassword, confirmNewPassword } = form.getValues();

    if (newPassword && confirmNewPassword) {
      setLoading(true);
      setSuccessMessage("");
      setErrorMessage("");

      try {
        const result = await dispatch(
          forgotPassword({ password: newPassword, confirm_password: confirmNewPassword })
        ).unwrap();

        setSuccessMessage("Password changed successfully!");
      } catch (error: any) {
        setErrorMessage(error.message || "Failed to change password. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setErrorMessage("Please fill in both password fields.");
    }
  };

  return (
    <div className="xl:w-[60%] lg:w-[70%] md:w-[80%] flex flex-col gap-y-5">
      {/* Personal Details */}
      <div className="px-8 py-10 bg-primary-cGreyFA flex flex-col gap-y-10">
        <ProfileDetailsFormWrapper
          form={form}
          title="Personal Details"
          desc={`User ID: #${user?.id || "N/A"}`}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormLabel
                  size="small"
                  text="Name"
                  className="text-primary-cDark1D"
                />
                <FormControlSettingInput
                  placeholder="Jane Cooper"
                  field={field}
                  fieldState={fieldState}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormLabel
                  size="small"
                  text="Email Address"
                  className="text-primary-cDark1D"
                />
                <FormControlSettingInput
                  placeholder="janecooper@gmail.com"
                  field={field}
                  fieldState={fieldState}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormLabel
                  size="small"
                  text="Gender"
                  className="text-primary-cDark1D"
                />
                <FormControlSettingInput
                  placeholder="Male"
                  field={field}
                  fieldState={fieldState}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dob"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormLabel
                  size="small"
                  text="Date of Birth"
                  className="text-primary-cDark1D"
                />
                <FormControlSettingInput
                  placeholder="07 / 07 / 2001"
                  field={field}
                  fieldState={fieldState}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormLabel
                  size="small"
                  text="Role"
                  className="text-primary-cDark1D"
                />
                <FormControlSettingInput
                  placeholder="Observer"
                  field={field}
                  fieldState={fieldState}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormLabel
                  size="small"
                  text="Mobile No"
                  className="text-primary-cDark1D"
                />
                <FormControlSettingInput
                  placeholder="123 4567 8901"
                  field={field}
                  fieldState={fieldState}
                />
              </FormItem>
            )}
          />
        </ProfileDetailsFormWrapper>
      </div>

      {/* Password Info */}
      <div className="px-8 py-10 bg-primary-cGreyFA flex flex-col gap-y-10">
        <ProfilePasswordFormWrapper
          form={form}
          title="Password Information"
          desc=""
        >
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormSettingLabel
                  field={field}
                  text="New Password *"
                  className="text-primary-cDark1D"
                />
                <FormControlPasswordSettingInput
                  placeholder="Enter password"
                  field={field}
                  fieldState={fieldState}
                />
                <FormMessage className="text-[13px] text-primary-cGrey7B font-normal leading-tight">
                  Minimum of 8 characters with upper and lower case letters, and
                  at least one number
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormSettingLabel
                  field={field}
                  text="Confirm Password *"
                  className="text-primary-cDark1D"
                />
                <FormControlPasswordSettingInput
                  placeholder="Enter password"
                  field={field}
                  fieldState={fieldState}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </ProfilePasswordFormWrapper>

        <Button variant={"default"} className="sm:w-max w-full px-[40px]" onClick={handlePasswordChange}>
          {loading ? "Updating..." : "Change Password"}
        </Button>

        {errorMessage && (
          <div className="text-red-500 text-center mt-4">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="text-green-500 text-center mt-4">
            {successMessage}
          </div>
        )}
      </div>

      <Button
        variant={"outline"}
        className="sm:w-max ml-8 sm:mr-0 mr-8 px-[60px] gap-x-3"
      >
        <LogOut className="w-[16px] h-auto" />
        Sign Out
      </Button>
    </div>
  );
}
