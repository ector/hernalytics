import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

export interface DashboardSurvey {
  caption: string;
  published: boolean;
  completion_date: string;
  completion_time: string;
  id: number;
  survey_status: string;
}

interface SurveyState {
  surveys: DashboardSurvey[];
  previousSurveys: DashboardSurvey[];
  upcomingSurveys: DashboardSurvey[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SurveyState = {
  surveys: [],
  previousSurveys: [],
  upcomingSurveys: [],
  status: 'idle',
  error: null,
};

export const fetchSurveys = createAsyncThunk(
  'surveys/fetchSurveys',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token || localStorage.getItem('auth_token');

    const response = await fetch('https://veoapi.cogai.uk/dashboard/observer', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch surveys');
    }

    return response.json();
  }
);

// Async thunk to fetch previous surveys
export const fetchPreviousSurveys = createAsyncThunk(
  'surveys/fetchPreviousSurveys',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token || localStorage.getItem('auth_token');

    const response = await fetch('https://veoapi.cogai.uk/dashboard/observer_previous_surveys', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch previous surveys');
    }

    return response.json();
  }
);

export const fetchUpcomingSurveys = createAsyncThunk(
  'surveys/fetchUpcomingSurveys',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token || localStorage.getItem('auth_token');

    const response = await fetch('https://veoapi.cogai.uk/surveys/surveys', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch upcoming surveys');
    }

    return response.json();
  }
);

// Create the slice
const surveysSlice = createSlice({
  name: 'surveys',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle current surveys
    builder
      .addCase(fetchSurveys.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSurveys.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.surveys = action.payload;
      })
      .addCase(fetchSurveys.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch surveys';
      });

    // Handle previous surveys
    builder
      .addCase(fetchPreviousSurveys.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPreviousSurveys.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.previousSurveys = action.payload;
      })
      .addCase(fetchPreviousSurveys.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch previous surveys';
      });

    // Handle upcoming surveys
    builder
      .addCase(fetchUpcomingSurveys.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUpcomingSurveys.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.upcomingSurveys = action.payload;
      })
      .addCase(fetchUpcomingSurveys.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch upcoming surveys';
      });
  },
});

export default surveysSlice.reducer;
