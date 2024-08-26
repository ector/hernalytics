"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  defaultEaseOfAccessFormValues,
  defaultElectionLocationFormValues,
  defaultElectionOrganizationFormValues,
  defaultInterferenceFormValues,
  defaultObserverFormValues,
  defaultResultFormValues,
  defaultWomenParticipationFormValues,
  easeOfAccessFormSchema,
  electionLocationFormSchema,
  electionOrganizationFormSchema,
  interferenceFormSchema,
  observerFormSchema,
  resultFormSchema,
  womenParticipationFormSchema,
} from "@/definitions/veo-form-schemas";
import { surveyType } from "@/definitions/survey-types";

const VEOContext = createContext<{ [key: string]: any }>({});

export default function VEOProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formStep, setFormStep] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<null | string>(null);
  const [selectedSurvey, setSelectedSurvey] = useState<any | surveyType>(null);

  const observerForm = useForm<z.infer<typeof observerFormSchema>>({
    resolver: zodResolver(observerFormSchema),
    defaultValues: defaultObserverFormValues,
  });

  const electionLocationForm = useForm<
    z.infer<typeof electionLocationFormSchema>
  >({
    resolver: zodResolver(electionLocationFormSchema),
    defaultValues: defaultElectionLocationFormValues,
  });

  const easeOfAccesForm = useForm<z.infer<typeof easeOfAccessFormSchema>>({
    resolver: zodResolver(easeOfAccessFormSchema),
    defaultValues: defaultEaseOfAccessFormValues,
  });

  const electionOrganizationForm = useForm<
    z.infer<typeof electionOrganizationFormSchema>
  >({
    resolver: zodResolver(electionOrganizationFormSchema),
    defaultValues: defaultElectionOrganizationFormValues,
  });

  const womenParticipationForm = useForm<
    z.infer<typeof womenParticipationFormSchema>
  >({
    resolver: zodResolver(womenParticipationFormSchema),
    defaultValues: defaultWomenParticipationFormValues,
  });

  const interferenceForm = useForm<z.infer<typeof interferenceFormSchema>>({
    resolver: zodResolver(interferenceFormSchema),
    defaultValues: defaultInterferenceFormValues,
  });

  const resultForm = useForm<z.infer<typeof resultFormSchema>>({
    resolver: zodResolver(resultFormSchema),
    defaultValues: defaultResultFormValues,
  });

  const formValues = useMemo(() => {
    return {
      formStep,
      setFormStep,
      observerForm,
      electionLocationForm,
      easeOfAccesForm,
      electionOrganizationForm,
      womenParticipationForm,
      interferenceForm,
      resultForm,
      error,
      setError,
      submitted,
      setSubmitted,
      selectValue,
      setSelectValue,
      selectedSurvey,
      setSelectedSurvey,
    };
  }, [
    formStep,
    setFormStep,
    observerForm,
    electionLocationForm,
    easeOfAccesForm,
    electionOrganizationForm,
    womenParticipationForm,
    interferenceForm,
    resultForm,
    error,
    setError,
    submitted,
    setSubmitted,
    selectValue,
    setSelectValue,
    selectedSurvey,
    setSelectedSurvey,
  ]);

  return (
    <VEOContext.Provider value={formValues}>{children}</VEOContext.Provider>
  );
}

export function useVEOContext() {
  const context = useContext(VEOContext);

  if (!context) {
    throw new Error("useVEOContext must be used within a VEOProvider");
  }
  return context;
}
