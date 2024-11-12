export enum QueryKeys {
  OrdersList = 'OrdersList',
  OrderCreate = 'OrderCreate',
  ProductsList = 'ProductsList',
  ProductGetById = 'ProductGetById',
}

export interface MutationOptions<TData> {
  onSuccess?: (data: TData) => void;
  onError?: (message: string) => void;
  errorMessage?: string;
}