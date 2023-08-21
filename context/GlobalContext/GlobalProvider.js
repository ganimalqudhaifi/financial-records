import { useMemo, useReducer } from 'react';
import { globalReducer, globalInitialState } from './GlobalReducer';
import GlobalContext from './GlobalContext';

export default function GlobalContextProvider(props) {
  const [state, dispatch] = useReducer(globalReducer, globalInitialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return (<GlobalContext.Provider value={value} {...props} />);
}
