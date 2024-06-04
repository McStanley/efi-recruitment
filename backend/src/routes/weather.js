import getWeather from '../controllers/weather.js';

import Router from 'koa-router';

const router = new Router();

router.get('/api/weather', getWeather);

export default router;
