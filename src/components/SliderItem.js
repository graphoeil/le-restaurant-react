// Imports
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import gsap from "gsap";
import SliderItemLoader from "./SliderItemLoader";
import { addNewSliderItem } from "../store/features/slider/sliderSlice";

// Global variables
const SplitText = window.SplitText;

// Component
const SliderItem = (props) => {

	// Store
	const { sliderBaseURL } = useSelector((store) => { return store.slider });
	const dispatch = useDispatch();

	// Variables
	const { image, title, subTitle, link, linkText, linkTarget } = props;

	// State
	const [loaderVisible, setLoaderVisible] = useState(true);

	// Ref and timeline
	const imageContainerRef = useRef();
	const textAreaRef = useRef();
	const decoLineRef = useRef();
	const titleRef = useRef();
	const subTitleRef = useRef();
	const linkContainerRef = useRef();
	const tlSlider = useRef();

	// Show image when image load in loader component
	const showImage = (loaded) => {
		if (loaded){
			// Titre and subTitle split
			const titleSplit = new SplitText(titleRef.current,{ type:'words' });
			titleSplit.split({ type:'words' });
			const subTitleSplit = new SplitText(subTitleRef.current,{ type:'words' });
			subTitleSplit.split({ type:'words' });
			// Animation
			tlSlider.current = gsap.timeline({ onComplete:handleComplete });
			tlSlider.current
			.set(decoLineRef.current,{ y:-30, alpha:0 })
			.set(titleRef.current,{ y:-30, alpha:0 })
			.set(subTitleRef.current,{ y:-30, alpha:0 })
			.set(linkContainerRef.current,{ y:-30, alpha:0 })
			.set(textAreaRef.current,{ opacity:1 })
			.to(imageContainerRef.current,{ duration:1, opacity:1 })
			.to(decoLineRef.current,{ duration:1, y:0, alpha:1, ease:'power2.inOut' },'-=0.4')
			.to(titleRef.current,{ duration:1, y:0, alpha:1, ease:'power2.inOut' },'-=0.6')
			.to(subTitleRef.current,{ duration:1, y:0, alpha:1, ease:'power2.inOut' },'-=0.6')
			.to(linkContainerRef.current,{ duration:1, y:0, alpha:1, ease:'power2.inOut' },'-=0.8')
			.to(decoLineRef.current,{ duration:0.2, y:30, alpha:0, ease:'power2.inOut' },'+=3')
			.to(titleSplit.words,{ duration:0.2, alpha:0, scale:2, stagger:{ each:0.1 } })
			.to(subTitleSplit.words,{ duration:0.2, alpha:0, scale:2, stagger:{ each:0.1 } })
			.to(linkContainerRef.current,{ duration:0.35, alpha:0, ease:'power2.inOut' });
		} else {
			// Next image
			dispatch(addNewSliderItem());
		}
	};

	// Dispatch add new slider item ONCE !!!
	let isDispatched = false;
	const handleComplete = () => {
		if (!isDispatched){
			tlSlider.current.kill();
			isDispatched = true;
			dispatch(addNewSliderItem());
		}
	};

	// Remove loader
	const removeLoader = () => {
		setLoaderVisible(false);
	};

	// Return
	return(
		<Wrapper className="sliderItem">
			
			{/* Loader */}
			{ loaderVisible && <SliderItemLoader image={ image } handleLoad={ showImage } handleRemove={ removeLoader }/> }
			{/* Loader */}

			{/* Image container */}
			<div className="imageContainer" ref={ imageContainerRef }>
				<img src={ `${ sliderBaseURL }${ image }` } alt={ title } />
			</div>
			{/* Image container */}

			{/* Text area */}
			<div className="textArea" ref={ textAreaRef }>
				<div className="decoLine" ref={ decoLineRef }>
					<i className="fa-solid fa-star"></i>
					<i className="fa-solid fa-star"></i>
					<i className="fa-solid fa-fork-knife"/>
					<i className="fa-solid fa-star"></i>
					<i className="fa-solid fa-star"></i>
				</div>
				<h3 ref={ titleRef }>{ title }</h3>
				<h4 ref={ subTitleRef }>{ subTitle }</h4>
				{/* Link container */}
				<div className="linkContainer" ref={ linkContainerRef }>
					{
						link && <a href={ link } target={ linkTarget }>
							{ linkText }
						</a>
					}
				</div>
				{/* Link container */}
			</div>
			{/* Text area */}

		</Wrapper>
	);

};

// Styled
const Wrapper = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	.imageContainer{
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0;
		img{
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.textArea{
		position: absolute;
		width: 100%;
		top: 50%;
		transform: translateY(-50%);
		padding: 0 10px;
		text-align: center;
		z-index: 4;
		opacity: 0;
		.decoLine{
			margin: 0 0 20px 0;
			color: white;
			text-shadow: 0 0 2px rgba(0,0,0,0.8);
			i{
				margin: 0 10px 0 0;
			}
			i:last-child{ margin: 0; }
			i:nth-child(1), i:nth-child(5){
				font-size: 10px;
			}
			i:nth-child(2), i:nth-child(4){
				font-size: 16px;
			}
			i:nth-child(3){
				font-size: 20px;
			}
		}
		h3{
			display: block;
			font-family: var(--greatVibes);
			font-size: 50px;
			color: white;
			text-shadow: 0 0 2px rgba(0,0,0,0.8);
		}
		h4{
			display: block;
			margin: 0 0 15px 0;
			font-family: var(--lora);
			font-size: 16px;
			line-height: 1.3em;
			font-weight: 700;
			color: white;
			text-shadow: 0 0 2px rgba(0,0,0,0.8);
		}
		.linkContainer{
			display: inline-block;
			a{
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
	}
	@media only screen and (min-width:768px){
		.textArea{
			h3{
				font-size: 72px;
				margin: 0 0 10px 0;
			}
			h4{
				font-size: 22px;
				margin: 0 0 20px 0;
			}
			.linkContainer{
				a{
					font-size: 13px;
				}
			}
		}
	}
	@media only screen and (min-width:1024px){
		.textArea{
			h3{
				font-size: 92px;
				margin: 0 0 20px 0;
			}
			h4{
				font-size: 24px;
				margin: 0 0 30px 0;
			}
			.linkContainer{
				a{
					font-size: 14px;
				}
			}
		}
		html.no-touchevents & .textArea{
			.linkContainer{
				a{
					transition: 0.35s padding ease, 0.35s background ease;
				}
				a:hover{
					padding: 10px 20px;
					background-color: rgba(255,255,255,0.4);
				}
			}
		}
	}
	@media only screen and (min-width:1300px){
		.textArea{
			h3{
				font-size: 130px;
			}
		}
	}
`;

// Export
export default SliderItem;