// Imports
import { configureStore } from "@reduxjs/toolkit"; 
import navMenuSlice from "./features/navMenu/navMenuSlice";
import sliderSlice from "./features/slider/sliderSlice";
import gallerySlice from "./features/gallery/gallerySlice";
import contactSlice from "./features/contact/contactSlice";

// Store
const store = configureStore({
	reducer:{
		navMenu:navMenuSlice,
		slider:sliderSlice,
		gallery:gallerySlice,
		contact:contactSlice
	}
});

// Export
export default store;