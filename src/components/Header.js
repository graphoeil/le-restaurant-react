// Imports
import React, { useRef, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import styled from "styled-components";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { openNavMenu, closeNavMenu, setHeaderSmall } from "../store/features/navMenu/navMenuSlice";
import HeaderNavItem from "./HeaderNavItem";

// Component
const Header = () => {

	// Store
	const { isMobileMenuOpen, isHeaderSmall } = useSelector((store) => { return store.navMenu });
	const dispatch = useDispatch();

	// Scroll to section
	gsap.registerPlugin(ScrollToPlugin);
	const scrollToSection = (e) => {
		e.preventDefault();
		const scrollToRef = e.target.getAttribute('href');
		const scrollToRefElement = document.querySelector(scrollToRef);
		if (scrollToRefElement){
			let margin = 50;
			if (window.innerWidth >= 768){ margin = 95; }
			if (scrollToRef === '#slider'){ margin = 0; }
			gsap.to(window,{ duration:1, scrollTo:{ y:scrollToRef, offsetY:margin, ease:'power4.inOut' }});
		}
		// Close nav mobile on nav mobile btn click
		if (isMobileMenuOpen){
			dispatch(closeNavMenu());
			tlMenu.current.reverse();
		}
	};

	// Mobile menu button
	const handleClickBtnMobile = () => {
		if (isMobileMenuOpen){
			dispatch(closeNavMenu());
			tlMenu.current.reverse();
		} else {
			dispatch(openNavMenu());
			tlMenu.current.play();
		}
	};

	// Reference
	const overlayRef = useRef();
	const navRef = useRef();

	// Timeline GSAP
	const tlMenu = useRef();
	useLayoutEffect(() => {
		tlMenu.current = gsap.timeline({ paused:true, onReverseComplete:() => {
			overlayRef.current.removeAttribute('style');
			navRef.current.removeAttribute('style');
		} });
		tlMenu.current
		.set(overlayRef.current,{ display:'block' })
		.to(overlayRef.current,{ duration:0.5, opacity:1, ease:'power4.inOut' })
		.to(navRef.current,{ duration:0.7, left:'0', ease:'bounce.out' },'-=0.3');
	},[]);

	// Window resize => mobile menu btn
	const timerResize = useRef();
	useLayoutEffect(() => {
		window.addEventListener('resize', () => {
			if (timerResize.current){ clearTimeout(timerResize.current); }
			timerResize.current = setTimeout(() => {
				const windowWidth = window.innerWidth;
				if (windowWidth >= 768){
					dispatch(closeNavMenu());
					tlMenu.current.pause(0);
					if (overlayRef.current.hasAttribute('style')){
						overlayRef.current.removeAttribute('style');
					}
					if (navRef.current.hasAttribute('style')){
						navRef.current.removeAttribute('style');
					}
				}
			},10);
		});
		window.dispatchEvent(new Event('resize'));
		// Clean
		return () => {
			window.removeEventListener('resize', () => {});
		}
		// eslint-disable-next-line
	},[]);

	// Window scroll => header fix
	const timerScroll = useRef();
	useLayoutEffect(() => {
		window.addEventListener('scroll', () => {
			if (timerScroll.current){ clearTimeout(timerScroll.current); }
			timerScroll.current = setTimeout(() => {
				const windowScroll = window.scrollY;
				if (windowScroll >= 50){
					dispatch(setHeaderSmall(true));
				} else {
					dispatch(setHeaderSmall(false));
				}
			},10);
		});
		window.dispatchEvent(new Event('scroll'));
		// Clean
		return () => {
			window.removeEventListener('scroll', () => {});
		}
		// eslint-disable-next-line
	},[]);

	// Return
	return(
		<Wrapper className={ isHeaderSmall ? 'small' : '' }>
			
			{/* Overlay */}
			<div className="overlay" ref={ overlayRef }/>
			{/* Overlay */}

			{/* Inner header */}
			<div className="innerHeader">

				{/* Mobile title < 1300px */}
				<a href="#slider" className="mobileTitle" onClick={ scrollToSection }>
					Le Restaurant
				</a>
				{/* Mobile title < 1300px */}

				{/* Btn menu mobile */}
				<button type="button" 
					className={ `mobileMenuBtn ${ isMobileMenuOpen ? 'cross' : '' }` } 
					onClick={ handleClickBtnMobile }>
					<div className="inner">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</button>
				{/* Btn menu mobile */}

				{/* Navigation */}
				<nav ref={ navRef }>
					<HeaderNavItem link="#card" handleClick={ scrollToSection } iconClass="fa-solid fa-fork-knife" text="The Card"/>
					<HeaderNavItem link="#menus" handleClick={ scrollToSection } iconClass="fa-solid fa-memo" text="The Menus"/>
					<a href="#slider" className="largeTitle" onClick={ scrollToSection }>Le Restaurant</a>
					<HeaderNavItem link="#gallery" handleClick={ scrollToSection } iconClass="fa-solid fa-image-polaroid" text="The Gallery"/>
					<HeaderNavItem link="#contact" handleClick={ scrollToSection } iconClass="fa-solid fa-envelope" text="Contact"/>
					<div className="socialHeader">
						<button type="button" className="socialButton"><i className="fa-brands fa-facebook-f"></i></button>
						<button type="button" className="socialButton"><i className="fa-brands fa-twitter"></i></button>
						<button type="button" className="socialButton"><i className="fa-brands fa-instagram"></i></button>
					</div>
				</nav>
				{/* Navigation */}

			</div>
			{/* Inner header */}

		</Wrapper>
	);

};

// Styled
const Wrapper = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 70px;
	transition: 0.35s height ease;
	z-index: 99;
	&.small{
		height: 50px;
		box-shadow: 0 2px 10px rgba(0,0,0,0.7);
		.innerHeader{
			.mobileTitle{
				top: 10px;
			}
			.mobileMenuBtn{
				top: 5px;
			}
			nav{
				top: 50px;
			}
		}
	}
	.overlay{
		position: fixed;
		display: none;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.5);
		opacity: 0;
		z-index: -1;
	}
	.innerHeader{
		z-index: 1;
		width: 100%;
		height: 100%;
		background-color: var(--grey);
		.mobileTitle{
			display: block;
			position: absolute;
			top: 17px;
			left: 10px;
			font-family: var(--greatVibes);
			font-size: 40px;
			color: white;
			transition: 0.35s;
		}
		.mobileMenuBtn{
			display: block;
			position: absolute;
			top: 15px;
			right: 20px;
			width: 40px;
			height: 40px;
			background-color: transparent;
			border: none;
			transition: 0.35s top ease;
			.inner{
				position: absolute;
				top: 50%;
				left: 50%;
				width: 35px;
				height: 24px;
				transform: translate(-50%,-50%);
				span{
					display: block;
					position: absolute;
					left: 0;
					width: 100%;
					height: 2px;
					background-color: white;
					border-radius: 50px;
					transition: 0.35s transform ease, 0.35s opacity ease;
				}
				span:nth-child(1){
					top: 0;
				}
				span:nth-child(2){
					top: 11px;
				}
				span:nth-child(3){
					top: 22px;
				}
			}
			&.cross{
				span:nth-child(1){
					transform: rotate(45deg);
					top: 12px;
				}
				span:nth-child(2){
					opacity: 0;
				}
				span:nth-child(3){
					transform: rotate(-45deg);
					top: 12px;
				}
			}
		}
		nav{
			position: absolute;
			top: 70px;
			left: -100%;
			width: 100%;
			transition: 0.35s top ease;
			.largeTitle{ display: none; }
			a.navBtn{
				display: block;
				width: 100%;
				padding: 20px;
				background-color: var(--orange);
				color: white;
				font-family: var(--lora);
				font-size: 16px;
				font-weight: 700;
				i{
					width: 25px;
					margin: 0 5px 0 0;
				}
				&:nth-child(1){
					background-color: white;
					color: var(--darkGrey);
				}
				&:nth-child(4){
					background-color: white;
					color: var(--darkGrey);
				}
			}
			.socialHeader{
				width: 100%;
				padding: 10px 0;
				text-align: center;
				background-color: var(--grey);
				button{
					display: inline-block;
					margin: 0 20px 0 0;
					padding: 0 10px;
					background-color: transparent;
					border: none;
					color: white;
					font-size: 18px;
				}
				button:last-child{
					margin: 0;
				}
			}
		}
	}
	@media only screen and (min-width:768px){
		&{
			height: 110px;
			transition: 0.35s height ease;
			&.small{
				height: 95px;
				.innerHeader{
					background-color: var(--grey);
					text-shadow: none;
					.mobileTitle{
						font-size: 40px;
						top: 15px;
					}
					nav{
						top: 55px;
						a.navBtn{
							font-weight: 400;
						}
						.socialHeader button{
							text-shadow: none;
						}
					}
				}
			}
			.innerHeader{
				background-color: transparent;
				text-shadow: 0 0 2px rgba(0,0,0,0.8);
				transition: 0.35s background ease;
				.mobileTitle{
					top: 20px;
					left: 0;
					width: 100%;
					font-size: 50px;
					text-align: center;
				}
				.mobileMenuBtn{
					display: none;
				}
				nav{
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					justify-content: center;
					align-items: center;
					left: 0;
					a.navBtn{
						flex: 0 1 auto;
						width: auto;
						padding: 5px 15px;
						color: white;
						background-color: transparent !important;
						i{
							display: none;
						}
						&:nth-child(1){
							background-color: transparent !important;
							color: white;
						}
						&:nth-child(4){
							background-color: transparent !important;
							color: white;
						}
					}
					.socialHeader{
						width: auto;
						margin: 0 0 0 10px;
						background-color: transparent !important;
						button{
							margin: 0 10px 0 0;
							text-shadow: 0 0 2px rgb(0 0 0 / 80%);
						}
					}
				}
			}
		}
	}
	@media only screen and (min-width:1024px){
		.innerHeader{
			nav{
				a.navBtn{
					padding: 5px 20px;
					i{
						display: inline-block;
					}
				}
			}
		}
		/* & is the header ,-) */
		html.no-touchevents & .innerHeader{
			nav{
				a.navBtn{
					transition: 0.35s color ease;
					&:hover{
						color: var(--orange);
					}
				}
				.socialHeader{
					button{
						transition: 0.35s color ease;
						&:hover{
							color: var(--orange);
						}
					}
				}
			}
		}
	}
	@media only screen and (min-width:1300px){
		&.small{
			.innerHeader{
				nav{
					top: 15px;
					.largeTitle{
						font-size: 45px;
					}
				}
			}
		}
		.innerHeader{
			.mobileTitle{
				display: none;
			}
			nav{
				top: 20px;
				a.navBtn{
					padding: 5px 30px;
				}
				.largeTitle{
					display: inline-block;
					margin: 0 10px;
					font-family: var(--greatVibes);
					font-size: 60px;
					color: white;
					transition: 0.35s ease;
				}
				.socialHeader{
					width: 100%;
					padding: 5px 0 0 0;
				}
			}
		}

	}
`;

// Export
export default Header;