export async function onRequestGet(context) {
  try {
    const { params } = context;
    const filename = params.filename;
    
    if (!filename) {
      return new Response('图片不存在: 文件名为空', { status: 404 });
    }
    
    // 从 KV 获取数据（JSON 格式）
    const jsonData = await IMAGES.get(filename);
    
    if (!jsonData) {
      return new Response('图片不存在: ' + filename, { status: 404 });
    }
    
    // 解析 JSON 数据
    const storageData = JSON.parse(jsonData);
    const base64Data = storageData.data;
    const metadata = storageData.metadata || {};
    
    // 将 Base64 转换回 ArrayBuffer
    const binaryString = atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    // 返回图片
    return new Response(bytes.buffer, {
      headers: {
        'Content-Type': metadata.type || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    console.error('读取图片错误:', error);
    return new Response('服务器错误: ' + error.message, { status: 500 });
  }
}
