"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const globalPrefix = 'api';
    const port = process.env.PORT || 3000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix(globalPrefix);
    const openApiDoc = swagger_1.SwaggerModule.createDocument(app, new swagger_1.DocumentBuilder()
        .setTitle('Glint')
        .setDescription('The Glint api documentation')
        .setExternalDoc('swagger.json', `http://localhost:${port}/${globalPrefix}/swagger.json`)
        .setVersion('1.0')
        .build());
    swagger_1.SwaggerModule.setup('api/swagger', app, openApiDoc, {
        jsonDocumentUrl: '/api/swagger.json',
    });
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
    common_1.Logger.log(`📑 Swagger is running on: http://localhost:${port}/${globalPrefix}/swagger`);
}
void bootstrap();
//# sourceMappingURL=main.js.map