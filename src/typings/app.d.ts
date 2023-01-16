import { rules } from "../utils/constants";

declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export interface IInputs {
    name: string;
    type: string;
    text: string;
    rule?: rules;
    value?: string;
  }

  export type payloadData = Record<string, string | number>;
}

export {};
