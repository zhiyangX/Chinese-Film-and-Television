import classes from "./DramaItem.module.css";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cart-slice";

const DramaItem = (props) => {
	const dispatch = useDispatch();
	const addToCartHandler = () => {
		dispatch(
			cartActions.addItemToCart({
				id: props.id,
				title: props.title,
				price: props.price,
			})
		);
	};
	return (
		<li className={classes.meal}>
			<div>
				<h3>{props.title}</h3>
				<div className={classes.description}>{props.description}</div>
				<div className={classes.price}>{props.price}</div>
			</div>
			<div>
				<button className={classes.button} onClick={addToCartHandler}>
					+
				</button>
			</div>
		</li>
	);
};
export default DramaItem;
