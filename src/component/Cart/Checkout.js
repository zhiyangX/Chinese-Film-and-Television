import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";

const Checkout = (props) => {
	const dispatch = useDispatch();
	const [formInputsValidity, setFormInputsValidity] = useState({
		name: true,
		email: true,
	});

	const nameInputRef = useRef();
	const emailInputRef = useRef();

	const hideCartHandler = () => {
		dispatch(uiActions.setCartIsShown(false));
	};
	const confirmHandler = (event) => {
		event.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredEmail = emailInputRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredEmailIsValid = !isEmpty(enteredEmail);

		setFormInputsValidity({
			name: enteredNameIsValid,
			email: enteredEmailIsValid,
		});

		const formIsValid = enteredNameIsValid && enteredEmailIsValid;

		if (!formIsValid) {
			return;
		}

		props.onConfirm({
			name: enteredName,
			street: enteredEmail,
		});
	};

	const nameControlClasses = `${classes.control} ${
		formInputsValidity.name ? "" : classes.invalid
	}`;
	const emailControlClasses = `${classes.control} ${
		formInputsValidity.email ? "" : classes.invalid
	}`;

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={nameControlClasses}>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" ref={nameInputRef} />
				{!formInputsValidity.name && <p>Please enter a valid name!</p>}
			</div>
			<div className={emailControlClasses}>
				<label htmlFor="street">Email</label>
				<input type="text" id="street" ref={emailInputRef} />
				{!formInputsValidity.email && <p>Please enter a valid email!</p>}
			</div>
			<div className={classes.actions}>
				<button type="button" onClick={hideCartHandler}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
