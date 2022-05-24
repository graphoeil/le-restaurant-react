// Imports
import React, { useEffect } from "react";
import styled from "styled-components";
import Isotope from "isotope-layout";
import theCard from "../data/menus/theCard";
import DecoLine from "./DecoLine";
import CardItem from "./CardItem";

// Component
const Card = () => {

	// Isotope
	useEffect(() => {
		const card = document.getElementById('card');
		const grid = card.querySelector('.grid');
		new Isotope(grid, {
			itemSelector:'.grid-item',
			layoutMode:'masonry'
		});
	},[]);

	// Return
	return(
		<Wrapper id="card">
			<h2>The Card</h2>
			<DecoLine color="#e27b60"/>
			<div className="grid">
				{
					theCard.map((cardItem, index) => {
						return <CardItem key={ index } { ...cardItem }/>
					})
				}
			</div>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.section`
	@media only screen and (min-width:768px){
		.grid{
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: center;
			align-content: stretch;
		}
	}
`;

// Export
export default Card;