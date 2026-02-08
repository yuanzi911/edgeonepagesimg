// 简单的 API Key 验证中间件
const API_KEY = 'your-secret-api-key-123456'; // 建议修改此密钥

export async function onRequest(context) {
  const { request, next } = context;
  
  // 只对 list 和 delete 接口进行验证
  const url = new URL(request.url);
  const path = url.pathname;
  
  if (path === '/list' || path === '/delete') {
    // 从请求头中获取 API Key
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || authHeader !== `Bearer ${API_KEY}`) {
      return new Response(JSON.stringify({ 
        error: '未授权访问，请提供正确的 API Key' 
      }), {
        status: 401,
        headers: { 
          'Content-Type': 'application/json',
          'WWW-Authenticate': 'Bearer'
        }
      });
    }
  }
  
  // 验证通过，继续执行
  return next();
}
