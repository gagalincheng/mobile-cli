declare module '*.svg' {
  interface Svg {
    content: string;
    id: string;
    viewBox: string;
    node: any;
  }
  const svg: Svg;
  export default svg;
}

declare module '*.png' {
  const png: string;
  export default png;
}

// 这里用于扩充window对象上的值
declare interface Window {
  baseUrl?: string,
  authUrl?: string,
  defaultUrl?: string,
  fridayAppId?: string,
  capsuleUrl?: string,
  _report: {
    push: (eventId: string, data?: any) => void
  },
}
