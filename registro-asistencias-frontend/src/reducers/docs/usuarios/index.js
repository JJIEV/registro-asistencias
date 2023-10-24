import { createSlice} from '@reduxjs/toolkit';
const usuariosPaginadosSlice = createSlice({
  name: "usuariosPaginadas",
  initialState: {
    pageNumber: null,
    pageSize: null,
    listaUsuariosTotal: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
    totalPaginas: 1,
  },
  reducers: {
    setUsuariosPaginados: (state, { payload }) => {
      state.isSuccess = true;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
      state.listaUsuariosTotal = payload;
    },
    setTotalPaginas: (state, {payload})=>{
        state.totalPaginas = payload;
    },
    clearStateUsuario: (state) => {
      (state.isSuccess = false),
        (state.isError = false),
        (state.isLoading = false),
        (state.message = ""),
        (state.listaUsuariosTotal = []),
        (state.pageNumber = null),
        (state.pageSize = null);
    },
  },
});
export const { clearStateUsuario, setUsuariosPaginados, setTotalPaginas } = usuariosPaginadosSlice.actions;
export default usuariosPaginadosSlice.reducer;