import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userDetails: []
};


export const UserDetailsSlice = createSlice({
    name: "userdetails",
    initialState,
    reducers: {
        getUserDetails(state, action) {
            return {
                ...state,
                userDetails: action.payload,
            };
        }
    }
});
export const { getUserDetails } = UserDetailsSlice.actions;
export default UserDetailsSlice.reducer;