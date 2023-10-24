import { createSlice} from '@reduxjs/toolkit';
const empresasPaginadasSlice = createSlice({
  name: "empresasPaginadas",
  initialState: {
    pageNumber: null,
    pageSize: null,
    listaEmpresasTotal: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
    totalPaginasEmpresas: 1,
  },
  reducers: {
    setEmpresasPaginadas: (state, { payload }) => {
      state.isSuccess = true;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
      state.listaEmpresasTotal = payload;
    },
    setTotalPaginasEmpresas: (state, {payload})=>{
        state.totalPaginasEmpresas = payload;
    },
    clearStateEmpresa: (state) => {
      (state.isSuccess = false),
        (state.isError = false),
        (state.isLoading = false),
        (state.message = ""),
        (state.listaEmpresasTotal = []),
        (state.pageNumber = null),
        (state.pageSize = null);
    },
  },
  // extraReducers: {
  //   [cargarPaginaFiltradaListaEmpresas.fulfilled]: (state, { payload }) => {
  //     state.listaEmpresasTotal = payload.content;
  //     state.pageNumber = 0;
  //     state.pageSize = 50;
  //     state.isSuccess = true;
  //     state.isLoading = false;
  //     state.isError = false;
  //     console.log("Payload: ", payload);
  //     totalPaginas = payload.totalPages;
  //   },
  //   [cargarPaginaFiltradaListaEmpresas.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [cargarPaginaFiltradaListaEmpresas.rejected]: (state, { payload }) => {
  //     state.isSuccess = false;
  //     state.isLoading = false;
  //     state.isError = true;
  //     state.message = payload;
  //   },
  // },
});
export const { clearStateEmpresa, setEmpresasPaginadas, setTotalPaginasEmpresas } = empresasPaginadasSlice.actions;
export default empresasPaginadasSlice.reducer;
