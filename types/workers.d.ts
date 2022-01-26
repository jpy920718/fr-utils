/// <reference lib="webworker" />
declare module 'web-worker:*' {
  const WorkerFactory: new () => Worker;
  export default WorkerFactory;
}
declare module 'shared-worker:*' {
  const WorkerFactory: new () => Worker;
  export default WorkerFactory;
}
declare function importScripts(...urls: string[]): void;

