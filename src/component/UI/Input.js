import classes from "./Input.module.css";

const Input = (props) => {
	return (
		<div className={classes.input}>
			<label htmlFor={props.input.id}>{props.label}</label>
			{/*{...props.input} ensures that all the key value pairs in this input object are added as props to input*/}
			<input {...props.input} />
		</div>
	);
};
export default Input;
