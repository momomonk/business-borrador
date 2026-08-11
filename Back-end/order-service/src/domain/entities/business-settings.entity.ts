export class BusinessSettings {
  public readonly id: string;
  public readonly orderId: string;
  public readonly productId: string;
  public readonly quantity: number;
  public readonly priceAtPurchase: number;

  constructor(partial: Partial<BusinessSettings>) {
    Object.assign(this, partial);
  }
}