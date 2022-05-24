// Imports
import React, { useEffect } from "react";
import styled from "styled-components";
import Isotope from "isotope-layout";
import theMenus from "../data/menus/theMenus";
import DecoLine from "./DecoLine";
import MenuItem from "./MenuItem";

// Component
const Menu = () => {

	// Isotope
	useEffect(() => {
		const card = document.getElementById('menus');
		const grid = card.querySelector('.grid');
		new Isotope(grid, {
			itemSelector:'.grid-item',
			layoutMode:'masonry'
		});
	},[]);

	// Return
	return(
		<Wrapper id="menus">
			<h2>The Menus</h2>
			<DecoLine color="#e27b60"/>
			<div className="grid">
				{
					theMenus.map((menuItem, index) => {
						return <MenuItem key={ index } { ...menuItem }/>
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
export default Menu;