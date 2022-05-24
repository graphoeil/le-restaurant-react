// Imports
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import scrollToSection from "../utils/scrollTo";

// Component
const Parallax = ({ image, title, subTitle, btnLink, btnText }) => {

	// Store
	const { isTouch } = useSelector((store) => { return store.navMenu });

	// Variables
	const baseURL = 'http://www.graphoeilmultimedia.com/reactDev/restaurant/imagesWWW/various/';

	// Return
	return(
		<Wrapper image={ `${ baseURL }${ image }` } className={ !isTouch ? 'fixed' : '' }>
			<div className="inner">
				<h3>{ title }</h3>
				<h4>{ subTitle }</h4>
				<button type="button" onClick={ () => { scrollToSection(btnLink); } }>
					{ btnText }
				</button>
			</div>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.div`
	position: relative;
	width: 100%;
	height: 250px;
	overflow: hidden;
	background: ${ (props) => { return `url('${ props.image }') top left no-repeat` } };
	background-size: cover;
	&.fixed{
		background-attachment: fixed;
	}
	.inner{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 100%;
		text-align: center;
		padding: 0 10px;
		h3{
			font-family: var(--greatVibes);
			font-size: 40px;
			color: white;
			text-shadow: 0 0 2px rgba(0,0,0,0.8);
			margin: 0 0 10px 0;
		}
		h4{
			font-family: var(--lora);
			font-size: 16px;
			font-weight: 700;
			line-height: 1.3em;
			color: white;
			text-shadow: 0 0 2px rgba(0,0,0,0.8);
			margin: 0 0 20px 0;
		}
		button{
			display: inline-block;
			padding: 10px 10px;
			background-color: rgba(255,255,255,0.2);
			color: white;
			border: 1px solid white;
			border-radius: 2px;
			font-family: var(--lora);
			font-size: 11px;
			font-weight: 700;
		}
	}
	@media only screen and (min-width:768px){
		height: 300px;
		.inner{
			h3{
				font-size: 50px;
			}
			h4{
				font-size: 18px;
				margin: 0 0 30px 0;
			}
			button{
				font-size: 13px;
			}
		}
	}
	@media only screen and (min-width:1024px){
		.inner{
			h3{
				font-size: 60px;
			}
			h4{
				font-size: 22px;
			}
			button{
				font-size: 14px;
			}
		}
		html.no-touchevents & .inner{
			button{
				transition: 0.35s background ease, 0.35s padding ease;
				&:hover{
					background-color: rgba(255,255,255,0.4);
					padding: 10px 20px;
				}
			}
		}
	}
`;

// Export
export default Parallax;