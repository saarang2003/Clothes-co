import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index"
import adminProductSlice from './admin-slice/product-slice/index'

import shopProductsSlice from "../store/shop/product-slice/index";
import shopCartSlice from "./shop/cart-slice/index";
import shopReviewSlice from "./shop/review-slice/index";
import commonFeatureSlice from "./common-slice";

const store = configureStore({
    reducer :{
      auth : authReducer,
      adminProducts : adminProductSlice,

      shopProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    shopReview: shopReviewSlice,
    commonFeature: commonFeatureSlice,
    }
})

export default store;