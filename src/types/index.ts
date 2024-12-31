import { type UUIDTypes } from "uuid";

export type Allocation = {
  id: UUIDTypes;
  name: string;
  percentage: number;
};

export type Income = number;

export type AllocationChartConfig = {
  [key: string]: {
    label: string;
    color: string;
  };
};

export type AllocationDataPoint = {
  allocation: string;
  percentage: number;
  fill: string;
};
