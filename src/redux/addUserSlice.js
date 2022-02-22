import {createSlice} from "@reduxjs/toolkit"


const addUserSlice = createSlice({
    name: "adduser",
    initialState: {
        userInfo: [
            {
                name: "blyat",
                cvc: 333,
            },
        ],
    },
    reducers: {
        addUser: (state, action) => {
            state.userInfo = [...state.userInfo, action.payload]
        }
    },
})

export const {addUser} = addUserSlice.actions

export default addUserSlice.reducer;