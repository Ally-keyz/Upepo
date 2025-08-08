
import { configureStore } from "@reduxjs/toolkit";
// import thunk from 'redux-thunk';
import appReducer from "../appSlice/appSlices";


export const store = configureStore({
    reducer:appReducer
})

// const store = configureStore({
//     reducer: {
//         application: appReducer,
//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
// });

// export default store;