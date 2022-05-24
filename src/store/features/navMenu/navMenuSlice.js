// Imports
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
	isMobileMenuOpen:false,
	isHeaderSmall:false,
	isTouch:false
};

// Slice
const navMenuSlice = createSlice({
	name:'menu',
	initialState,
	reducers:{
		// Open mobile menu
		openNavMenu:(state) => {
			state.isMobileMenuOpen = true;
		},
		// Close mobile menu
		closeNavMenu:(state) => {
			state.isMobileMenuOpen = false;
		},
		// Set is touch
		setIsTouch:(state) => {
			state.isTouch = true;
		},
		// Set header small
		setHeaderSmall:(state, action) => {
			state.isHeaderSmall = action.payload;
		}
	}
});

// Actions export
export const { openNavMenu, closeNavMenu, setIsTouch, setHeaderSmall } = navMenuSlice.actions;

// Reducer export
export default navMenuSlice.reducer;