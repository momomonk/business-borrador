export class Business {
  public readonly id: string;
  public readonly name: string;
  public readonly slug: string;
  public readonly createdAt: Date;
  public isActive: boolean; 
  
  constructor(partial: Partial<Business>) {
    Object.assign(this, partial);
  }

  changeStatus(status: boolean): void {
    if (this.isActive === status) {
      throw new Error(`Business is already ${status ? 'active' : 'inactive'}`);
    }
    this.isActive = status;
  }
}