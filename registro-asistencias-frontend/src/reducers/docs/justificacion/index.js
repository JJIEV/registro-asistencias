import { createSlice} from '@reduxjs/toolkit';
const justificacionSlice = createSlice({
  name: "justificacion",
  initialState: {
    pageNumber: null,
    pageSize: null,
    totalPaginasJustificacion: 1,
    justificacion: {},
    listaJustificaciones: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    setJustificacion: (state, { payload }) => {
      state.isSuccess = true;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
      state.justificacion = payload;
    },
    setListaJustificaciones:(state, { payload }) => {
      state.isSuccess = true;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
      state.listaJustificaciones = payload;
    },
    setTotalPaginasJustificacion: (state, {payload})=>{
      state.totalPaginasJustificacion = payload;
  },
    clearStateJustificacion: (state) => {
      (state.isSuccess = false),
        (state.isError = false),
        (state.isLoading = false),
        (state.message = ""),
        (state.justificacion = {});
    },
  },

});
export const { clearStateJustificacion, setJustificacion, setListaJustificaciones, setTotalPaginasJustificacion } = justificacionSlice.actions;
export default justificacionSlice.reducer;
