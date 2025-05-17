"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', '..', 'frontend', 'dist'));
    app.use((req, res, next) => {
        const url = req.url;
        const isApi = url.startsWith('/api');
        const isAsset = url.match(/\.[a-z0-9]+$/);
        if (isApi || isAsset)
            return next();
        res.sendFile((0, path_1.join)(__dirname, '..', '..', 'frontend', 'dist', 'index.html'));
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map