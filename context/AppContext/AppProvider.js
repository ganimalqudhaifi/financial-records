import { useMemo, useReducer } from 'react';
import { appInitialState, appReducer } from './AppReducer';
import AppContext from './AppContext';

export function AppProvider(props) {
  const [state, dispatch] = useReducer(appReducer, appInitialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return (<AppContext.Provider value={value} {...props} />);
}
