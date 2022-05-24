// Imports
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { openLightbox, addNewGalleryVisual } from "../store/features/gallery/gallerySlice";

// Component
const GalleryItem = (props) => {

	// Store
	const { galleryBaseURL } = useSelector((store) => { return store.gallery; });
	const dispatch = useDispatch();

	// Variables
	const { id, small, caption } = props;

	// Image visible ?
	const [imageVisible, setImageVisible] = useState(false);

	// Show image and add new visual
	const showImage = () => {
		setImageVisible(true);
		dispatch(addNewGalleryVisual());
	};

	// Return
	return(
		<Wrapper className={ imageVisible ? 'visible' : '' } onClick={ () => { dispatch(openLightbox(id)); } }>
			<div className="photo">
				<img src={ `${ galleryBaseURL }${ small }` } alt={ caption } onLoad={ showImage } 
					onError={ () => { dispatch(addNewGalleryVisual()); } }/>
			</div>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.div`
	display: none;
	width: calc(170px - 10px);
	height: 160px;
	padding: 3px;
	margin: 5px;
	background-color: white;
	opacity: 0;
	transition: 0.5s opacity ease;
	cursor: zoom-in;
	&.visible{
		display: block;
		opacity: 1;
	}
	.photo{
		width: 100%;
		height: 100%;
		overflow: hidden;
		img{
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	@media only screen and (min-width:768px){
		width: calc(240px - 20px);
		height: 220px;
		margin: 10px;
	}
	@media only screen and (min-width:1024px){
		html.no-touchevents &{
			transition: 0.35s background ease;
			&:hover{
				background-color: var(--orange);
				.photo{
					img{
						transform: scale(1.2);
						transform-origin: center;
					}
				}
			}
			.photo{
				img{
					transition: 0.5s transform ease;
				}
			}
		}
	}
`;

// Export
export default GalleryItem;