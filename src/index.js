// import React from 'react';
// import ReactDOM from 'react-dom';
// import { VehicleList } from './components/VehicleList/VehicleList';
// import './global-styles.scss';

// ReactDOM.render(
//   <React.StrictMode>
//     <VehicleList />
//   </React.StrictMode>,
//   document.querySelector('.root')
// );

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { VehicleList } from './components/VehicleList/VehicleList';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <VehicleList />
  </Provider>,
  document.getElementById('root')
);