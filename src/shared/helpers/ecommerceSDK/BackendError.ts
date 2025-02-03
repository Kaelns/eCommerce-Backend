import { APIErrorsCodes } from '@/services/ecommerce/v3/data/enums.js';

export class BackendError extends Error {
  public status: number;
  constructor(message: string, status = APIErrorsCodes.INTERNAL_SERVER_ERROR, name?: string) {
    super(message);
    this.name = name ?? 'BackendError';
    this.status = status;
  }
}
