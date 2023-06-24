import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig } from 'axios';
export const httpInstance = axios.create();

export type BkResponse = {
  data: any; // 出错时这一项将没有
  code: number;
  msg: string;
  success: boolean;
};

httpInstance.defaults.baseURL = import.meta.env.HTTP_BASEURL;

export interface HttpOption {
  noAlert?: true;
}

export const $http = async (config: AxiosRequestConfig, httpOption: HttpOption) => {
  try {
    const axiosResponse = await httpInstance<BkResponse>(config);
    const bkResponse = axiosResponse.data;

    if (!bkResponse?.success) {
      let errTitle: string = 'Error';
      if (bkResponse.code === 401) {
        errTitle = 'Unauthorized';
      } else if (bkResponse.code === 403) {
        errTitle = 'Forbidden';
      } else if (bkResponse.code === 406) {
        errTitle = '406Error';
      } else if (bkResponse.code === 500) {
        errTitle = 'ServerError';
      } else {
        errTitle = 'Unknown';
      }
      if (!httpOption.noAlert) {
        alert(`${errTitle}: ${bkResponse.msg || 'unknown'}`);
      }
      const err = new Error(bkResponse?.msg || 'Unknown');
      err.name = errTitle;
      throw err;
    }
    return bkResponse;
  } catch (err) {
    if (err instanceof AxiosError) {
      alert('网络错误');
    }
    throw err;
  }
};
