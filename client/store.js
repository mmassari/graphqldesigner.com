import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
//import rootReducer from './reducers'; // the value from combineReducers
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/index.js';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};
 
const pReducer = persistReducer(
  persistConfig, 
  reducers
);
 
export const store = createStore(
  pReducer,
  composeWithDevTools()
);
export const persistor = persistStore(store);

// we are adding composeWithDevTools here to get easy access to the Redux dev tools
// const store = createStore(
//   reducers,
//   composeWithDevTools(),
// );

// export default store;
