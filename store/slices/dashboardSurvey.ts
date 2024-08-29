import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

// DashboardSurvey interface
export interface DashboardSurvey {
  caption: string;
  published: boolean;
  completion_date: string;
  completion_time: string;
  id: number;
  survey_status: string;
}

// SurveyPart interface for active survey parts
export interface SurveyPart {
  title: string;
  description: string;
  is_active: boolean;
  id: number;
  status: string;
  categories: any[]; // Update 'any[]' with specific type if known
}

// SurveyAnswer interface for submitting survey answers
export interface SurveyAnswer {
  question_id: number;
  yes_no: boolean;
  comment: string;
  answer_input: string;
  is_active: boolean;
  id?: number;
  created_at?: string;
}

// SurveyState interface
interface SurveyState {
  surveys: DashboardSurvey[];
  previousSurveys: DashboardSurvey[];
  upcomingSurveys: DashboardSurvey[];
  activeSurveyParts: SurveyPart[]; // Added this line
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: SurveyState = {
  surveys: [],
  previousSurveys: [],
  upcomingSurveys: [],
  activeSurveyParts: [], // Added this line
  status: "idle",
  error: null,
};

// Utility function to handle unauthorized access
const handleUnauthorized = () => {
  localStorage.removeItem("auth_token");
  window.location.href = "/auth/login";
};

// Async thunk to fetch current surveys
export const fetchSurveys = createAsyncThunk(
  "surveys/fetchSurveys",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token || localStorage.getItem("auth_token");

    const response = await fetch("https://veoapi.cogai.uk/dashboard/observer", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      handleUnauthorized();
      return thunkAPI.rejectWithValue("Unauthorized");
    }

    if (!response.ok) {
      throw new Error("Failed to fetch surveys");
    }

    return response.json();
  }
);

// Async thunk to fetch previous surveys
export const fetchPreviousSurveys = createAsyncThunk(
  "surveys/fetchPreviousSurveys",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token || localStorage.getItem("auth_token");

    const response = await fetch(
      "https://veoapi.cogai.uk/dashboard/observer_previous_surveys",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 401) {
      handleUnauthorized();
      return thunkAPI.rejectWithValue("Unauthorized");
    }

    if (!response.ok) {
      throw new Error("Failed to fetch previous surveys");
    }

    return response.json();
  }
);

// Async thunk to fetch upcoming surveys
export const fetchUpcomingSurveys = createAsyncThunk(
  "surveys/fetchUpcomingSurveys",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token || localStorage.getItem("auth_token");

    const response = await fetch("https://veoapi.cogai.uk/surveys/surveys", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      handleUnauthorized();
      return thunkAPI.rejectWithValue("Unauthorized");
    }

    if (!response.ok) {
      throw new Error("Failed to fetch upcoming surveys");
    }

    return response.json();
  }
);

// Async thunk to fetch active survey parts
export const fetchActiveSurveyParts = createAsyncThunk(
  "surveys/fetchActiveSurveyParts",
  async (surveypart_id: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token || localStorage.getItem("auth_token");

    const response = await fetch(
      `https://veoapi.cogai.uk/survey_questions/${surveypart_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 401) {
      handleUnauthorized();
      return thunkAPI.rejectWithValue("Unauthorized");
    }

    if (!response.ok) {
      throw new Error("Failed to fetch active survey parts");
    }

    return response.json() as Promise<SurveyPart[]>;
  }
);

// Async thunk to submit survey answers
export const submitSurveyAnswers = createAsyncThunk(
  "surveys/submitSurveyAnswers",
  async (
    answers:  SurveyAnswer[],
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token || localStorage.getItem("auth_token");

    const response = await fetch("https://veoapi.cogai.uk/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ answers: answers }),
    });

    if (response.status === 401) {
      handleUnauthorized();
      return thunkAPI.rejectWithValue("Unauthorized");
    }

    if (!response.ok) {
      throw new Error("Failed to submit survey answers");
    }

    return response.json();
  }
);

// Create the slice
const surveysSlice = createSlice({
  name: "surveys",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle current surveys
    builder
      .addCase(fetchSurveys.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSurveys.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.surveys = action.payload;
      })
      .addCase(fetchSurveys.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch surveys";
      });

    // Handle previous surveys
    builder
      .addCase(fetchPreviousSurveys.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPreviousSurveys.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.previousSurveys = action.payload;
      })
      .addCase(fetchPreviousSurveys.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to fetch previous surveys";
      });

    // Handle upcoming surveys
    builder
      .addCase(fetchUpcomingSurveys.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpcomingSurveys.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.upcomingSurveys = action.payload;
      })
      .addCase(fetchUpcomingSurveys.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to fetch upcoming surveys";
      });

    // Handle active survey parts
    builder
      .addCase(fetchActiveSurveyParts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchActiveSurveyParts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.activeSurveyParts = action.payload;
      })
      .addCase(fetchActiveSurveyParts.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to fetch active survey parts";
      });

    // Handle submit survey answers
    builder
      .addCase(submitSurveyAnswers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitSurveyAnswers.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(submitSurveyAnswers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to submit survey answers";
      });
  },
});

export default surveysSlice.reducer;
