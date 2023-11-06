import { createSlice} from '@reduxjs/toolkit';
const materiasSlice = createSlice({
  name: "materias",
  initialState: {
    materiasList: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    setMateriasList: (state, { payload }) => {
      state.isSuccess = true;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
      state.materiasList = payload;
    },
    clearStateMateriaList: (state) => {
      (state.isSuccess = false),
        (state.isError = false),
        (state.isLoading = false),
        (state.message = ""),
        (state.materiasList = []);
    },
  },

});
export const { clearStateMateriasList, setMateriasList } = materiasSlice.actions;
export default materiasSlice.reducer;
