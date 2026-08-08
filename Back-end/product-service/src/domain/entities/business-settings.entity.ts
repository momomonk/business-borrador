export class BusinessSettings {
  public readonly id: string;
  public readonly business_id: string;
  public readonly name: string;
  public readonly parent_id: string;
  public readonly created_at: Date;

  constructor(partial: Partial<BusinessSettings>) {
    Object.assign(this, partial);
  }
}