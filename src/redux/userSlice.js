import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

export const getUser = createAsyncThunk("Home/getUser", async () => {
    let response = await fetch("https://randomuser.me/api/");
    let json = await response.json();
    console.log(json)
    return json;
})

const userSlice = createSlice({
    name: "card",
    initialState: {
        user: [],
        status: null
    },
    extraReducers: {
        [getUser.fulfilled]: (state, action) => {
            // let updatedUser = state.user.concat(action.payload);
            state.user = action.payload;
            state.status = true;
        },
        [getUser.pending]: (state) => {
            state.status = false;
        },
        [getUser.rejected]: (state) => {
        state.status = false;
        }
    }

})

export default userSlice.reducer;