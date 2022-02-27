import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchToDo = createAsyncThunk(
  "todo/fetch",
  async ({ }, thunkAPI) => {
    try {
      const response = await fetch('https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list')
      const data = await response.json()
      // const list = await data
      return { data }
    } catch (err) {
      return thunkAPI.rejectWithValue({ message: "Failed to fetch initial list" })
    }
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    data: [],
    isFetching: false,
    errorMessage: "",
  },
  reducers: {
    // reducers here
    clearState: (state) => {
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    // extra reducers here
    [fetchToDo.fulfilled]: (state, { payload }) => {
      // console.log("(fulfilled) payload: ", payload);
      state.data = payload.data
      state.isFetching = false;
      state.errorMessage = ""
      return state;
    },
    [fetchToDo.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchToDo.rejected]: (state, { payload }) => {
      // console.log("(rejected) payload: ", payload);
      state.isFetching = false;
      state.errorMessage = payload.message;
    },
  },
});

export const { clearState } = todoSlice.actions;

export const todoSelector = (state) => state.todo;