import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
	name: "ui",
	initialState: { cartIsShown: false },
	reducers: {
		setCartIsShown(state, action) {
			state.cartIsShown = action.payload;
		},
	},
});

export default uiSlice;
export const uiActions = uiSlice.actions;
