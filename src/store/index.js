import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
// NB. 'createStore' is deprecated but I wanted to avoid Redux Toolkit for now

/*
ERROR in ./node_modules/react-redux/dist/react-redux.mjs 1107:18-45
export 'useSyncExternalStore' (imported as 'React2') was not found in 'react' (possible exports

^ Solution to this is to update to React 18
(Not going to do that for now)
*/

import { request, isVehicleDataValid, mergeVehicleData } from '../api/helpers';

const initialState = {
  vehicles: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// actions
const FETCH_VEHICLES_START = 'FETCH_VEHICLES_START';
const FETCH_VEHICLES_SUCCESS = 'FETCH_VEHICLES_SUCCESS';
const FETCH_VEHICLES_FAILURE = 'FETCH_VEHICLES_FAILURE';

// reducer
const vehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VEHICLES_START:
      return { ...state, status: 'loading', error: null };
    case FETCH_VEHICLES_SUCCESS:
      return { ...state, status: 'succeeded', vehicles: action.payload };
    case FETCH_VEHICLES_FAILURE:
      return { ...state, status: 'failed', error: action.error };
    default:
      return state;
  }
}

// action creators
export const fetchVehiclesStart = () => ({ type: FETCH_VEHICLES_START });
export const fetchVehiclesSuccess = (vehicles) => ({ type: FETCH_VEHICLES_SUCCESS, payload: vehicles });
export const fetchVehiclesFailure = (error) => ({ type: FETCH_VEHICLES_FAILURE, error });

// Thunk Action for Async Logic
export const fetchVehicles = () => async (dispatch) => {
  dispatch(fetchVehiclesStart());

  try {
    const vehicles = await request('/api/vehicles.json');

    if (!Array.isArray(vehicles)) {
      throw new Error('Invalid data response, expected array');
    }

    const vehicleDetails = await Promise.all(
      vehicles.map(async (vehicle) => {
        if (!isVehicleDataValid(vehicle)) {
          return null;
        }
        try {
          const details = await request(vehicle.apiUrl);
          return mergeVehicleData(vehicle, details);
        } catch {
          return null;
        }
      })
    );

    dispatch(fetchVehiclesSuccess(vehicleDetails.filter(Boolean)));
  } catch (error) {
    dispatch(fetchVehiclesFailure(`Error fetching vehicle data: ${error.message}`));
  }
};

export const store = createStore(vehicleReducer, applyMiddleware(thunk));