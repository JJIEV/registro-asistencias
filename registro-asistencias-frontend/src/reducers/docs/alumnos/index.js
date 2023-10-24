import { createSlice} from '@reduxjs/toolkit';
const alumnosSlice = createSlice({
  name: "alumnos",
  initialState: {
    pageNumber: null,
    pageSize: null,
    totalPaginasAlumnos: 1,
    alumnos: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    setAlumnos: (state, { payload }) => {
      state.isSuccess = true;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
      state.alumnos = payload;
    },
    setTotalPaginasAlumnos: (state, {payload})=>{
      state.totalPaginasAlumnos = payload;
  },
    clearStateAlumnos: (state) => {
      (state.isSuccess = false),
        (state.isError = false),
        (state.isLoading = false),
        (state.message = ""),
        (state.alumnos = []);
    },
  },

});
export const { clearStateAlumnos, setAlumnos, setTotalPaginasAlumnos } = alumnosSlice.actions;
export default alumnosSlice.reducer;
