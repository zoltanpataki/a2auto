import {initialUserState, IUserState} from "../state/user.state";
import {EUserActions, UserActions} from "../actions/user.actions";

export const userReducers = (
  state = initialUserState,
  action: UserActions
): IUserState => {
  switch (action.type) {
    case EUserActions.GetUsersSuccess: {
      return {
        ...state,
        userSearchData: action.payload,
        error: null
      };
    }
    case EUserActions.GetUsersError: {
      return {
        ...state,
        userSearchData: null,
        error: action.payload
      };
    }
    case EUserActions.StorePickedUser: {
      return {
        ...state,
        pickedUser: action.payload,
        error: null
      };
    }
    case EUserActions.StorePickedUserIndex: {
      return {
        ...state,
        indexOfPickedUser: action.payload,
        error: null
      };
    }
    default : {
      return state;
    }
  }
}