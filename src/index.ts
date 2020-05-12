import { Action, Dispatch } from 'redux';

interface Promised {
  resolve?: Function;
  reject?: Function;
}

function createPromisedDispatchMiddleware() {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  return () => (next: Dispatch) => (action: Action): Promise<any> => {
    const promised: Promised = {};

    const promise = new Promise((resolve, reject) => {
      promised.resolve = resolve;
      promised.reject = reject;
    });
    Object.defineProperty(action, 'promised', {
      enumerable: false,
      writable: false,
      configurable: false,
      value: promised
    });
    next(action);
    return promise;
  };
}

const promisedDispatchMiddleware = createPromisedDispatchMiddleware();

export default promisedDispatchMiddleware;
