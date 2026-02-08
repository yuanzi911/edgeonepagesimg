// 调试用的 list API，返回原始数据结构
export async function onRequestGet(context) {
  try {
    const list = await IMAGES.list();
    
    // 获取第一个 key 的详细信息
    let debugInfo = {
      list_result: list,
      list_keys_type: typeof list.keys,
      list_keys_is_array: Array.isArray(list.keys),
      list_keys_length: list.keys ? list.keys.length : 0,
      first_key: null,
      getWithMetadata_result: null,
      get_result: null
    };
    
    if (list.keys && list.keys.length > 0) {
      const firstKey = list.keys[0];
      debugInfo.first_key = {
        type: typeof firstKey,
        keys: Object.keys(firstKey || {}),
        name: firstKey?.name,
        has_metadata: !!firstKey?.metadata,
        metadata: firstKey?.metadata
      };
      
      // 尝试 getWithMetadata
      try {
        const withMeta = await IMAGES.getWithMetadata(firstKey.name);
        debugInfo.getWithMetadata_result = {
          has_metadata: !!withMeta?.metadata,
          metadata: withMeta?.metadata,
          has_value: !!withMeta?.value
        };
      } catch (e) {
        debugInfo.getWithMetadata_error = e.message;
      }
      
      // 尝试普通 get
      try {
        const value = await IMAGES.get(firstKey.name);
        debugInfo.get_result = {
          has_value: !!value,
          value_type: typeof value
        };
      } catch (e) {
        debugInfo.get_error = e.message;
      }
    }
    
    return new Response(JSON.stringify(debugInfo, null, 2), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message,
      stack: error.stack
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
