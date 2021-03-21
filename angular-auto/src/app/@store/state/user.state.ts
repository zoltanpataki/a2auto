import {IUser} from "../../@core/models/users";

export interface IUserState {
  userSearchData: IUser[];
  pickedUser: IUser;
  indexOfPickedUser: number;
  error: string;
}

export const initialUserState: IUserState = {
  userSearchData: null,
  pickedUser: null,
  indexOfPickedUser: null,
  error: null,
}
