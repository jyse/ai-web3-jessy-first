import { configureStore } from "@reduxjs/toolkit";
import imagesReducer from "./reducers/images";
import { userApi } from "./reducers/exampleApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    images: imagesReducer,
  },
});

setupListeners(store.dispatch);
