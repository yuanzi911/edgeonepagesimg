// 获取 KV 存储的辅助函数
export function getKV(env) {
  // 尝试多种方式获取 KV
  if (env && env.IMAGES) {
    return env.IMAGES;
  }
  
  // 尝试从全局变量获取（某些平台支持）
  if (typeof globalThis !== 'undefined' && globalThis.IMAGES) {
    return globalThis.IMAGES;
  }
  
  return null;
}
