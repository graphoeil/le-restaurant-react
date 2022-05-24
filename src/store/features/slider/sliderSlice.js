// Imports
import { createSlice } from "@reduxjs/toolkit";
import sliderData from "../../../data/slider/sliderData";

// Initial state
const initialState = {
	sliderImages:sliderData,
	sliderImagesDOM:[sliderData[0]],
	sliderIndex:0,
	sliderTotal:sliderData.length,
	sliderBaseURL:'http://www.graphoeilmultimedia.com/reactDev/restaurant/imagesWWW/slider/'
};

// Slice
const sliderSlice = createSlice({
	name:'slider',
	initialState,
	reducers:{
		// Add new slider
		addNewSliderItem:(state) => {
			let newSliderIndex = state.sliderIndex + 1;
			if (newSliderIndex >= state.sliderTotal){
				newSliderIndex = 0;
			}
			let newSliderImagesDOM = [ ...state.sliderImagesDOM, state.sliderImages[newSliderIndex] ];
			// Return
			return{
				...state,
				sliderIndex:newSliderIndex,
				sliderImagesDOM:newSliderImagesDOM
			};
		}
	}
});

// Actions export
export const { addNewSliderItem } = sliderSlice.actions;

// Reducer export
export default sliderSlice.reducer;