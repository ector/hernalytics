import { ILoginFormType, IResetFormType } from "./auth-form-schemas";

export type AuthInputType = keyof ILoginFormType | keyof IResetFormType;
