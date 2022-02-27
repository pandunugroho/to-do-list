import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { id } from "date-fns/locale";

export const fetchToDo = createAsyncThunk(
  "todo/fetch",
  async ({ }, thunkAPI) => {
    try {
      const response = await fetch('https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list')
      const data = await response.json()
      // data.forEach(item => {
      //   item.createdAt = new Date(item.createdAt)
      // })
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
    closeModal: (state) => {
      state.modalType = ""
      state.modalData = {}
    },
    completeTask: (state, { payload }) => {
      state.data[state.data.findIndex(item => item.id === payload.id)] = payload
    },
    deleteTask: (state, { payload }) => {
      state.data.splice(state.data.findIndex(item => item.id === payload.id), 1)
    },
    addTask: (state, { payload }) => {
      state.data = payload.data
    },
  },
  extraReducers: {
    // extra reducers here
    [fetchToDo.fulfilled]: (state, { payload }) => {
      state.data = payload.data
      state.isFetching = false;
      state.errorMessage = ""
      return state;
    },
    [fetchToDo.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchToDo.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.errorMessage = payload.message;
    },
  },
});

export const { clearState, setModal, closeModal, completeTask, deleteTask, addTask } = todoSlice.actions;

export const todoSelector = (state) => state.todo;