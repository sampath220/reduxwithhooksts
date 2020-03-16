import React from 'react';
import './App.css';
import store from './store/store';
import { Provider } from 'react-redux';
import Routes from './routes/Routes'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
