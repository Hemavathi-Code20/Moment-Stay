import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setListings: (state, action) => {
      state.listings = action.payload.listings;
    },
    setTripList: (state, action) => {
      state.user.tripList = action.payload;
    },
    setWishList: (state, action) => {
      state.user.wishList = action.payload;
    },
    setPropertyList: (state, action) => {
      state.user.propertyList = action.payload;
    },
    setReservationList: (state, action) => {
      state.user.reservationList = action.payload;
    },
    addToWishList: (state, action) => {
      if (!state.user.wishList.find(listing => listing._id === action.payload._id)) {
        state.user.wishList.push(action.payload);
      }
    },
    removeFromWishList: (state, action) => {
      state.user.wishList = state.user.wishList.filter(
        (listing) => listing._id !== action.payload
      );
    },
  },
});

export const { setLogin, setLogout, setListings, setTripList, setWishList, setPropertyList, setReservationList, addToWishList, removeFromWishList } = userSlice.actions;

export default userSlice.reducer;
