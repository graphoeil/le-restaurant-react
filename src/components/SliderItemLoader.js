// Imports
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import gsap from "gsap";

// Component
const SliderItemLoader = ({ image, handleLoad, handleRemove }) => {

	// Store
	const { sliderBaseURL } = useSelector((store) => { return store.slider });

	// Load image
	useEffect(() => {
		const loadImage = new Image();
		loadImage.src = `${ sliderBaseURL }${ image }`;
		// Image loaded
		loadImage.addEventListener('load', () => {
			handleLoad(true);
			setTimeout(() => {
				gsap.to(containerRef.current,{ duration:1, opacity:0, onComplete:() => { handleRemove(); } });
			},1000);
		});
		// Image error
		loadImage.addEventListener('error', () => {
			handleLoad(false);
			setTimeout(() => {
				gsap.to(containerRef.current,{ duration:1, opacity:0, onComplete:() => { handleRemove(); } });
			},1000);
		});
		return () => {
			loadImage.removeEventListener('load', () => {});
			loadImage.removeEventListener('error', () => {});
		}
		// eslint-disable-next-line
	},[]);

	// Ref and timeline
	const containerRef = useRef();
	const circle1Ref = useRef();
	const circle2Ref = useRef();
	const circle3Ref = useRef();
	const circle4Ref = useRef();
	const tlLoader = useRef();

	// Animation
	useEffect(() => {
		tlLoader.current = gsap.timeline();
		tlLoader.current
		.to(containerRef.current,{ duration:2, rotation:360, transformOrigin:'center center', ease:'none', repeat:-1 })
		.to(circle1Ref.current,{ duration:0.7, y:-60, ease:'none', yoyo:true, repeat:-1 },'0')
		.to(circle2Ref.current,{ duration:0.7, x:60, ease:'none', yoyo:true, repeat:-1 },'0')
		.to(circle3Ref.current,{ duration:0.7, y:60, ease:'none', yoyo:true, repeat:-1 },'0')
		.to(circle4Ref.current,{ duration:0.7, x:-60, ease:'none', yoyo:true, repeat:-1 },'0');
		return () => {
			tlLoader.current.kill();
		}
	},[]);

	// Return
	return(
		<Wrapper ref={ containerRef }>
			<div className="circle" ref={ circle1Ref }/>
			<div className="circle" ref={ circle2Ref }/>
			<div className="circle" ref={ circle3Ref }/>
			<div className="circle" ref={ circle4Ref }/>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.div`
	display: inline-block;
	position: absolute;
	width: 36px;
	height: 36px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 10;
	.circle{
		display: block;
		position: absolute;
		width: 18px;
		height: 18px;
		top: 9px;
		left: 9px;
		background-color: white;
		border-radius: 50%;
		box-shadow: 0 0 2px rgba(0,0,0,0.8);
	}
`;

// Export
export default SliderItemLoader;