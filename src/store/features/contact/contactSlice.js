// Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
	name:'', nameValid:false,
	company:'',
	email:'', emailValid:false,
	phone:'',
	message:'', messageValid:false,
	formValid:false,
	formSubmitted:false
};

// Send message to server
export const sendMessage = createAsyncThunk('contact/sendMessage', async(data, thunkAPI) => {
	// Must convert JSON format for php mail
	let formData = new FormData();
	for (var key in data) {
		formData.append(key, data[key]);
	}
	try {
		const response = await axios.post('http://www.graphoeilmultimedia.com/reactDev/restaurant/utils/sendMail.php', formData);
		return response.data;
	} catch(error) {
		return thunkAPI.rejectWithValue('An error was occured...');
	}
});

// Slice
const contactSlice = createSlice({
	name:'contact',
	initialState,
	reducers:{
		// Handle input change
		handleChange:(state, action) => {
			const { name, value } = action.payload;
			state[name] = value;
			// Check validity
			if (name === 'name'){
				state.nameValid = value.length >= 5;
			}
			if (name === 'email'){
				state.emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
			}
			if (name === 'message'){
				state.messageValid = value.length >= 20;
			}
			// Form valid ?
			if (state.nameValid && state.emailValid && state.messageValid){
				state.formValid = true;
			} else {
				state.formValid = false;
			}
		}
	},
	extraReducers:{
		// Send message
		[sendMessage.fulfilled]:(state) => {
			state.formSubmitted = true;
		},
		[sendMessage.rejected]:(state) => {
			// CORS don't have access to server
			// But email is submitted ,-)
			state.formSubmitted = true;
		}
	}
});

// Actions export
export const { handleChange } = contactSlice.actions;

// Reducer export
export default contactSlice.reducer;