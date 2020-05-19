import { observable, computed, action, toJS } from 'mobx';

class BirdStore {
  // object array map
  @observable birds;

  constructor() {
    this.birds = ['qiuzhi99'];
  }

  // 修改
  @action addBird = (bird) => {
    this.birds.unshift(bird);
  }

  // 只读
  @computed get firstBird() {
    return "第一只鸟的名字： " + toJS(this.birds)[0]
  }

  @computed get birdCount() {
    return toJS(this.birds).length;
  }
}

const store = new BirdStore();
//
//
// class Ticker {
//     @observable tick = 0
//
//     // 在函数定义的时候就绑定了正确的 this
//     @action.bound
//     increment() {
//         this.tick++ // 'this' 永远都是正确的
//     }
// }
//
// // window
// const ticker = window.ticker = new Ticker()
// setInterval(ticker.increment, 1000)
//
export default store;
//
// autorun(() => {
// })
