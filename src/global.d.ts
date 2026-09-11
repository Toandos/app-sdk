export {};

interface WebviewBridge {
    callHandler(name: string, ...args: any[])
}

declare global {
  interface Window {
    flutter_inappwebview?: WebviewBridge;
  }
}