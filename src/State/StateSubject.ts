import { IState } from './state';

export interface IObserver {
    update(state: IState): void
}


export interface ISubject {
  subscribe(observer: IObserver): void
  notifyAll(state: IState): void
}


export class StateSubject implements ISubject {
  private observers: IObserver[] = [];

  subscribe(observer: IObserver) {
    this.observers.push(observer);    
  }

  notifyAll(state: IState) {
    for (const observer of this.observers) {
      observer.update(state);
    }
  }
}
