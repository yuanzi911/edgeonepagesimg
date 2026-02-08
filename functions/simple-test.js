// 最简单的 KV 测试
export async function onRequestGet(context) {
  try {
    // 测试 1：检查 IMAGES 是否存在
    const test1 = typeof IMAGES !== 'undefined';
    
    // 测试 2：尝试简单 put
    let test2 = null;
    try {
      await IMAGES.put('test-key', 'test-value');
      test2 = 'put success';
    } catch (e) {
      test2 = 'put error: ' + e.message;
    }
    
    // 测试 3：尝试 get
    let test3 = null;
    try {
      const value = await IMAGES.get('test-key');
      test3 = 'get success: ' + value;
    } catch (e) {
      test3 = 'get error: ' + e.message;
    }
    
    return new Response(JSON.stringify({
      test1_IMAGES_exists: test1,
      test2_put: test2,
      test3_get: test3
    }, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message,
      IMAGES_defined: typeof IMAGES !== 'undefined'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestPost(context) {
  try {
    // 尝试不带 metadata 的 put
    await IMAGES.put('post-test', 'post-value');
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error.message,
      IMAGES_defined: typeof IMAGES !== 'undefined'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
