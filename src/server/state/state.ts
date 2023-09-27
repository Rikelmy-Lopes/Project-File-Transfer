
export interface IState {
  isServerOn: boolean;
  serverPort: number
}

export const state: IState = {
  isServerOn: false,
  serverPort: 1024,
};