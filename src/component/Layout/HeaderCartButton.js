import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";

import { useContext } from "react";
import CartContext from "../../store/cart-context";
// here we don't need the provider but the context itself

const HeaderCartButton = (props) => {
	// by useContext here, the header cart button component will be reevaluated by react whenever the context changes
	// changes made by CartProvider
	const cartCtx = useContext(CartContext);

	const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
		return curNumber + item.amount;
	}, 0);
	return (
		<button className={classes.button} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
