export class Business {
  public readonly id: string;
  public readonly businessId: string;
  public readonly customerId: string;
  public readonly createdAt: Date;
  public readonly totalAmount: number;
  public readonly status: boolean;

  constructor(partial: Partial<Business>) {
    Object.assign(this, partial);
  }

}