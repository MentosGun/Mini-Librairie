export class Config {
  baseUrl: string;
  token: string|null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
}
