// Imports
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import DecoLine from './DecoLine';
import GalleryItem from "./GalleryItem";

// Component
const Gallery = () => {

	// Store
	const { galleryDOM } = useSelector((store) => { return store.gallery });

	// Return
	return(
		<Wrapper id="gallery">
			<h2 style={ { marginBottom:'10px' } }>The Gallery</h2>
			<DecoLine color="white"/>
			<p>
				We are also on <a href="https://www.instagram.com/graphoeil" target="_blank" 
					title="graphoeil on instagram" rel="noreferrer noopener">
					<i className="fa-brands fa-instagram"></i> Instagram
				</a>
			</p>
			<div className="galleryContainer">
				{
					galleryDOM.map((item) => {
						return <GalleryItem key={ item.id } { ...item }/>
					})
				}
			</div>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.section`
	max-width: none;
	background-color: var(--grey);
	h2{
		color: white;
	}
	p{
		text-align: center;
		color: white;
		font-family: var(--lora);
		a{
			display: inline-block;
			padding: 5px 5px;
			margin: 0 0 0 5px;
			background-color: rgba(255,255,255,0.2);
			color: white;
			border: 1px solid white;
			border-radius: 2px;
			font-size: 11px;
			font-weight: 700;
		}
	}
	.galleryContainer{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-content: center;
		align-items: center;
		max-width: 1300px;
		margin: 20px auto 10px auto;
	}
	@media only screen and (min-width:768px){
		p{
			a{
				font-size: 13px;
			}
		}
	}
	@media only screen and (min-width:1024px){
		p{
			a{
				font-size: 14px;
			}
		}
		html.no-touchevents & p{
			a{
				transition: 0.35s padding ease, 0.35s background ease;
				&:hover{
					padding: 5px 10px;
					background-color: rgba(255,255,255,0.4);
				}
			}
		}
	}
`;

// Export
export default Gallery;