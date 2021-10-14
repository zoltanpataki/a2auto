import {IAppState} from "../state/app.state";
import {createSelector} from "@ngrx/store";
import {IUtilState} from "../state/util.state";

const selectUsers = (state: IAppState) => state.util;

export const selectIsBlankPage = createSelector(
  selectUsers,
  (state: IUtilState) => state.isBlankPage
);

export const selectIsTrophyClicked = createSelector(
  selectUsers,
  (state: IUtilState) => state.isTrophyClicked
);
