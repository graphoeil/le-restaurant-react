// Imports
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

// Component
const PushDown = () => {

	// Store
	const { isHeaderSmall } = useSelector((store) => { return store.navMenu });

	// Return
	return(
		<Wrapper className={ isHeaderSmall ? 'small' : '' }/>
	);

};

// Styled
const Wrapper = styled.div`
	height: 70px;
	&.small{
		height: 50px;
	}
	@media only screen and (min-width:768px){
		display: none;
	}
`;

// Export
export default PushDown;