import {IAppState} from "../state/app.state";
import {createSelector} from "@ngrx/store";
import {IUserState} from "../state/user.state";

const selectUsers = (state: IAppState) => state.user;

export const selectUserSearchData = createSelector(
  selectUsers,
  (state: IUserState) => state.userSearchData
);

export const selectPickedUser = createSelector(
  selectUsers,
  (state: IUserState) => state.pickedUser
);

export const selectIndexOfPickedUser = createSelector(
  selectUsers,
  (state: IUserState) => state.indexOfPickedUser
);

export const selectUserError = createSelector(
  selectUsers,
  (state: IUserState) => state.error
);
