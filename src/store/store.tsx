import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootreducer';
const initialState = {}
const middleware = [thunk];

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const enhancers = [];
const devToolsExtension = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
}

const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), ...enhancers));

export default store;