import {ISalesman} from "../../@core/models/salesmen";

export interface ISalesmanState {
  salesmen: ISalesman[];
  error: string;
}

export const initialSalesmanState: ISalesmanState = {
  salesmen: null,
  error: null
}
