import {ActionModeBase} from '@/common/mode/ActionModeBase';
import types from '../constants/actionTypes';
import callAPI from '@/common/helpers/callAPI';
import { fromJS } from 'immutable';

export default class WechatMode extends ActionModeBase {

  fuc = (params) => {
    return callAPI(types.XXXXX, params).then(resp => {
      // 将用户信息存储在user store里面
      this.dispatch({
        type: types.XXXXX,
        data: resp.user
      })
      return resp;
    }, err => {
      throw err;
    })
  }

  stopRedirecting = () => {
    this.dispatch({
      type: types.XXXXX
    })
  }
}

const initialState = fromJS({
 
});

export function WechatReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
