export interface ApiConfig {
  url: string;
  method: "GET" | "POST";
  headers?: Record<string, string>;
  queryParams?: Record<string, string>;
  body?: any;
}
