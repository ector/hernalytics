"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { fetchActiveSurveyParts } from "@/store/slices/dashboardSurvey";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface FormData {
  [key: string]: string | boolean;
}

export default function SurveyQuestion({ id }: { id: string }): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const activeSurveyParts: any = useSelector(
    (state: RootState) => state.dashboard.activeSurveyParts
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchActiveSurveyParts(id));
    }
  }, [dispatch, id]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Submitted Data:", data);
  };

  const handleNextCategory = () => {
    if (
      activeSurveyParts?.categories &&
      currentCategoryIndex < activeSurveyParts.categories.length - 1
    ) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    }
  };

  const handlePreviousCategory = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
    }
  };

  if (!activeSurveyParts || !activeSurveyParts.categories) {
    return <div>Loading...</div>;
  }

  const currentCategory = activeSurveyParts.categories[currentCategoryIndex];

  return (
    <>
    <h1 className="pl-20 py-10 text-bold">{activeSurveyParts.title}</h1>
    <div className="space-y-6 w-[40vw] m-auto mt-10">
      {/* Indicator */}
      <div className="flex justify-between items-center mb-6">
        {activeSurveyParts.categories.map((category: any, index: number) => (
          <div
            key={index}
            className={`flex-1 h-2 mx-1 rounded-full ${
              index <= currentCategoryIndex ? "bg-primary-cGreen74" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">{currentCategory.name}</h2>
        <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
          {currentCategory.questions.map((question: any) => (
            <div key={question.id} className="flex flex-col space-y-2">
              <label className="font-medium text-gray-700">
                {question.text}
              </label>
              {question.is_boolean ? (
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
        </form>
        <div className="flex justify-between mt-4">
          {/* <button
            onClick={handlePreviousCategory}
            disabled={currentCategoryIndex === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button> */}
          <button
            type="submit"
            onClick={handleNextCategory}
            disabled={
              currentCategoryIndex === activeSurveyParts.categories.length - 1
            }
            className="w-full py-[15px] px-10 bg-primary-cGreen74 font-semibold text-[17px] text-white rounded uppercase"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
