// Imports
import React from "react";
import styled from "styled-components";
import DecoLine from "./DecoLine";
import scrollToSection from "../utils/scrollTo";

// Component
const RestaurantIntro = () => {

	// Return
	return(
		<Wrapper>

			{/* Book a table */}
			<button type="button" onClick={ () => { scrollToSection('#contact'); } }>
				Book a table
			</button>
			{/* Book a table */}

			{/* Text */}
			<h1>Le Restaurant</h1>
			<DecoLine color="#e27b60"/>
			<p>Dave found joy in the daily routine of life. He awoke at the same time, ate the same 
				breakfast and drove the same commute. He worked at a job that never seemed to change 
				and he got home at 6 pm sharp every night. It was who he had been for the last 
				ten years and he had no idea that was all about to change.</p>
			<p>The lone lamp post of the one-street town flickered, not quite dead but definitely on 
				its way out. Suitcase by her side, she paid no heed to the light, the street or the 
				town. A car was coming down the street and with her arm outstretched and thumb 
				in the air, she had a plan.</p>
			<p>Pink ponies and purple giraffes roamed the field. Cotton candy grew from the ground 
				as a chocolate river meandered off to the side. What looked like stones in 
				the pasture were actually rock candy. Everything in her dream seemed to be 
				perfect except for the fact that she had no mouth.</p>
			{/* Text */}

		</Wrapper>
	);

};

// Styled
const Wrapper = styled.section`
	padding-top: 70px;
	button{
		display: block;
		position: absolute;
		top: -55px;
		left: 50%;
		transform: translateX(-50%);
		width: 106px;
		height: 106px;
		border: none;
		border-radius: 50%;
		background-color: var(--orange);
		color: white;
		font-family: var(--lora);
		font-size: 14px;
		font-weight: 700;
	}
	@media only screen and (min-width:768px){
		padding-top: 90px;
		button{
			top: -63px;
			width: 126px;
			height: 126px;
			font-size: 16px;
		}
	}
	@media only screen and (min-width:1024px){
		html.no-touchevents & button{
			transition: 0.35s background ease;
			&:hover{
				background-color: var(--orangeHover);
			}
		}
	}
`;

// Export
export default RestaurantIntro;