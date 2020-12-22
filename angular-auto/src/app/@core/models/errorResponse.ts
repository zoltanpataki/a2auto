export class ErrorResponse {
  errorCode: string;
  errorMessage: string;


  constructor(errorCode: string, errorMessage: string) {
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }
}

export interface IErrorResponse {
  errorCode: string;
  errorMessage: string;
}
