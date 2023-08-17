import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data: []
};


export const UserSlice = createSlice({
    name: "userslist",
    initialState,
    reducers: {
        getAllUsers(state, action) {
            return {
                ...state,
                data: action.payload,
            };
        }
    }
});
export const { getAllUsers } = UserSlice.actions;
export default UserSlice.reducer;