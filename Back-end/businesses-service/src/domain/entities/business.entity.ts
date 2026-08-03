import { Exclude } from 'class-transformer';

export class User {
  public readonly id: string;
  public readonly name: string;
  public readonly slug: string;
  public readonly created_at: Date;
  public is_active: boolean;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  get isActive(): boolean {
    return this.is_active;
  }

  changeStatus(status: boolean): void {
    if (this.is_active === status) {
      throw new Error(`User is already ${status ? 'active' : 'inactive'}`);
    }
    this.is_active = status;
  }
}