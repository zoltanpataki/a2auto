import {IErrorResponse} from "../../@core/models/errorResponse";

export interface IErrorState {
  error: IErrorResponse;
}

export const initialErrorState: IErrorState = {
  error: null
}
