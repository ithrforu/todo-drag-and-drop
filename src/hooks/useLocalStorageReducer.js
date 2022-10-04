import { useReducer, useEffect } from 'react';

export const useLocalStorageReducer = (reducer, initialState, key) => {
  const getInitialState = (initialState) => {
    const storage = localStorage.getItem(key)

    if(storage) {
      return JSON.parse(storage);
    }

    return initialState;
  };

  const [state, dispatch] = useReducer(reducer, initialState, getInitialState);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  });

  return [state, dispatch];
}