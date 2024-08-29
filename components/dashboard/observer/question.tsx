"use client";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchActiveSurveyParts,
  submitSurveyAnswers,
} from "@/store/slices/dashboardSurvey";
import { AppDispatch, RootState } from "@/store/store";
import ObserverNav from "./nav";
import AppLogo from "@/components/shared/app-logo";
import { useRouter } from "next/navigation";

interface FormData {
  [key: string]: string | boolean;
}

interface Answer {
  question_id: number;
  yes_no?: boolean;
  comment?: string;
  answer_input?: string;
  is_active: boolean;
}

export default function SurveyQuestion({ id }: { id: string }): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [formData, setFormData] = useState<FormData>({});
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>();
  const activeSurveyParts: any = useSelector(
    (state: RootState) => state.dashboard.activeSurveyParts
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchActiveSurveyParts(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (activeSurveyParts?.categories) {
      const currentCategory =
        activeSurveyParts.categories[currentCategoryIndex];
      currentCategory.questions.forEach((question: any) => {
        const questionKey = `question_${question.id}`;
        const commentKey = `comment_${question.id}`;
        if (formData[questionKey] !== undefined) {
          setValue(questionKey, formData[questionKey] as any);
        }
        if (formData[commentKey] !== undefined) {
          setValue(commentKey, formData[commentKey] as any);
        }
      });
    }
  }, [currentCategoryIndex, activeSurveyParts, setValue, formData]);

  const handleNextCategory: SubmitHandler<FormData> = (data) => {
    // Map the form data to the answers array
    const newAnswers: Answer[] = Object.keys(data)
      .map((key) => {
        let returnVal: Answer = { question_id: 0, is_active: true };

        if (key.startsWith("question_")) {
          const questionId = parseInt(key.replace("question_", ""));
          const question = activeSurveyParts?.categories?.[
            currentCategoryIndex
          ]?.questions.find((q: any) => q.id === questionId);

          const isBooleanQuestion = question?.is_boolean ?? false;
          const answerValue = data[key] as string;
          const comment = isBooleanQuestion
            ? (data[`comment_${questionId}`] as string)
            : "";

          returnVal = {
            question_id: questionId,
            yes_no: isBooleanQuestion ? answerValue === "yes" : undefined,
            comment: isBooleanQuestion ? comment : undefined,
            answer_input: isBooleanQuestion ? undefined : answerValue,
            is_active: true,
          };
        }

        return returnVal;
      })
      .filter((answer) => answer.question_id !== 0);
    setAnswers((prev) => {
      const updatedAnswers = [...prev, ...newAnswers];
      return updatedAnswers;
    });

    setFormData((prev) => ({ ...prev, ...data }));

    if (
      activeSurveyParts?.categories &&
      currentCategoryIndex < activeSurveyParts.categories.length - 1
    ) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      reset();
    } else {
      const removeEmptyObjects = (arr: Answer[]): Answer[] => {
        return arr.filter(
          (obj) =>
            Object.keys(obj).length > 0 &&
            !Object.values(obj).every(
              (value) => value === undefined || value === null || value === ""
            )
        );
      };

      const filteredAnswers: any = removeEmptyObjects(answers);
      console.log("Filtered Answers:", filteredAnswers);

      if (filteredAnswers.length > 0) {
        dispatch(submitSurveyAnswers(filteredAnswers));
      }

      setShowModal(true);
    }
  };

  const handlePreviousCategory = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
      reset();
    }
  };

  if (!activeSurveyParts || !activeSurveyParts.categories) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="loader blinking-logo">
          <AppLogo />
        </div>
      </div>
    );
  }

  const currentCategory = activeSurveyParts.categories[currentCategoryIndex];

  return (
    <>
      <ObserverNav />
      <h1 className="pl-2 lg:pl-20 py-10 text-bold">
        {activeSurveyParts.title}
      </h1>
      <div className="space-y-6 xl:w-[40vw] lg:w-[45vw] m-auto mt-10 sm:w-[80%] md:w-[99vw]">
        {/* Indicator */}
        <div className="flex justify-between items-center mb-6">
          {activeSurveyParts.categories.map((category: any, index: number) => (
            <div
              key={index}
              className={`flex-1 h-2 mx-1 rounded-full ${
                index <= currentCategoryIndex
                  ? "bg-primary-cGreen74"
                  : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>

        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">{currentCategory.name}</h2>
          <form
            className="space-y-7"
            onSubmit={handleSubmit(handleNextCategory)}
          >
            {currentCategory.questions.map((question: any) => (
              <div key={question.id} className="flex flex-col space-y-2">
                <label className="font-medium text-gray-700">
                  {question.text}
                </label>
                {question.is_boolean ? (
                  <>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value="yes"
                          {...register(`question_${question.id}`, {
                            required: true,
                          })}
                          className="form-radio text-blue-600"
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value="no"
                          {...register(`question_${question.id}`, {
                            required: true,
                          })}
                          className="form-radio text-blue-600"
                        />
                        <span>No</span>
                      </label>
                    </div>
                    <textarea
                      {...register(`comment_${question.id}`, {
                        required: false,
                      })}
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add your comment here"
                    />
                  </>
                ) : (
                  <input
                    {...register(`question_${question.id}`, { required: true })}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Answer here"
                  />
                )}
                {errors[`question_${question.id}`] && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>
            ))}
            <div className="flex justify-between mt-4">
              {/* {currentCategoryIndex > 0 && (
                <button
                  type="button"
                  onClick={handlePreviousCategory}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
                >
                  Previous
                </button>
              )} */}
              <button
                type="submit"
                className="w-full py-[15px] px-10 bg-primary-cGreen74 font-semibold text-[17px] text-white rounded uppercase"
              >
                {currentCategoryIndex ===
                activeSurveyParts.categories.length - 1
                  ? "Submit"
                  : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {showModal && (
        <ThankYouModal
          onClose={() => {
            setShowModal(false);
            router.push("/observer");
          }}
        />
      )}
    </>
  );
}

const ThankYouModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Thank You!</h2>
      <p className="text-gray-700">
        Thank you for completing the survey. Your feedback is valuable to us.
      </p>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-primary-cGreen74 text-white rounded-md"
      >
        Close
      </button>
    </div>
  </div>
);
