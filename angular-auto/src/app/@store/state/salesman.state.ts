import {ISalesmen} from "../../@core/models/salesmen";

export interface ISalesmanState {
  salesmen: ISalesmen[];
  error: string;
}

export const initialSalesmanState: ISalesmanState = {
  salesmen: null,
  error: null
}
