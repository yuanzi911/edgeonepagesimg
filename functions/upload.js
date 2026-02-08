export async function onRequestPost(context) {
  try {
    const { request } = context;
    
    // EdgeOne Pages: IMAGES 是全局变量，直接使用
    // 变量名对应控制台绑定的变量名称
    
    // 获取上传的文件
    const formData = await request.formData();
    const file = formData.get('image');
    
    if (!file) {
      return new Response(JSON.stringify({ error: '请上传图片文件' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 验证文件类型
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      return new Response(JSON.stringify({ error: '仅支持 JPG、PNG、GIF、WebP 格式' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 验证文件大小（25MB限制）
    const maxSize = 25 * 1024 * 1024;
    if (file.size > maxSize) {
      return new Response(JSON.stringify({ error: '文件大小不能超过 25MB' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 生成简洁文件名：8位随机字符 + 扩展名
    const random = Math.random().toString(36).substring(2, 10);
    const extension = file.name.split('.').pop().toLowerCase();
    const filename = `${random}.${extension}`;
    
    // 读取文件为 ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // 将 ArrayBuffer 转换为 Base64（兼容大文件）
    const bytes = new Uint8Array(arrayBuffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64Data = btoa(binary);
    
    // 打包数据和元数据（EdgeOne Pages KV 不支持单独的 metadata 参数）
    const storageData = {
      data: base64Data,
      metadata: {
        name: file.name,
        type: file.type,
        size: file.size,
        uploadTime: new Date().toISOString()
      }
    };
    
    // 存储到 KV（作为 JSON 字符串）
    try {
      await IMAGES.put(filename, JSON.stringify(storageData));
    } catch (kvError) {
      console.error('KV put error:', kvError);
      throw new Error('存储到 KV 失败: ' + kvError.message);
    }
    
    // 返回成功响应
    return new Response(JSON.stringify({
      success: true,
      filename: filename,
      url: `/i/${filename}`,
      originalName: file.name,
      size: file.size
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('上传错误:', error);
    return new Response(JSON.stringify({ error: '上传失败: ' + error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
