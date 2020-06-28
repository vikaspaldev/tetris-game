/* eslint-disable no-console */

export const reducerWithLogger = reducer => {
  return (prevState, action) => {
    const nextState = reducer(prevState, action);

    if (process.env.NODE_ENV === "development") {
      console.groupCollapsed(`action: ${action.type}`);
      console.log(`prev state`, prevState);
      console.log(`action`, action);
      console.log(`next state`, nextState);
      console.groupEnd();
    }

    return nextState;
  };
};
