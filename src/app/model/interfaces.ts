export type numberOrString = number | string;
export type uniqueAndNamed = Unique & Named;

export interface Unique {
  id: numberOrString;
}

export interface Named {
  name: string;
}
