import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const carProductsSlice = createSlice({
    name: 'car',
    initialState: [],
    reducers: {
        setCar: (state, action)=>{
            const car = action.payload
            console.log(car);
            return car;
        }

    }
})

export const getCarThunk = () => (dispatch) =>{
    dispatch(setIsLoading(true));
    axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
    .then((res)=> dispatch(setCar(res.data.data.cart.products)))
    .finally(()=> dispatch(setIsLoading(false)))
}

export const getProductThunk= (cart) => (dispatch) =>{
    dispatch(setIsLoading(true));
    axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', cart,  getConfig())
    .then((res) => dispatch(getCarThunk()))
    .catch((error)=> console.log(error.response))
    .finally(()=> dispatch(setIsLoading(false)));
}

export const purcharseCartThunk= () => (dispatch) =>{
    dispatch(setIsLoading(true));
    axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', {},  getConfig())
    .then(() => dispatch(setCar([])))
    .catch((error)=> console.log(error.response))
    .finally(()=> dispatch(setIsLoading(false)));
}
 
export const { setCar } = carProductsSlice.actions;

export default carProductsSlice.reducer;
