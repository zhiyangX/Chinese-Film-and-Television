import classes from "./AvailableDramas.module.css";

import Card from "../UI/Card";
import DramaItem from "./DramaItem/DramaItem";
import { useEffect, useState } from "react";

const AvailableDramas = () => {
	const [dramas, setDramas] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState(null);
	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch(
				"https://chinesedrama-cae77-default-rtdb.asia-southeast1.firebasedatabase.app/dramas.json"
			);
			if (!response.ok) {
				throw new Error("Something went wrong");
			}
			const responseData = await response.json();
			const loadedDramas = [];
			for (const key in responseData) {
				loadedDramas.push({
					id: key,
					title: responseData[key].title,
					description: responseData[key].description,
					price: responseData[key].price.toFixed(2),
				});
			}
			setDramas(loadedDramas);
			setIsLoading(false);
		};
		fetchMeals().catch((error) => {
			setIsLoading(false);
			setHttpError(error.message);
		});
	}, []);
	if (isLoading) {
		return (
			<section className={classes.MealsLoading}>
				<p>Loading</p>
			</section>
		);
	}

	if (httpError) {
		return (
			<section className={classes.MealsError}>
				<p>{httpError}</p>
			</section>
		);
	}
	const dramasList = dramas.map((drama) => (
		<DramaItem
			key={drama.id}
			id={drama.id}
			title={drama.title}
			description={drama.description}
			price={drama.price}
		/>
	));
	return (
		<section className={classes.meals}>
			<Card>
				<ul>{dramasList}</ul>
			</Card>
		</section>
	);
};

export default AvailableDramas;
