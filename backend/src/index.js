import Koa from 'koa';
import cors from 'kcors';
import router from './routes/weather.js';

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
