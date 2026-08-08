export class Business {
  public readonly id: string;
  public readonly business_id: string;
  public readonly customer_id: string;
  public readonly total_amount: number;
  public readonly status: boolean;
  public readonly created_at: Date;

  constructor(partial: Partial<Business>) {
    Object.assign(this, partial);
  }

}