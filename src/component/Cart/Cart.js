import classes from "./Cart.module.css";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { cartActions } from "../../store/cart-slice";
import { useSelector } from "react-redux";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = () => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const dispatch = useDispatch();
	const items = useSelector((state) => state.cart.items);
	const totalAmount = useSelector((state) => state.cart.totalAmount);
	const hideCartHandler = () => {
		dispatch(uiActions.setCartIsShown(false));
	};
	const hasItems = items.length > 0;

	const cartItemRemoveHandler = (id) => {
		dispatch(cartActions.removeItemFromCart(id));
	};
	const orderHandler = () => {
		setIsCheckout(true);
	};
	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true);
		await fetch(
			"https://chinesedrama-cae77-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
			{
				method: "POST",
				body: JSON.stringify({ user: userData, orderedItems: items }),
			}
		);
		setIsSubmitting(false);
		setDidSubmit(true);
		dispatch(cartActions.clearCart());
	};

	const cartItems = (
		<ul className={classes["cart-items"]}>
			{items.map((item) => (
				<CartItem
					key={item.id}
					title={item.title}
					price={item.price}
					// .bind(null, item.id) ensures that the id of the to be added or removed item is passed here to RemoveHandler
					// bind pre-configure the argument that function will receive when it's being executed
					// so we ensure these two function do receive the id or the item respectively
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					// bind explanation: https://www.javascripttutorial.net/javascript-bind/
				/>
			))}
		</ul>
	);

	const modalActions = (
		<div className={classes.actions}>
			<button className={classes["button--alt"]} onClick={hideCartHandler}>
				Close
			</button>
			{hasItems && (
				<button className={classes.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);

	const cartModalContent = (
		<>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && <Checkout onConfirm={submitOrderHandler} />}
			{!isCheckout && modalActions}
		</>
	);
	const isSubmittingModalContent = <p>Sending order data..</p>;
	const didSubmitModalContent = (
		<>
			<p>Successfully sent the order!</p>
			<div className={classes.actions}>
				<button className={classes.button} onClick={hideCartHandler}>
					Close
				</button>
			</div>
		</>
	);
	return (
		<Modal>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
};

export default Cart;
