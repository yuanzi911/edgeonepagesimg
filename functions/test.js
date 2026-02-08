// 测试函数 - 直接尝试使用 IMAGES
export async function onRequestGet(context) {
  try {
    // 尝试直接使用 IMAGES（全局变量）
    let result = {
      IMAGES_exists: typeof IMAGES !== 'undefined',
      IMAGES_type: typeof IMAGES
    };
    
    // 如果存在，尝试 list
    if (typeof IMAGES !== 'undefined' && IMAGES) {
      try {
        const list = await IMAGES.list();
        result.list_success = true;
        result.keys_count = list.keys ? list.keys.length : 0;
      } catch (e) {
        result.list_error = e.message;
      }
    }
    
    // 也检查 globalThis
    result.globalThis_IMAGES = typeof globalThis.IMAGES;
    result.globalThis_hasIMAGES = !!globalThis.IMAGES;
    
    return new Response(JSON.stringify(result, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 200,  // 即使是错误也返回 200，方便查看
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
