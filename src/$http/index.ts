import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig } from 'axios';

export interface BkResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  msg: string;
  success: boolean;
}

export interface BkErrorResponse extends BkResponse {
  detail: string;
}

export interface HttpOption {
  noAlert?: true;
}

export class BkError extends Error {
  constructor(bkErrorResponse: BkErrorResponse) {
    super();
    super.name = 'BkError';
    super.message = bkErrorResponse.msg;
    super.cause = bkErrorResponse.detail;
  }
}

export class HttpTool {
  private static httpInstance = axios.create();

  static setBaseUrl(baseUrl: string) {
    this.httpInstance.defaults.baseURL = baseUrl;
  }

  static setAuthorization(Authorization: string) {
    this.httpInstance.defaults.headers.common['Authorization'] = Authorization;
  }

  static removeAuthorization() {
    this.httpInstance.defaults.headers.delete['Authorization'];
  }

  private static errHandler(err: AxiosError, httpOption?: HttpOption) {
    const statusCode = err.status;

    let errMsg = '未知错误';

    let bkError: BkError | undefined;

    if (err.response?.data) {
      const errResponse = err.response.data as BkErrorResponse;
      bkError = new BkError(errResponse);
      errMsg = errResponse.msg;
    }

    switch (statusCode) {
      default:
        break;
    }

    if (!httpOption?.noAlert) {
      alert(errMsg);
    }
    throw bkError;
  }

  static async send(
    config: AxiosRequestConfig,
    httpOption?: HttpOption
  ): Promise<BkResponse> {
    try {
      const axiosResponse = await this.httpInstance<BkResponse>(config);
      return axiosResponse.data as BkResponse;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw this.errHandler(err, httpOption);
      } else {
        throw err;
      }
    }
  }
}

HttpTool.setBaseUrl(import.meta.env['HTTP_BASEURL']);
