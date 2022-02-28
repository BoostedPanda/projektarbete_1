import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

export const getUser = createAsyncThunk("Home/getUser", async () => {
    const response = await fetch("https://randomuser.me/api/");
    const json = await response.json();
    const data = await json
    const userData = await data.results[0]
    return userData;
})

const initialState = {
    status: null,
    cards: [],
    cardInformation: [
      {
        cardName: "",
        cardNumber: "1234567891011121",
        cardMonth: "12",
        cardYear: "21",
        ccv: "111",
        bankName: "visa",
        cardStateActive: true
      }
    ]
  };

const userSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.cardInformation = [...state.cardInformation, action.payload]
        },
        removeUser: (state, action) => {
          state.cardInformation = state.cardInformation.filter(user => user.cardNumber !== action.payload)
        }
    },
    extraReducers: {
        [getUser.fulfilled]: (state, action) => {
            const {first, last} = action.payload.name;
            let wholeName = first + " " + last;
            for (let i = 0; i < state.cardInformation.length; i++) {
              state.cardInformation[i].cardName = wholeName.toUpperCase();
            }
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

export const {addUser, removeUser} = userSlice.actions

export default userSlice.reducer;