export async function onRequestPost(context) {
  try {
    const { request } = context;
    
    // EdgeOne Pages: IMAGES 是全局变量，直接使用
    
    const { filename } = await request.json();
    
    if (!filename) {
      return new Response(JSON.stringify({ error: '文件名不能为空' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 删除图片
    await IMAGES.delete(filename);
    
    return new Response(JSON.stringify({
      success: true,
      message: '删除成功',
      filename: filename
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('删除错误:', error);
    return new Response(JSON.stringify({ error: '删除失败: ' + error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
