import { createSlice} from '@reduxjs/toolkit';
const aulaMateriaSlice = createSlice({
  name: "aulaMateria",
  initialState: {
    aulaMateriaList: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    setAulaMateriaList: (state, { payload }) => {
      state.isSuccess = true;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
      state.aulaMateriaList = payload;
    },
    clearStateAulaMateriaList: (state) => {
      (state.isSuccess = false),
        (state.isError = false),
        (state.isLoading = false),
        (state.message = ""),
        (state.aulaMateriaList = []);
    },
  },

});
export const { clearStateAulaMateriaList, setAulaMateriaList } = aulaMateriaSlice.actions;
export default aulaMateriaSlice.reducer;
