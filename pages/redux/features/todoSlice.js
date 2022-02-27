import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchToDo = createAsyncThunk(
  "todo/fetch",
  async ({ }, thunkAPI) => {
    try {
      const response = await fetch('https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list')
      const data = await response.json()
      data.forEach(item=>{
        item.createdAt = new Date(item.createdAt)
      })
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
    modalType: "",
    modalData: {}
  },
  reducers: {
    // reducers here
    clearState: (state) => {
      state.isFetching = false;

      return state;
    },
    setModal: (state, { payload }) => {
      state.modalType = payload.type
      state.modalData = payload.modalData
    },
    completeTask: (state, { payload }) => {
      state.data[payload.id] = payload.type
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

export const { clearState,setModal } = todoSlice.actions;

export const todoSelector = (state) => state.todo;