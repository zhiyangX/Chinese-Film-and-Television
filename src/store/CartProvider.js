// store cart management logic in here to keep App.js clean

import CartContext from "./cart-context";
import { useReducer, userReducer } from "react";

const defaultCartState = {
	items: [],
	totalAmount: 0,
};
// cartReducer won't need anything from CartProvider component, and it shouldn't be recreated all the time
const cartReducer = (state, action) => {
	if (action.type === "ADD") {
		// concat() adds a new item but unlike push, it doesn't edit the existing array but return a new array
		// we don't want to edit old state snapshot, we want generate a brand new state object
		const updatedItems = state.items.concat(action.item);
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	return defaultCartState;
};

const CartProvider = (props) => {
	//user hooks to make sure whenever cartState change, CartProvider is render again
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCartHandler = (item) => {
		dispatchCartAction({ type: "ADD", item: item });
	};
	const removeItemFromCartHandler = (id) => {
		dispatchCartAction({ type: "REMOVE", id: id });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};
	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
