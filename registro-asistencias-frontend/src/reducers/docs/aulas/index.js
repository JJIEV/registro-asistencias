import { createSlice} from '@reduxjs/toolkit';
const aulasSlice = createSlice({
  name: "aulas",
  initialState: {
    aulasList: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    setAulasList: (state, { payload }) => {
      state.isSuccess = true;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
      state.aulasList = payload;
    },
    clearStateAulasList: (state) => {
      (state.isSuccess = false),
        (state.isError = false),
        (state.isLoading = false),
        (state.message = ""),
        (state.aulasList = []);
    },
  },

});
export const { clearStateAulasList, setAulasList } = aulasSlice.actions;
export default aulasSlice.reducer;
