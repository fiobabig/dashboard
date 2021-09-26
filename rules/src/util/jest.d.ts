declare module jest {
  export interface Matchers<R, T = {}> {
    toAllow(): Promise<void>;
    toDeny(): Promise<void>;
  }
}
