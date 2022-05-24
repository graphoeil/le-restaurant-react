// Imports
import React from "react";
import styled from "styled-components";
import DecoLine from "./DecoLine";

// Component
const CardItem = ({ title, dishes }) => {

	// Return
	return(
		<Wrapper className="grid-item">
			<div className="inner">
				<h3>{ title }</h3>
				<DecoLine color="#e27b60"/>
				{
					dishes.map((dish, index) => {
						// Variables
						const { title, price } = dish;
						// Return
						return(
							<p key={ index }>{ title } - <b>${ price }</b></p>
						);
					})
				}
			</div>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.div`
	position: relative;
	width: 100%;
	padding: 10px;
	background-color: white;
	font-family: var(--lora);
	text-align: center;
	.inner{
		padding: 10px;
		border-radius: 10px;
		border: 1px solid var(--orange);
	}
	h3{
		font-size: 18px;
		font-weight: 700;
		margin: 10px 0;
		color: var(--orange);
	}
	p{
		text-align: center;
		b{
			font-weight: 700;
			color: var(--orange);
		}
	}
	@media only screen and (min-width:768px){
		margin: 10px;
		padding: 0;
		width: calc(50% - 20px);
	}
	@media only screen and (min-width:1024px){
		width: calc(33.33% - 20px);
	}
`;

// Export
export default CardItem;