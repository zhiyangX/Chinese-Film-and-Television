import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		items: [],
		totalAmount: 0,
	},
	reducers: {
		addItemToCart(state, action) {
			const newItem = action.payload;
			const existingItem = state.items.find((item) => item.id === newItem.id);
			if (!existingItem) {
				state.items.push({
					id: newItem.id,
					price: newItem.price,
					title: newItem.title,
				});
				state.totalAmount = state.totalAmount + +newItem.price;
			}
		},
		removeItemFromCart(state, action) {
			const id = action.payload;
			const existingItem = state.items.find((item) => item.id === id);
			state.totalAmount = state.totalAmount - existingItem.price;
			state.items = state.items.filter((item) => item.id !== id);
		},
		clearCart(state) {
			state = {
				items: [],
				totalAmount: 0,
			};
		},
	},
});

export default cartSlice;
export const cartActions = cartSlice.actions;
