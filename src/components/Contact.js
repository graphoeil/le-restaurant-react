// Imports
import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { handleChange, sendMessage } from "../store/features/contact/contactSlice";
import DecoLine from "./DecoLine";

// Component
const Contact = () => {

	// Store
	const { formSubmitted, name, nameValid, company,
		email, emailValid, phone, message, messageValid,
		formValid } = useSelector((store) => { return store.contact });
	const dispatch = useDispatch();

	// Handle field change
	const handleFieldChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		dispatch(handleChange({ name, value }));
	};

	// Handle submit
	const handleSubmit = (e) => {
		e.preventDefault();
		setFormOpen(false);
		setTimeout(() => {
			dispatch(sendMessage({
				name,
				company,
				email,
				phone,
				message
			}));
		},1000);
		setTimeout(() => {
			setFormOpen(true);
		},2000);
	};

	// Form open ?
	const [formOpen, setFormOpen] = useState(true);

	// Return
	return(
		<Wrapper id="contact">
			<h2>Contact & Map</h2>
			<DecoLine color="#e27b60"/>
			<p className="center">He had three simple rules by which he lived. The first was to never eat blue food. 
				There was nothing in nature that was edible that was blue.</p>
			<p>You can contact us by :</p>
			<p>
				<i className="fa-solid fa-circle-small"></i>
				Email at <a href="mailto:graphoeil@gmail.com">graphoeil@gmail.com</a>
			</p>
			<p>
				<i className="fa-solid fa-circle-small"></i>
				Phone at <a href="tel:0000000000">0000000000</a>
			</p>
			<p>
				<i className="fa-solid fa-circle-small"></i>
				Filling the form below
			</p>
			<div className={ `formContainer ${ formOpen ? 'show' : 'hide' }` }>
				{
					!formSubmitted ? <form>
						<div className="leftForm">
							<div className="formField">
								<input type="text" name="name" value={ name } onChange={ handleFieldChange } placeholder="Name"/>
								<div className="check">
									{ nameValid ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i> }
								</div>
							</div>
							<div className="formField">
								<input type="text" name="company" value={ company } onChange={ handleFieldChange } placeholder="Company"/>
							</div>
						</div>
						<div className="rightForm">
							<div className="formField">
								<input type="email" name="email" value={ email } onChange={ handleFieldChange } placeholder="Email"/>
								<div className="check">
									{ emailValid ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i> }
								</div>
							</div>
							<div className="formField">
								<input type="text" name="phone" value={ phone } onChange={ handleFieldChange } placeholder="Phone"/>
							</div>
						</div>
						<div className="fullWidthForm">
							<textarea name="message" value={ message } onChange={ handleFieldChange } placeholder="Your message"/>
							<div className="check">
								{ messageValid ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i> }
							</div>
						</div>
						<div className="fullWidthForm">
							<button type="submit" disabled={ !formValid } onClick={ handleSubmit }>
								Submit form
							</button>
						</div>
					</form> : <div className="thanks">
						<h4>Message submitted</h4>
						<p>Thanks, we will answer as fast as possible...</p>
					</div>
				}
			</div>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.section`
	p{
		margin: 10px 0 auto 0;
		line-height: 1.6em;
		&.center{
			margin: 0;
			text-align: center;
		}
		i{
			margin: 0 5px 0 0;
			color: var(--orange);
		}
		a{
			display: inline-block;
			padding: 5px 10px;
			background-color: var(--orange);
			color: white;
			border-radius: 5px;
			font-weight: 700;
		}
	}
	.formContainer{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-content: flex-start;
		align-items: center;
		font-family: var(--lora);
		font-size: 16px;
		line-height: 1.3em;
		max-width: 1300px;
		margin: 0 auto;
		transition: 1s max-height ease;
		&.show{
			max-height: 500px;
			overflow: auto;
		}
		&.hide{
			max-height: 0;
			overflow: hidden;
		}
		form{
			width: 100%;
			.leftForm, .rightForm, .fullWidthForm{
				margin: 10px 0;
			}
			.formField{
				width: 100%;
				border: 1px solid #ccc;
				border-radius: 5px;
				margin: 0 0 10px 0;
				input[type="text"], input[type="email"]{
					display: inline-block;
					width: calc(100% - 30px);
					padding: 7px;
					color: #333;
					background-color: transparent;
					border: none;
					font-family: var(--lora);
				}
				.check{
					display: inline-block;
					width: 30px;
					text-align: center;
					.fa-check{
						color: var(--orange);
					}
					.fa-xmark{
						color: var(--grey);
					}
				}
			}
			.fullWidthForm{
				position: relative;
				textarea{
					display: block;
					width: 100%;
					height: 80px;
					padding: 7px;
					color: #333;
					border: 1px solid #ccc;
					border-radius: 5px;
					font-family: var(--lora);
					resize: vertical;
					& ~ .check{
						position: absolute;
						top: 5px;
						right: 10px;
						.fa-check{
							color: var(--orange);
						}
						.fa-xmark{
							color: var(--grey);
						}
					}
				}
			}
			button{
				display: block;
				width: 100%;
				padding: 10px;
				font-family: var(--lora);
				font-size: 16px;
				font-weight: 700;
				text-align: center;
				text-transform: uppercase;
				background-color: var(--orange);
				color: white;
				border: none;
				border-radius: 5px;
				&:disabled{
					background-color: var(--grey);
					color: rgba(255,255,255,0.4);
					cursor: not-allowed;
				}
			}
		}
		.thanks{
			width: 100%;
			margin: 30px 0 0 0;
			text-align: center;
			h4{
				font-family: var(--greatVibes);
				font-size: 40px;
				margin: 10px 0 20px 0;
				color: var(--orange);
			}
			p{
				text-align: center;
				line-height: 1.3em;
			}
		}
	}
	@media only screen and (min-width:768px){
		.formContainer{
			form{
				.leftForm, .rightForm{
					margin: 20px 0 10px 0;
				}
				.leftForm, .rightForm{
					display: inline-block;
					padding: 0 10px;
					width: 50%;
					flex: 1 1 auto;
				}
				.fullWidthForm{
					padding: 0 10px;
					width: 100%;
					margin: 0 0 20px 0;
					flex: 1 1 auto;
					textarea{
						& ~ .check{
							right: 20px;
						}
					}
				}
			}
		}
	}
	@media only screen and (min-width:1024px){
		html.no-touchevents &{
			p{
				a{
					transition: 0.35s padding ease, 0.35s background ease;
					&:hover{
						padding: 5px 15px;
						background-color: var(--orangeHover);
					}
				}
			}
			.formContainer{
				form{
					button{
						transition: 0.35s background ease;
						&:hover{
							background-color: var(--orangeHover);
						}
						&:disabled:hover{
							background-color: var(--grey);
						}
					}
				}
			}
		}
	}
`;

// Export
export default Contact;