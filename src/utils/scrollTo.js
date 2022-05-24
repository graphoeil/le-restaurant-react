// Imports
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";

// Scroll to section
gsap.registerPlugin(ScrollToPlugin);
const scrollToSection = (section) => {
	const scrollToRefElement = document.querySelector(section);
	if (scrollToRefElement){
		let margin = 50;
		if (window.innerWidth >= 768){ margin = 95; }
		gsap.to(window,{ duration:1, scrollTo:{ y:section, offsetY:margin, ease:'power4.inOut' }});
	}
};

// Export
export default scrollToSection;