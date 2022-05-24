// Imports
import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import SliderItem from "./SliderItem";

// Component
const Slider = () => {

	// Store
	const { sliderImagesDOM } = useSelector((store) => { return store.slider });

	// Cleaning the DOM, optimization
	useEffect(() => {
		if (sliderImagesDOM.length > 2){
			const slider = document.getElementById('slider');
			const sliderItems = slider.querySelectorAll('.sliderItem');
			slider.removeChild(sliderItems[0]);
		}
	},[sliderImagesDOM]);

	// Return
	return(
		<Wrapper id="slider">
			{
				sliderImagesDOM.map((item, index) => {
					return <SliderItem key={ index } { ...item }/>
				})
			}
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.div`
	position: relative;
	width: 100%;
	height: 60%;
	overflow: hidden;
	background-color: var(--grey);
	@media only screen and (min-width:1024px){
		height: 100%;
	}
`;

// Export
export default Slider;