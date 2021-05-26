import classes from "./Modal.module.css";

import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const Backdrop = (props) => {
	const dispatch = useDispatch();
	const hideCartHandler = () => {
		dispatch(uiActions.setCartIsShown(false));
	};
	return <div className={classes.backdrop} onClick={hideCartHandler} />;
};

const ModalOverlay = (props) => {
	return (
		<div className={classes.modal}>
			<div className={classes.content}>{props.children}</div>
		</div>
	);
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
	return (
		<>
			{ReactDOM.createPortal(<Backdrop />, portalElement)}
			{ReactDOM.createPortal(
				<ModalOverlay>{props.children}</ModalOverlay>,
				portalElement
			)}
		</>
	);
};

export default Modal;
