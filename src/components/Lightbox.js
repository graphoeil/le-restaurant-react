// Imports
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import gsap from "gsap";
import { closeLightbox } from "../store/features/gallery/gallerySlice";
import LightboxLoader from "./LightboxLoader";

// Component
const Lightbox = () => {

	// Store
	const { ligthboxVisual:{ large, caption }, galleryBaseURL } = useSelector((store) => { return store.gallery });
	const dispatch = useDispatch();

	// Lightbox visible ?
	const [lightboxVisible, setLightboxVisible] = useState(false);

	// Loader visible ?
	const [loaderVisible, setLoaderVisible] = useState(true);
	const removeLoader = () => {
		setLoaderVisible(false);
	};

	// Ref and timeline
	const imageRef = useRef();
	const captionRef = useRef();
	const tlLightbox = useRef();

	// Image visible ?
	const showImage = (loaded) => {
		if (loaded){
			tlLightbox.current = gsap.timeline();
			tlLightbox.current
			.set(captionRef.current,{ left:'-200px', opacity:1 })
			.to(imageRef.current,{ duration:1, opacity:1, ease:'none' })
			.to(captionRef.current,{ duration:0.7, left:'10px', ease:'bounce.out' });
		} else {
			// Close LB
			dispatch(closeLightbox());
		}
	};

	// Remove lightbox
	const removeLightbox = () => {
		setLightboxVisible(false);
		setTimeout(() => {
			dispatch(closeLightbox());
		},500);
	};
 
	// Fade in lightBox
	useEffect(() => {
		setLightboxVisible(true);
	},[]);
	
	// Return
	return(
		<Wrapper className={ lightboxVisible ? 'visible' : '' } onClick={ removeLightbox }>
			{ loaderVisible && <LightboxLoader image={ large } handleLoad={ showImage } handleRemove={ removeLoader }/> }
			<div className="imageContainer" ref={ imageRef }>
				<img src={ `${ galleryBaseURL }${ large }` } alt={ caption } />
			</div>
			<p ref={ captionRef }>{ caption }</p>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: var(--darkGrey);
	opacity: 0;
	transition: 1s opacity ease;
	cursor: zoom-out;
	z-index: 999;
	&.visible{
		opacity: 1;
	}
	.imageContainer{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		opacity: 0;
		img{
			display: block;
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}
	p{
		display: inline-block;
		position: absolute;
		bottom: 10px;
		left: 10px;
		max-width: calc(100% - 20px);
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-family: var(--lora);
		font-size: 16px;
		padding: 10px;
		background-color: var(--orange);
		color: white;
		border-radius: 5px;
		opacity: 0;
	}
`;

// Export
export default Lightbox;