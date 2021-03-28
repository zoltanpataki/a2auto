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

  // null constants

  static readonly NULL_DOWN_PAYMENT: number = null;
  static readonly NULL_SALESMAN: string = null;
  static readonly NULL_NAME_OF_BUYER: string = null;
  static readonly NULL_INDIVIDUAL_OR_CORPORATE: string = null;
  static readonly NULL_SELECTED_BETWEEN_INDIVIDUAL_AND_CORPORATE_TRUE_IF_INDIVIDUAL_FALSE_IF_CORPORATE: boolean = null;
}
