import { REQUEST_HEADERS_JSON } from '@greatmap/common-modules';

import type { Obj } from '@greatmap/common-modules';

import { GLOBAL_CONFIG } from '@/config';
import request from '@/utils/request';

export function getExampleList(params: Obj) {
  return request.get(`${GLOBAL_CONFIG.base}/list`, { params });
}

export function getExampleDetail(params: Obj) {
  return request.get(`${GLOBAL_CONFIG.base}/detail`, { params });
}

export function addExample(data: Obj) {
  return request.post(`${GLOBAL_CONFIG.base}/add`, data, {
    headers: REQUEST_HEADERS_JSON,
  });
}

export function updateExample(data: Obj) {
  return request.put(`${GLOBAL_CONFIG.base}/update`, data, {
    headers: REQUEST_HEADERS_JSON,
  });
}

export function deleteExample(id: string) {
  return request.delete(`${GLOBAL_CONFIG.base}/${id}`);
}
