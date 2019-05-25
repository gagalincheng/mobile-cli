export class ActionModeBase {
  /**
   * 这里的dispatch其实是可以从store中获取的，参考https://stackoverflow.com/questions/38532433/react-redux-global-function-that-can-dispatch-actions
   * 但是基于以下原因还是没有这么做：
   * action 同时被 app 和 teacher 调用，不知道用引用哪个 store
   * 如果引入 store，action 就和 store 耦合了
   */
  protected dispatch: any;
  constructor(props: any) {
    if (props && props.dispatch) {
      this.dispatch = props.dispatch;
    }else{
        throw new ReferenceError('dispatch can not be null');
    }
  }
}
