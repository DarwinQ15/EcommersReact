import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchuse: (state, action) =>{
            return action.payload
        }

    }
})

export const getPurchasesThunk = ()=> (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', getConfig())
    .then((res)=> dispatch(setPurchuse(res.data.data.purchases)))
    .finally(()=> dispatch(setIsLoading(false)))
    .catch((error)=> console.log(error.response))
}

export const { setPurchuse } = purchasesSlice.actions;

export default purchasesSlice.reducer;
