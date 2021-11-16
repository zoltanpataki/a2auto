export abstract class Constants {
  // constants regarding order

  static readonly PREVIOUS: string = 'previous';
  static readonly NEW: string = 'new';
  static readonly INDIVIDUAL: string = 'individual';
  static readonly CORPORATE: string = 'corporate';
  static readonly WANT_CALCULATION: string = 'wantCalculation';
  static readonly DONT_WANT_CALCULATION: string = 'dontWantCalculation';
  static readonly CAR_REGISTRY: string = 'carRegistry';
  static readonly EXTRA_CHARGE_AT_SELLING: string = 'extraChargeAtSelling';
  static readonly COUNT_IN: string = 'countIn';
  static readonly NO_COUNT_IN: string = 'noCountIn';
  static readonly IT_IS_ADDING: boolean = true;
  static readonly IT_IS_NOT_ADDING: boolean = false;
  static readonly IT_IS_DESCRIPTION_DELETE: boolean = true;
  static readonly IT_IS_NOT_DESCRIPTION_DELETE: boolean = false;
  static readonly PAGE_LIMIT: number = 10;
  static readonly FIRST_PAGE_OFFSET: number = 0;

  // null constants

  static readonly NO_CAR_INDEX: number = -1;
  static readonly NULL_ERROR: string = null;
  static readonly NULL_DOWN_PAYMENT: number = null;
  static readonly NULL_EXTRA_PAYMENT: number = null;
  static readonly NULL_SALESMAN: string = null;
  static readonly NULL_NAME_OF_BUYER: string = null;
  static readonly NULL_INDIVIDUAL_OR_CORPORATE: string = null;
  static readonly NULL_SELECTED_BETWEEN_INDIVIDUAL_AND_CORPORATE_TRUE_IF_INDIVIDUAL_FALSE_IF_CORPORATE: boolean = null;
  static readonly NULL_CAR_HAND_OVER_DATE: Date = null;
  static readonly NULL_CAR_TYPE_OF_BUYING: string = null;
  static readonly NULL_CAR_SEARCH_TEXT: string = null;
  static readonly NULL_SELECTED_FILTER_TYPE: string = null;
  static readonly SELECTED_CARS_QUANTITY_NOT_KNOWN_YET: number = null;
  static readonly NULL_IS_SOLD: boolean = null;
  static readonly NULL_PAGE_NUMBER: number = null;
  static readonly NULL_ORDER_BY: string = null;
  static readonly NULL_ORDER_DIRECTION: string = null;
}
