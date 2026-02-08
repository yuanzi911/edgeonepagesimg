// Cloudflare Workers 图床主入口
import { Router } from './router';
import { handleUpload } from './handlers/upload';
import { handleList } from './handlers/list';
import { handleDelete } from './handlers/delete';
import { handleImage } from './handlers/image';
import { handleStatic } from './handlers/static';

export default {
  async fetch(request, env, ctx) {
    const router = new Router();
    
    // API 路由
    router.post('/upload', handleUpload);
    router.get('/list', handleList);
    router.post('/delete', handleDelete);
    router.get('/image/:filename', handleImage);
    
    // 静态页面
    router.get('/', handleStatic);
    router.get('/test', () => {
      return new Response(JSON.stringify({
        success: true,
        hasKV: !!env.IMAGES,
        kvKeys: env.IMAGES ? Object.keys(env.IMAGES) : null
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    });
    
    return router.handle(request, env, ctx);
  }
};
