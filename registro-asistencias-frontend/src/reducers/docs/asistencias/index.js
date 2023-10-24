import { createSlice} from '@reduxjs/toolkit';
const asistenciasSlice = createSlice({
  name: "asistencias",
  initialState: {
    pageNumber: null,
    pageSize: null,
    asistencias: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
    totalPaginasAsistencias: 1,
  },
  reducers: {
    setAsistencias: (state, { payload }) => {
      state.isSuccess = true;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
      state.asistencias = payload;
    },
    setTotalPaginasAsistencias: (state, {payload})=>{
      state.totalPaginasAsistencias = payload;
  },
    clearStateAsistencias: (state) => {
      (state.isSuccess = false),
        (state.isError = false),
        (state.isLoading = false),
        (state.message = ""),
        (state.asistencias = []);
    },
  },

});
export const { clearStateAsistencias, setAsistencias, setTotalPaginasAsistencias } = asistenciasSlice.actions;
export default asistenciasSlice.reducer;
