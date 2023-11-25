import { createSlice } from '@core/store/store';
import log from '../ModuleLogger';
const UM0202Context = 'UM0202Context';
const tag = UM0202Context;
const UM0202ActionList = Object.freeze({
  UpdateContext: UM0202Context + '/update',
  ResetContext: UM0202Context + '/reset',
});

const UM0202InitalState = {};

const UM0202Actions = {};

UM0202Actions[UM0202ActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, 'A00_UPDATE_CONTEXT', payload);
  if (UM0202Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, UM0202Context: payload.data };
};

UM0202Actions[UM0202ActionList.ResetContext] = (state, payload) => {
  log.trace(tag, 'A00_RESET_CONTEXT');
  if (UM0202Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...UM0202InitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, UM0202Context, UM0202Actions, {
    ...UM0202InitalState,
    ...data,
  });
};
export { createContext, UM0202Context, UM0202Actions, UM0202ActionList };
