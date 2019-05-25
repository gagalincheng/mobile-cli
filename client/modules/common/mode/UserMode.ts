import {ActionModeBase} from '@/common/mode/ActionModeBase';
import types from '../constants/actionTypes';
import callAPI from '@/common/helpers/callAPI';
import { fromJS } from 'immutable';

export default class UserMode extends ActionModeBase {

  getUserInfo = () => {
    return callAPI(types.GET_USER_INFO).then(resp => {
      this.dispatch({
        type: types.GET_USER_INFO,
        data: resp
      })
      return resp;
    }, err => {
      throw err;
    });
  }
}

const initialState = fromJS({
  userinfo: {}
});

export function UserReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_USER_INFO:
      return state.merge({ userinfo: action.data })
    default:
      return state;
  }
}
