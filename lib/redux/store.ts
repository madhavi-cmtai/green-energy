import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from "./features/blogsSlice";
import leadReducer from "./features/leadSlice";
import productReducer from "./features/productSlice";
import serviceReducer from "./features/serviceSlice";
import authReducer from "./features/authSlice";
import countReducer from "./features/countSlice";
import teamMemberReducer from "./features/teamMemberSlice";


export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    lead: leadReducer,
    product: productReducer,
    services:serviceReducer, 
    auth: authReducer,
    count: countReducer,
    teamMembers: teamMemberReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;