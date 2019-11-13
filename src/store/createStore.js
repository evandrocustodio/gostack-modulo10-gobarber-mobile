import {createStore, compose, applyMiddleware} from 'redux';

export default (reducers, meddlewares) => {
  const enhancer =
    __DEV__ === 'development'
      ? compose(
          console.tron.createEnhancer(),

          applyMiddleware(...meddlewares),
        )
      : applyMiddleware(...meddlewares);

  return createStore(reducers, enhancer);
};
