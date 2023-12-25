// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** chatSingle POST /api/ */
export async function chatSingleUsingPost2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.chatSingleUsingPOST2Params,
  options?: { [key: string]: any },
) {
  return request<API.MonoPromptResponse_>('/api/', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** chatSingle POST /api/chat */
export async function chatSingleUsingPost1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.chatSingleUsingPOST1Params,
  options?: { [key: string]: any },
) {
  return request<API.MonoChatResponse_>('/api/chat', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** chatCont POST /api/chats */
export async function chatContUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.chatContUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.MonoChatResponse_>('/api/chats', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** chatImage POST /api/image */
export async function chatImageUsingPost(options?: { [key: string]: any }) {
  return request<API.MonoImageResponse_>('/api/image', {
    method: 'POST',
    ...(options || {}),
  });
}

/** chatSingle POST /api/prompt */
export async function chatSingleUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/api/prompt', {
    method: 'POST',
    ...(options || {}),
  });
}

/** chatSingleStream GET /api/stream/chat */
export async function chatSingleStreamUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.chatSingleStreamUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.FluxString_>('/api/stream/chat', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** chatContStream GET /api/stream/chats */
export async function chatContStreamUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.chatContStreamUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.FluxString_>('/api/stream/chats', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
