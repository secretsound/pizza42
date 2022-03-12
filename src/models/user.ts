export interface metadata {
  contact_methods: {
    email: boolean;
    sms: boolean;
  };
  food_prefs: {
    keto: boolean;
    vegan: boolean;
    vegetarian: boolean;
  };
  offers_signup: boolean;
  history: Array<object>;
}

export class MetaData implements metadata {
  public contact_methods = { email: false, sms: false };
  public food_prefs = { keto: false, vegan: false, vegetarian: false };
  public offers_signup = false;
  public history = [];

  constructor(data?: Partial<metadata>) {
    Object.assign(this, data);
  }
}
