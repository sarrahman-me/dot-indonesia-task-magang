export interface responseType {
  data?: any;
  metadata?: {
    page: number;
    limit: number;
    total_data: number;
    total_pages: number;
  };
  error?: {
    code: number;
    message: string;
    detail?: string;
    field?: Record<string, string>;
    help?: string;
  };
}
