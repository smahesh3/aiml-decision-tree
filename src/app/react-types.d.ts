declare namespace React {
  interface ReactNode {
    children?: ReactNode | ReactNode[];
  }
  
  interface JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}