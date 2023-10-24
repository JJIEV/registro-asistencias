import { createSlice} from '@reduxjs/toolkit';
const especialidadesSlice = createSlice({
  name: "especialidades",
  initialState: {
    especialidadesList: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    setEspecialidadesList: (state, { payload }) => {
      state.isSuccess = true;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
      state.especialidadesList = payload;
    },
    clearStateEspecialidadesList: (state) => {
      (state.isSuccess = false),
        (state.isError = false),
        (state.isLoading = false),
        (state.message = ""),
        (state.especialidadesList = []);
    },
  },

});
export const { clearStateEspecialideadesList, setEspecialidadesList } = especialidadesSlice.actions;
export default especialidadesSlice.reducer;
