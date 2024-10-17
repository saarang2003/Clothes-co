import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
    isLoading : false,
    productList: [],
    productDetails: null,
}


export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams, sortParams }) => {
    try {
      // Create query parameters
      const queryParams = new URLSearchParams();
      
      // Add filter parameters if they exist
      if (filterParams) {
        Object.entries(filterParams).forEach(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            queryParams.append(key, value.join(','));
          }
        });
      }
      
      // Add sort parameter
      if (sortParams) {
        queryParams.append('sortBy', sortParams);
      }

      console.log('Request URL:', `http://localhost:5000/api/shop/products/get?${queryParams}`);
      
      const result = await axios.get(
        `http://localhost:5000/api/shop/products/get?${queryParams}`
      );

      console.log('API Response:', result.data);
      
      return result?.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
);   

export const fetchProductDetails = createAsyncThunk(
    "/products/fetchProductDetails",
    async (id) => {
      const result = await axios.get(
        `http://localhost:5000/api/shop/products/get/${id}`
      );
  
      return result?.data;
    }
  );


  const shoppingProductSlice = createSlice({
    name: "shoppingProducts",
    initialState,
    reducers: {
      setProductDetails: (state) => {
        state.productDetails = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllFilteredProducts.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.productList = action.payload.data;
        })
        .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
          state.isLoading = false;
          state.productList = [];
        })
        .addCase(fetchProductDetails.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(fetchProductDetails.fulfilled, (state, action) => {
          state.isLoading = false;
          state.productDetails = action.payload.data;
        })
        .addCase(fetchProductDetails.rejected, (state, action) => {
          state.isLoading = false;
          state.productDetails = null;
        });
    },
  });
  
  export const { setProductDetails } = shoppingProductSlice.actions;
  
  export default shoppingProductSlice.reducer;