// Imports
import { createSlice } from "@reduxjs/toolkit";
import galleryData from "../../../data/gallery/galleryData";

// Initial state
const initialState = {
	gallery:galleryData,
	galleryDOM:[galleryData[0]],
	galleryIndex:0,
	galleryTotal:galleryData.length,
	isLightboxVisible:false,
	ligthboxVisual:{},
	galleryBaseURL:'http://www.graphoeilmultimedia.com/reactDev/restaurant/imagesWWW/gallery/'
};

// Slice
const gallerySlice = createSlice({
	name:'gallery',
	initialState,
	reducers:{
		// Open lightbox
		openLightbox:(state, action) => {
			const visualID = action.payload;
			const ligthboxVisual = galleryData.find((item) => {
				return item.id === visualID;
			});
			return{ ...state, isLightboxVisible:true, ligthboxVisual };
		},
		// Close lightbox
		closeLightbox:(state) => {
			state.isLightboxVisible = false;
		},
		// Add new slider
		addNewGalleryVisual:(state) => {
			let newGalleryIndex = state.galleryIndex + 1;
			if (newGalleryIndex < state.galleryTotal){
				let newGalleryDOM = [ ...state.galleryDOM, state.gallery[newGalleryIndex] ];
				// Return
				return{
					...state,
					galleryIndex:newGalleryIndex,
					galleryDOM:newGalleryDOM
				};
			} else {
				return { ...state };
			}
		}
	}
})

// Actions export
export const { openLightbox, closeLightbox, addNewGalleryVisual } = gallerySlice.actions;

// Reducer export
export default gallerySlice.reducer;