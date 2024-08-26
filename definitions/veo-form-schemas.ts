import { z } from "zod";

type YESNO = "yes" | "no";
export const DEFAULTERRORMESSAGE = "This field is required";
export const DEFAULTNUMBERERRORMESSAGE =
  "Value must be number greater or equal 0";
export const DEFAULTONLYNUMBERERRORMESSAGE =
  "This field is required and must be number";

export const observerFormSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .trim(),
  phoneNo: z
    .string({ required_error: "Phone Number is required" })
    .min(1, "Phone Number is required")
    .regex(/^\d+$/, DEFAULTONLYNUMBERERRORMESSAGE)
    .trim(),
  identifier: z
    .string({ required_error: "Unique Identifier is required" })
    .min(1, "Unique Identifier is required")
    .trim(),
  gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
});

export interface IObserverFormType {
  name: string;
  phoneNo: string;
  identifier: string;
  gender: "male" | "female";
}

export const defaultObserverFormValues: IObserverFormType = {
  name: "",
  phoneNo: "",
  identifier: "",
  gender: "male",
};

export const electionLocationFormSchema = z.object({
  state: z
    .string({ required_error: DEFAULTERRORMESSAGE })
    .min(1, DEFAULTERRORMESSAGE)
    .trim(),
  electionName: z
    .string({ required_error: DEFAULTERRORMESSAGE })
    .min(1, DEFAULTERRORMESSAGE)
    .trim(),
  electionArea: z
    .string({ required_error: DEFAULTERRORMESSAGE })
    .min(1, DEFAULTERRORMESSAGE)
    .trim(),
  wardName: z
    .string({ required_error: DEFAULTERRORMESSAGE })
    .min(1, DEFAULTERRORMESSAGE)
    .trim(),
  wardCode: z
    .string({ required_error: DEFAULTERRORMESSAGE })
    .min(1, DEFAULTERRORMESSAGE)
    .trim(),
  pollingUnit: z
    .string({ required_error: DEFAULTERRORMESSAGE })
    .min(1, DEFAULTERRORMESSAGE)
    .trim(),
  totalVotersCount: z
    .string({ required_error: DEFAULTERRORMESSAGE })
    .min(0, { message: DEFAULTNUMBERERRORMESSAGE })
    .regex(/^\d+$/, DEFAULTONLYNUMBERERRORMESSAGE)
    .trim(),
  totalFemaleVotersCount: z
    .string({ required_error: DEFAULTERRORMESSAGE })
    .min(0, { message: DEFAULTNUMBERERRORMESSAGE })
    .regex(/^\d+$/, DEFAULTONLYNUMBERERRORMESSAGE)
    .trim(),
  totalAccreditedVotersCount: z
    .string({ required_error: DEFAULTERRORMESSAGE })
    .min(0, { message: DEFAULTNUMBERERRORMESSAGE })
    .regex(/^\d+$/, DEFAULTONLYNUMBERERRORMESSAGE)
    .trim(),
  totalAccreditedFemaleVotersCount: z
    .string({ required_error: DEFAULTERRORMESSAGE })
    .min(0, { message: DEFAULTNUMBERERRORMESSAGE })
    .regex(/^\d+$/, DEFAULTONLYNUMBERERRORMESSAGE)
    .trim(),
});

export interface IElectionLocationFormType {
  state: string;
  electionArea: string;
  wardName: string;
  wardCode: string;
  pollingUnit: string;
  electionName: string;
  totalVotersCount: string;
  totalFemaleVotersCount: string;
  totalAccreditedVotersCount: string;
  totalAccreditedFemaleVotersCount: string;
}

export const defaultElectionLocationFormValues: IElectionLocationFormType = {
  state: "",
  electionName: "",
  electionArea: "",
  wardName: "",
  wardCode: "",
  pollingUnit: "",
  totalVotersCount: "",
  totalFemaleVotersCount: "",
  totalAccreditedVotersCount: "",
  totalAccreditedFemaleVotersCount: "",
};

export const easeOfAccessFormSchema = z.object({
  easyLocating: z.enum(["yes", "no"]),
  easyLocatingComment: z.string().trim(),
  adequateSignage: z.enum(["yes", "no"]),
  adequateSignageComment: z.string().trim(),
  easeWomen: z.enum(["yes", "no"]),
  easePWDs: z.enum(["yes", "no"]),
  easeElderly: z.enum(["yes", "no"]),
  easePregnant: z.enum(["yes", "no"]),
  easeNursingMothers: z.enum(["yes", "no"]),
  easeEntryComment: z.string().trim(),
  queue: z.enum(["yes", "no"]),
  queueComment: z.string().trim(),
  ballotInSecret: z.enum(["yes", "no"]),
  ballotInSecretComment: z.string().trim(),
  harrassment: z.enum(["yes", "no"]),
  harrassmentComment: z.string().trim(),
  votesAccreditedByINECCount: z
    .string({ required_error: DEFAULTERRORMESSAGE })
    .min(0, { message: DEFAULTNUMBERERRORMESSAGE })
    .regex(/^\d+$/, DEFAULTONLYNUMBERERRORMESSAGE)
    .trim(),
  votedEndedBy: z
    .string({ required_error: DEFAULTERRORMESSAGE })
    .min(0, { message: DEFAULTERRORMESSAGE })
    .trim(),
});

export interface IEaseOfAccessFormType {
  easyLocating: YESNO;
  easyLocatingComment: string;
  adequateSignage: YESNO;
  adequateSignageComment: string;
  easeWomen: YESNO;
  easePWDs: YESNO;
  easeElderly: YESNO;
  easePregnant: YESNO;
  easeNursingMothers: YESNO;
  easeEntryComment: string;
  queue: YESNO;
  queueComment: string;
  ballotInSecret: YESNO;
  ballotInSecretComment: string;
  harrassment: YESNO;
  harrassmentComment: string;
  votesAccreditedByINECCount: string;
  votedEndedBy: string;
}

export const defaultEaseOfAccessFormValues: IEaseOfAccessFormType = {
  easyLocating: "no" as YESNO,
  easyLocatingComment: "",
  adequateSignage: "no" as YESNO,
  adequateSignageComment: "",
  easeWomen: "no" as YESNO,
  easePWDs: "no" as YESNO,
  easeElderly: "no" as YESNO,
  easePregnant: "no" as YESNO,
  easeNursingMothers: "no" as YESNO,
  easeEntryComment: "",
  queue: "no" as YESNO,
  queueComment: "",
  ballotInSecret: "no" as YESNO,
  ballotInSecretComment: "",
  harrassment: "no" as YESNO,
  harrassmentComment: "",
  votesAccreditedByINECCount: "",
  votedEndedBy: "",
};

export const electionOrganizationFormSchema = z.object({
  presentOnTime: z.enum(["yes", "no"]),
  timeOfArrival: z.string().trim(),
  isBootSetup: z.enum(["yes", "no"]),
  isBootSetupComment: z.string().trim(),
  isBallotSealed: z.enum(["yes", "no"]),
  isBallotSealedComment: z.string().trim(),
  partyAgent: z.enum(["yes", "no"]),
  partyAgentComment: z.string().trim(),
  electoralOfficers: z.enum(["yes", "no"]),
  electoralOfficersComment: z.string().trim(),
  securityPersonnel: z.enum(["yes", "no"]),
  securityPersonnelComment: z.string().trim(),
  inecMonitors: z.enum(["yes", "no"]),
  inecMonitorsComment: z.string().trim(),
  media: z.enum(["yes", "no"]),
  mediaComment: z.string().trim(),
  delayDelivery: z.enum(["yes", "no"]),
  delayDeliveryComment: z.string().trim(),
  accreditation: z.string().trim(),
  voting: z.string().trim(),
  counting: z.string().trim(),
  collation: z.string().trim(),
  bvas: z.enum(["yes", "no"]),
  bvasComment: z.string().trim(),
  inkPad: z.enum(["yes", "no"]),
  inkPadComment: z.string().trim(),
  sufficientMaterial: z.enum(["yes", "no"]),
  sufficientMaterialComment: z.string().trim(),
});

export interface IElectionOrganizationFormType {
  presentOnTime: YESNO;
  timeOfArrival: string;
  isBootSetup: YESNO;
  isBootSetupComment: string;
  isBallotSealed: YESNO;
  isBallotSealedComment: string;
  partyAgent: YESNO;
  partyAgentComment: string;
  electoralOfficers: YESNO;
  electoralOfficersComment: string;
  securityPersonnel: YESNO;
  securityPersonnelComment: string;
  inecMonitors: YESNO;
  inecMonitorsComment: string;
  media: YESNO;
  mediaComment: string;
  delayDelivery: YESNO;
  delayDeliveryComment: string;
  accreditation: string;
  voting: string;
  counting: string;
  collation: string;
  bvas: YESNO;
  bvasComment: string;
  inkPad: YESNO;
  inkPadComment: string;
  sufficientMaterial: YESNO;
  sufficientMaterialComment: string;
}

export const defaultElectionOrganizationFormValues: IElectionOrganizationFormType =
  {
    presentOnTime: "no" as YESNO,
    timeOfArrival: "",
    isBootSetup: "no" as YESNO,
    isBootSetupComment: "",
    isBallotSealed: "no" as YESNO,
    isBallotSealedComment: "",
    partyAgent: "no" as YESNO,
    partyAgentComment: "",
    electoralOfficers: "no" as YESNO,
    electoralOfficersComment: "",
    securityPersonnel: "no" as YESNO,
    securityPersonnelComment: "",
    inecMonitors: "no" as YESNO,
    inecMonitorsComment: "",
    media: "no" as YESNO,
    mediaComment: "",
    delayDelivery: "no" as YESNO,
    delayDeliveryComment: "",
    accreditation: "",
    voting: "",
    counting: "",
    collation: "",
    bvas: "no" as YESNO,
    bvasComment: "",
    inkPad: "no" as YESNO,
    inkPadComment: "",
    sufficientMaterial: "no" as YESNO,
    sufficientMaterialComment: "",
  };

export const womenParticipationFormSchema = z.object({
  obstaclesPresent: z.enum(["yes", "no"]),
  genderDisrimination: z.enum(["yes", "no"]),
  verbalAbuse: z.enum(["yes", "no"]),
  physicalAbuse: z.enum(["yes", "no"]),
  support: z.enum(["yes", "no"]),
  supportComment: z.string().trim(),
  womenOfficials: z.enum(["yes", "no"]),
  presidingOfficers: z.enum(["yes", "no"]),
  assistantPresidingOfficers: z.enum(["yes", "no"]),
  securityOfficials: z.enum(["yes", "no"]),
  partyAgents: z.enum(["yes", "no"]),
  womenOfficialsComment: z.string().trim(),
  provideAssistance: z.enum(["yes", "no"]),
  provideAssistanceComment: z.string().trim(),
});

export interface IWomenParticipationFormType {
  obstaclesPresent: YESNO;
  genderDisrimination: YESNO;
  verbalAbuse: YESNO;
  physicalAbuse: YESNO;
  support: YESNO;
  supportComment: string;
  womenOfficials: YESNO;
  presidingOfficers: YESNO;
  assistantPresidingOfficers: YESNO;
  securityOfficials: YESNO;
  partyAgents: YESNO;
  womenOfficialsComment: string;
  provideAssistance: YESNO;
  provideAssistanceComment: string;
}

export const defaultWomenParticipationFormValues: IWomenParticipationFormType =
  {
    obstaclesPresent: "no" as YESNO,
    genderDisrimination: "no" as YESNO,
    verbalAbuse: "no" as YESNO,
    physicalAbuse: "no" as YESNO,
    support: "no" as YESNO,
    supportComment: "",
    womenOfficials: "no" as YESNO,
    presidingOfficers: "no" as YESNO,
    assistantPresidingOfficers: "no" as YESNO,
    securityOfficials: "no" as YESNO,
    partyAgents: "no" as YESNO,
    womenOfficialsComment: "",
    provideAssistance: "no" as YESNO,
    provideAssistanceComment: "",
  };

export const interferenceFormSchema = z.object({
  influenced: z.enum(["yes", "no"]),
  influencedComment: z.string().trim(),
  womenInvolved: z.enum(["yes", "no"]),
  menInvolved: z.enum(["yes", "no"]),
  youthsInvolved: z.enum(["yes", "no"]),
  securityPersonnelInvolved: z.enum(["yes", "no"]),
  partyAgentInvolved: z.enum(["yes", "no"]),
  othersInvolved: z.enum(["yes", "no"]),
  othersComment: z.string().trim(),
  gbv: z.enum(["yes", "no"]),
  gbvComment: z.string().trim(),
  preventHarassment: z.enum(["yes", "no"]),
  preventHarassmentComment: z.string().trim(),
});

export interface IInterferenceFormType {
  influenced: YESNO;
  influencedComment: string;
  womenInvolved: YESNO;
  menInvolved: YESNO;
  youthsInvolved: YESNO;
  securityPersonnelInvolved: YESNO;
  partyAgentInvolved: YESNO;
  othersInvolved: YESNO;
  othersComment: string;
  gbv: YESNO;
  gbvComment: string;
  preventHarassment: YESNO;
  preventHarassmentComment: string;
}

export const defaultInterferenceFormValues: IInterferenceFormType = {
  influenced: "no" as YESNO,
  influencedComment: "",
  womenInvolved: "no" as YESNO,
  menInvolved: "no" as YESNO,
  youthsInvolved: "no" as YESNO,
  securityPersonnelInvolved: "no" as YESNO,
  partyAgentInvolved: "no" as YESNO,
  othersInvolved: "no" as YESNO,
  othersComment: "",
  gbv: "no" as YESNO,
  gbvComment: "",
  preventHarassment: "no" as YESNO,
  preventHarassmentComment: "",
};

export const resultFormSchema = z.object({
  sortCommenceTime: z.string().trim(),
  tookSnapshot: z.enum(["yes", "no"]),
  tookSnapshotComment: z.string().trim(),
  sendSnapshot: z.enum(["yes", "no"]),
  sendSnapshotComment: z.string().trim(),
  resultsMatched: z.enum(["yes", "no"]),
  resultsMatchedComment: z.string().trim(),
  atmosphere: z.enum(["tense", "relaxed", "violent"]),
  atmosphereComment: z.string().trim(),
  anyDisruption: z.enum(["yes", "no"]),
  anyDisruptionComment: z.string().trim(),
  anyComment: z.string().trim(),
});

export interface IResultFormType {
  sortCommenceTime: string;
  tookSnapshot: YESNO;
  tookSnapshotComment: string;
  sendSnapshot: YESNO;
  sendSnapshotComment: string;
  resultsMatched: YESNO;
  resultsMatchedComment: string;
  atmosphere: "tense" | "relaxed" | "violent";
  atmosphereComment: string;
  anyDisruption: YESNO;
  anyDisruptionComment: string;
  anyComment: string;
}

export const defaultResultFormValues: IResultFormType = {
  sortCommenceTime: "",
  tookSnapshot: "no" as YESNO,
  tookSnapshotComment: "",
  sendSnapshot: "no" as YESNO,
  sendSnapshotComment: "",
  resultsMatched: "no" as YESNO,
  resultsMatchedComment: "",
  atmosphere: "relaxed",
  atmosphereComment: "",
  anyDisruption: "no" as YESNO,
  anyDisruptionComment: "",
  anyComment: "",
};
