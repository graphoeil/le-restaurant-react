// Imports
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

// Variables
const google = window.google;
const bubbleInfoTitle = 'Le Restaurant';
const bubbleInfoAdress = 'Dalton House<br>60 Windsor Avenue<br>London SW19 2RR';

// Component
const Map = ({ latitude, longitude, zoom }) => {

	// Googlemap ref
	const mapRef = useRef();

	// Init map
	useEffect(() => {
		// Map container
		const mapContainer = mapRef.current;
		// Map center
		const mapCenter = new google.maps.LatLng(latitude, longitude);
		// Map options
		const mapOptions = {
			scrollwheel:false,
			center:mapCenter,
			mapTypeId:google.maps.MapTypeId.ROADMAP,
			zoom:Number(zoom),
			// map | satellite
			mapTypeControl:true,
			mapTypeControlOptions:{
				style:google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
				position:google.maps.ControlPosition.LEFT_TOP
			},
			// Zoom options
			zoomControl:true,
			zoomControlOptions:{
				style:google.maps.ZoomControlStyle.SMALL,
				position:google.maps.ControlPosition.LEFT_CENTER
			}
		};
		// Init map
		const map = new google.maps.Map(mapContainer, mapOptions);
		// Marker
		const marker = new google.maps.Marker({
			draggable:false,
			position: mapCenter,
			title:bubbleInfoTitle,
			map:map
		});
		// Info window
		const bubbleInfo = new google.maps.InfoWindow({
			content:`<div class="bubbleInfo"><b>${ bubbleInfoTitle }</b><br>
				${ bubbleInfoAdress }<a href="https://www.google.com/maps?saddr&daddr=${ latitude },${ longitude }" target="blank">Route to ></a></div>`
		});
		bubbleInfo.open(map,marker);
	},[latitude, longitude, zoom]);

	// Return
	return(
		<Wrapper ref={ mapRef }></Wrapper>
	);

};

// Styled
const Wrapper = styled.div`
	position: relative;
	width: 100%;
	height: 400px;
	margin: 0;
	background-color: white;
	font-family: var(--lora);
	font-size: 16px;
	line-height: 1.3em;
	text-align: left;
	overflow: hidden;
	.bubbleInfo{
		overflow: hidden;
		font-family: var(--lora);
		b{
			font-weight: 700;
			font-size: 16px;
			color: var(--orange);
		}
		a{
			display: block;
			margin: 5px 0 0 0;
			padding: 4px;
			background-color: var(--orange);
			color: white;
			font-weight: 700;
			text-align: center;
			border-radius: 2px;
		}
	}
	@media only screen and (min-width:768px){
		height: 500px;
	}
`;

// Export
export default Map;