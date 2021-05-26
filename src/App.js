import { useSelector } from "react-redux";
import Header from "./component/Layout/Header";
import Dramas from "./component/Dramas/Dramas";
import Cart from "./component/Cart/Cart";

function App() {
	const cartIsShown = useSelector((state) => state.ui.cartIsShown);

	return (
		<>
			{cartIsShown && <Cart />}
			<Header />
			<main>
				<Dramas />
			</main>
		</>
	);
}

export default App;
