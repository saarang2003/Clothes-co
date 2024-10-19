import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

export const getFeatureImages = createAsyncThunk(
    "/order/getFeatureImages",
    async () => {
      const response = await axios.get(
        `http://localhost:5000/api/common/feature/get`
      );
  
      return response.data;
    }
  );
  
  export const addFeatureImage = createAsyncThunk(
    "/order/addFeatureImage",
    async (image) => {
      const response = await axios.post(
        `http://localhost:5000/api/common/feature/add`,
        { image }
      );
  
      return response.data;
    }
  );



  const commonSlice = createSlice({
    name: "commonSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getFeatureImages.pending, (state) => {
          console.log('Fetching images...');
          state.isLoading = true;
        })
        .addCase(getFeatureImages.fulfilled, (state, action) => {
          console.log('Fetch successful:', action.payload);
          state.isLoading = false;
          state.featureImageList = action.payload.data.map((item) => ({
            image: item.image,
          }));
          console.log('Updated state:', state.featureImageList);
        })
        .addCase(getFeatureImages.rejected, (state, action) => {
          console.error('Fetch failed:', action.error);
          state.isLoading = false;
          state.featureImageList = [];
        });
    },
  });
  
  export default commonSlice.reducer;