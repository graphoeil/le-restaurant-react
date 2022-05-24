// Imports
import React from "react";
import styled from "styled-components";

// Component
const DecoLine = ({ color }) => {

	// Return
	return(
		<Wrapper color={ color }>
			<i className="fa-solid fa-star"></i>
			<i className="fa-solid fa-star"></i>
			<i className="fa-solid fa-plate-utensils"></i>
			<i className="fa-solid fa-star"></i>
			<i className="fa-solid fa-star"></i>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.div`
	padding: 10px 0 20px 0;
	text-align: center;
	color: ${ (props) => props.color };
	i{
		margin: 0 10px 0 0;
		&:last-child{
			margin: 0;
		}
		&:nth-child(1), &:nth-child(5){
			font-size: 10px;
		}
		&:nth-child(2), &:nth-child(4){
			font-size: 16px;
		}
		&:nth-child(3){
			font-size: 24px;
		}
	}
`;

// Export
export default DecoLine;