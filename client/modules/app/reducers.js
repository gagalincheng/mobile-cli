import { combineReducers } from 'redux-immutable';
import { UserReducer } from '@/common/mode/UserMode';
import { WechatReducer } from './mode/WechatMode';

export default function createReducer(injectedReducers) {
  return combineReducers({
    wechat: WechatReducer,
    user: UserReducer,
    ...injectedReducers
  });
}
