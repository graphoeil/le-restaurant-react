// Imports
import React from "react";
import styled from "styled-components";

// Component
const Footer = () => {

	// Return
	return(
		<Wrapper>
			<h5>Le Restaurant</h5>
			<p><i>by</i> <b>Frédéric Hoyez</b> | <em>2022</em></p>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.footer`
	width: 100%;
	padding: 20px 10px;
	background-color: var(--darkGrey);
	color: white;
	text-align: center;
	h5{
		margin: 0 0 10px 0;
		font-family: var(--greatVibes);
		font-size: 40px;
	}
	p{
		font-family: var(--lora);
		i{
			font-size: 11px;
			font-style: italic;
		}
		b{
			font-weight: 700;
		}
		em{
			padding: 5px;
			background-color: var(--orange);
			color: white;
			font-size: 13px;
			font-weight: 700;
			border-radius: 5px;
		}
	}
	@media only screen and (min-width:768px){
		padding: 30px;
	}
`;

// Export
export default Footer;