import { z } from "zod";

const PASSWORDERRORMESSAGE = "Password is required";
const PASSWORDMINERRORMESSAGE = "Password must be more than 8 characters";
const PASSWORDNOTMATCH = "Passwords don't match";
const PASSPASSWORDPATTERNERRORMESSAGE =
  "Minimum of 8 characters with upper and lower case letters, and at least one number";
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const profleDetailFormValues = z.object({
  name: z.string(),
  email: z.string(),
  gender: z.string(),
  dob: z.string(),
  role: z.string(),
  phone: z.string(),
  newPassword: z
    .string({ required_error: PASSWORDERRORMESSAGE })
    .min(8, PASSWORDMINERRORMESSAGE)
    .regex(PASSWORD_REGEX, PASSPASSWORDPATTERNERRORMESSAGE),
  confirmNewPassword: z
    .string({ required_error: PASSWORDNOTMATCH })
    .min(8, PASSWORDNOTMATCH),
});

export interface ProfileDetailFormType {
  name: string;
  email: string;
  gender: string;
  dob: string;
  role: string;
  phone: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const defaultProfileDetailFormValues: ProfileDetailFormType = {
    name: "",
    email: "",
    gender: "",
    dob: "",
    role: "",
    phone: "",
    newPassword: "",
    confirmNewPassword: "",
  };
