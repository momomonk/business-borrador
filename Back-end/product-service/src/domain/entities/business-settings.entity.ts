export class BusinessSettings {
  public readonly id: string;
  public readonly businessId: string;
  public readonly name: string;
  public readonly parentId: string;
  public readonly createdAt: Date;

  constructor(partial: Partial<BusinessSettings>) {
    Object.assign(this, partial);
  }
}