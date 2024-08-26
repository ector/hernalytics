import {
  IEaseOfAccessFormType,
  IElectionLocationFormType,
  IElectionOrganizationFormType,
  IInterferenceFormType,
  IObserverFormType,
  IResultFormType,
  IWomenParticipationFormType,
} from "./veo-form-schemas";

export type InputType =
  | keyof IObserverFormType
  | keyof IElectionLocationFormType
  | keyof IEaseOfAccessFormType
  | keyof IElectionOrganizationFormType
  | keyof IWomenParticipationFormType
  | keyof IInterferenceFormType
  | keyof IResultFormType;
