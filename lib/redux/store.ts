import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from "./features/blogsSlice";
import leadReducer from "./features/leadSlice";
import productReducer from "./features/productSlice";
import serviceReducer from "./features/serviceSlice";
import authReducer from "./features/authSlice";
import countReducer from "./features/countSlice";


export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    lead: leadReducer,
    product: productReducer,
    services:serviceReducer, 
    auth: authReducer,
    count: countReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;