export class BusinessSettings {
  public readonly businessSettingsId: string;
  public readonly themeConfig: Record<string, any>;
  public readonly domainSettings: Record<string, any>;
  public readonly updatedAt: Date;

  constructor(partial: Partial<BusinessSettings>) {
    Object.assign(this, partial);
  }
}