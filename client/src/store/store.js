import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index"
import adminProductSlice from './admin-slice/product-slice/index'

import shopProductsSlice from "../store/shop/product-slice/index";
import shopCartSlice from "./shop/cart-slice/index";


const store = configureStore({
    reducer :{
      auth : authReducer,
      adminProducts : adminProductSlice,

      shopProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    }
})

export default store;