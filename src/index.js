import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux'
import { Provider } from 'react-redux'
import WorkerContext from './contexts/mine.worker'
const minerWorker = new Worker('/blockchain/mine.worker.js')



ReactDOM.render(
  <React.StrictMode>
    <WorkerContext.Provider value={minerWorker}>
      <Provider store={store}>
        <App />
      </Provider>
    </WorkerContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
