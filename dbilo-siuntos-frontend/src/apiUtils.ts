import { Method } from 'axios';

type QueryParam = string | undefined | number | null;
export type ApiQueryParams =
  | {
      [key: string]: QueryParam | QueryParam[];
    }
  | undefined;

export interface ApiRequestConfig<D = unknown> {
  url: string;
  method?: Method;
  params?: ApiQueryParams;
  data?: D;
  withCredentials?: boolean;
}
