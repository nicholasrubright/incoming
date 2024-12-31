import { type UUIDTypes } from "uuid";

export type Allocation = {
  id: UUIDTypes;
  name: string;
  percentage: number;
};

export type Income = number;
