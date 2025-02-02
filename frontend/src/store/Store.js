import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage for persistence
import userSlice from "../slices/UserSlice";
import wishlistReducer from "../slices/whishlistSlice";
import cartReducer from "../slices/cartSlice";
import { combineReducers } from "redux";

// Combine reducers
const rootReducer = combineReducers({
  user: userSlice,
  cart: cartReducer,
  wishlist: wishlistReducer,
});

// Configure persistence
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "wishlist", "user"], // Only persist these slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed for redux-persist
    }),
});

const persistor = persistStore(store);

export { store, persistor };
