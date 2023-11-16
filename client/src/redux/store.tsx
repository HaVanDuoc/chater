import { applyMiddleware, createStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import rootSaga from "./rootSaga"
import { useDispatch } from "react-redux"
import { persistStore } from "redux-persist"
import { persistedReducer } from "./persist/root"

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// mount it on the Store
export const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware))

// Create persisted store
export const persistor = persistStore(store)

// then run the saga
sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
