import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UsersReducer";
import getUserDetails from './getUserDetailReducer'

const stores = configureStore({
    reducer: {
        Users: UserSlice,
        userDetails: getUserDetails
    }
});


export default stores;
