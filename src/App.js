// Imports
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsTouch } from "./store/features/navMenu/navMenuSlice";
import "./css/displayMain.css";
import { Header, PushDown, Slider, RestaurantIntro, 
	Parallax, Card, Menu, Gallery, Lightbox, Contact, Map, Footer } from "./components";

// Modernizr
const Modernizr = window.Modernizr;

// Component
const App = () => {

	// Store
	const { isLightboxVisible } = useSelector((store) => { return store.gallery });
	const dispatch = useDispatch();

	// isTouch ?
	useEffect(() => {
		if (Modernizr.touchevents){
			dispatch(setIsTouch());
		}
		// eslint-disable-next-line
	},[]);

	// Return
	return(
		<React.Fragment>
			
			{/* Header */}
			<Header/>
			{/* Header */}

			{/* Push down */}
			<PushDown/>
			{/* Push down */}

			{/* Slider */}
			<Slider/>
			{/* Slider */}

			{/* Restaurant introduction */}
			<RestaurantIntro/>
			{/* Restaurant introduction */}

			{/* Parallax */}
			<Parallax image="parallax1.jpg" title="The Restaurant gallery" 
				subTitle="Our cooliest and funniest moments" btnLink="#gallery" 
				btnText="Go to gallery"/>
			{/* Parallax */}

			{/* Card */}
			<Card/>
			{/* Card */}

			{/* Parallax */}
			<Parallax image="goldenBook.jpg" title="Come to the restaurant" 
				subTitle="The best table in town" btnLink="#contact" 
				btnText="View map"/>
			{/* Parallax */}

			{/* Menus */}
			<Menu/>
			{/* Menus */}

			{/* Gallery & lightbox */}
			{
				isLightboxVisible && <Lightbox/>
			}
			<Gallery/>
			{/* Gallery & lightbox */}

			{/* Contact & map */}
			<Contact/>
			<Map latitude="51.411344" longitude="-0.186706" zoom="16"/>
			{/* Contact & map */}

			{/* Footer */}
			<Footer/>
			{/* Footer */}

		</React.Fragment>
	);

};

// Export
export default App;