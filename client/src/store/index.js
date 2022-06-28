import { configureStore } from '@reduxjs/toolkit';
import { adminApiSlice } from '../features/API/admin-api-slice';
import { userApiSlice } from '../features/API/user-api-slice';

export const store = configureStore({
  reducer: {
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [adminApiSlice.reducerPath]: adminApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      userApiSlice.middleware,
      adminApiSlice.middleware,
    ]);
  },
});
