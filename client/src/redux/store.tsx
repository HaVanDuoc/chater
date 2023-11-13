import { applyMiddleware, createStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import rootReducer from "./rootReducer"
import rootSaga from "./rootSaga"
import { useDispatch } from "react-redux"

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// mount it on the Store
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

// then run the saga
sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
