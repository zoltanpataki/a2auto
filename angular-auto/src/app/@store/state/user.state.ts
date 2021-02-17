import {IUser} from "../../@core/models/users";

export interface IUserState {
  userSearchData: IUser[];
  pickedUser: IUser;
  error: string;
}

export const initialUserState: IUserState = {
  userSearchData: null,
  pickedUser: null,
  error: null,
}
