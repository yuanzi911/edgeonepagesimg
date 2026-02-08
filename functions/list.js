export async function onRequestGet(context) {
  try {
    // EdgeOne Pages: IMAGES 是全局变量，直接使用
    
// 获取所有图片列表
    const list = await IMAGES.list();
    
    const images = [];
    
    for (const key of list.keys || []) {
      try {
        // EdgeOne Pages 使用 key.key 而不是 key.name
        const keyName = key.key || key.name;
        
        // 从 KV 获取数据（JSON 格式）
        const jsonData = await IMAGES.get(keyName);
        
        if (jsonData) {
          // 解析 JSON 数据
          const storageData = JSON.parse(jsonData);
          const metadata = storageData.metadata || {};
          
          images.push({
            filename: keyName,
            url: `/i/${keyName}`,
            metadata: metadata,
            uploadTime: metadata.uploadTime || null
          });
        } else {
          // 如果无法获取数据，只返回基本信息
          images.push({
            filename: keyName,
            url: `/i/${keyName}`,
            metadata: {},
            uploadTime: null
          });
        }
      } catch (e) {
        const keyName = key.key || key.name;
        console.error(`读取图片 ${keyName} 失败:`, e.message);
        images.push({
          filename: keyName,
          url: `/i/${keyName}`,
          metadata: {},
          uploadTime: null
        });
      }
    }
    
    // 按上传时间倒序排列
    images.sort((a, b) => {
      const timeA = a.uploadTime ? new Date(a.uploadTime).getTime() : 0;
      const timeB = b.uploadTime ? new Date(b.uploadTime).getTime() : 0;
      return timeB - timeA;
    });
    
    return new Response(JSON.stringify({
      success: true,
      count: images.length,
      images: images
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    console.error('获取列表错误:', error);
    return new Response(JSON.stringify({ error: '获取列表失败: ' + error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
