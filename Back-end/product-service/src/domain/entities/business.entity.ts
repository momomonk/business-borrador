export class Business {
  public readonly id: string;
  public readonly businessId: string;
  public readonly categoryId: string;
  public readonly stock: number;
  public readonly attributes: Record<string, any>;
  public readonly createdAt: Date;
  public readonly name: string;
  public readonly description: string;
  public readonly price: number;

  constructor(partial: Partial<Business>) {
    Object.assign(this, partial);
  }

}