export class Business {
  public readonly id: string;
  public readonly business_id: string;
  public readonly category_id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly price: number;
  public readonly stock: number;
  public readonly attributes: Record<string, any>;
  public readonly created_at: Date;

  constructor(partial: Partial<Business>) {
    Object.assign(this, partial);
  }

}