import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import uiSlice, { UIState } from '../redux/slices/ui.slice.ts';
import authSlice, { AuthState } from './slices/auth.slice.ts';
import projectSlice, { ProjectState } from './slices/projects.slice.ts';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth', 'project'],
};

const rootReducer = combineReducers({
  ui: uiSlice,
  project: projectSlice,
  auth: authSlice,
});

const persistedReducer = persistReducer<CombinedState>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type CombinedState = {
  ui: UIState;
  auth: AuthState;
  project: ProjectState;
};
