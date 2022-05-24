// Imports
import React from "react";

// Components
const HeaderNavItem = (props) => {

	// Variables
	const { link, handleClick, iconClass, text } = props;

	// Return
	return(
		<a href={ link } className="navBtn" onClick={ handleClick }>
			<i className={ iconClass }></i>
			{ text }
		</a>
	);

};

// Export
export default HeaderNavItem;