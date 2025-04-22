declare namespace React {
  type ReactNode = React.ReactElement | string | number | boolean | null | undefined;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}