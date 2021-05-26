import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const HeaderCartButton = () => {
	const [btnIsHightlighted, setBtnIsHighlighted] = useState(false);
	const dispatch = useDispatch();

	const showCartHandler = () => {
		dispatch(uiActions.setCartIsShown(true));
	};
	const items = useSelector((state) => state.cart.items);
	const numberOfCartItems = items.length;

	const btnClasses = `${classes.button} ${
		btnIsHightlighted ? classes.bump : ""
	}`;

	useEffect(() => {
		if (items.length === 0) {
			return;
		}
		setBtnIsHighlighted(true);

		const timer = setTimeout(() => {
			setBtnIsHighlighted(false);
		}, 300);
		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button className={btnClasses} onClick={showCartHandler}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Torrent Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
