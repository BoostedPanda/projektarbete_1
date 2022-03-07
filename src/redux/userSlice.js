import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

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
  cardInformation: []
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
    },
    handleActive: (state, action) => {
      const activeCard = state.cardInformation.find((card) => card.cardStateActive === true)
      if (activeCard) {
        activeCard.cardStateActive = !activeCard.cardStateActive
      }

      const card = state.cardInformation.find((card) => card.cardNumber === action.payload)
      if (card) {
        card.cardStateActive = !card.cardStateActive
      }
    },
    handleDeactivate: (state, action) => {
      console.log("asd")
      const card = state.cardInformation.find((card) => card.cardNumber === action.payload)
      console.log(card)
      if (card) {
        card.cardStateActive = !card.cardStateActive
      }
    }

  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      const { first, last } = action.payload.name;
      const fullName = `${first} ${last}`.toUpperCase();

      state.cardInformation.push({
        cardName: fullName,
        cardNumber: "1234567891011121",
        cardMonth: "12",
        cardYear: "21",
        ccv: "111",
        bankName: "visa",
        cardStateActive: true,
        cardType: 'dark'
      })
    })
  }
})

export const { addUser, removeUser, handleActive, handleDeactivate } = userSlice.actions

export default userSlice.reducer;