import { configureStore } from '@reduxjs/toolkit'
import carProductsSlice  from './slices/carProducts.slice'
import isLoadingSlice from './slices/isLoading.slice'
import productsSlice from './slices/products.slice'
import purchuseSlice from './slices/purchases.slice'

export default configureStore({
    reducer: {
        isLoading: isLoadingSlice,
        products: productsSlice,
        purchases: purchuseSlice,
        car: carProductsSlice
    }
})
