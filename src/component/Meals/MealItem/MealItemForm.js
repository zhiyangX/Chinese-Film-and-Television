import classes from "./MealItemForm.module.css";

import { useRef, useState } from "react";

import Input from "../../UI/Input";

const MealItemForm = (props) => {
	const [amountIsValid, setAmountIsValid] = useState(true);
	const amountInputRef = useRef();
	const submitHandler = (event) => {
		event.preventDefault();
		// amountInputRef.current will point at the input element which is stored in that ref,
		// then every input element by default has a value property which holds the currently entered value which is always a string
		const enteredAmount = amountInputRef.current.value;
		const enteredAmountNumber = +enteredAmount;
		if (
			enteredAmount.trim().length === 0 ||
			enteredAmountNumber < 1 ||
			enteredAmountNumber > 5
		) {
			setAmountIsValid(false);
			return;
		}
		props.onAddToCart(enteredAmountNumber);
	};
	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<Input
				ref={amountInputRef}
				label="Amount"
				input={{
					id: "amount",
					type: "number",
					min: "1",
					max: "5",
					step: "1",
					defaultValue: "1",
				}}
			/>
			<button>+ Add</button>
			{!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
		</form>
	);
};

export default MealItemForm;
