import { createContext, useReducer } from 'react';
import { globalReducer, initialState } from './reducer';

export const RootContext = createContext();

export default function GlobalProvider(Children) {
  return function ParentComp(props) {
    const [state, dispatch] = useReducer(globalReducer, initialState);
    return (
      <>
        <RootContext.Provider value={{
          state, dispatch,
        }}
        >
          <Children {...props} />
        </RootContext.Provider>
      </>
    );
  };
}
