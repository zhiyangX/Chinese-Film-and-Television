import React from "react";
import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/Poster.jpg";
import classes from "./Header.module.css";

const Header = () => {
	return (
		<>
			<header className={classes.header}>
				<h1>Chinese Film and Television</h1>
				<HeaderCartButton />
			</header>
			<div className={classes["main-image"]}>
				<img src={mealsImage} alt="Chinese show poster" />
			</div>
		</>
	);
};

export default Header;
