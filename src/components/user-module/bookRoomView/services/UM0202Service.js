import { useRef } from 'react';
import { useDispatch, useStore } from '@core/store/store';
import {
  UM0202ActionList,
  UM0202Context,
  createContext,
} from '../contexts/UM0202Context';

function UM0202Service() {
  const context = useStore()[UM0202Context];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    createContext(dispatcher, data);
  };
  const updateContext = (data) => {
    dispatcher({
      slice: UM0202Context,
      type: UM0202ActionList.UpdateContext,
      data: data,
    });
  };
  const resetContext = () => {
    dispatcher({
      slice: UM0202Context,
      type: UM0202ActionList.ResetContext,
    });
  };
  const dispatchInterface = useRef({
    initContext,
    updateContext,
    resetContext,
  });

  return [context, dispatchInterface.current];
}

export default UM0202Service;
