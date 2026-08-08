export class BusinessSettings {
  public readonly id: string;
  public readonly order_id: string;
  public readonly product_id: string;
  public readonly quantity: number;
  public readonly price_at_purchase: number;

  constructor(partial: Partial<BusinessSettings>) {
    Object.assign(this, partial);
  }
}