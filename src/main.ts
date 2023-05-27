import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const PORT = process.env.PORT || 5000
console.log(process.env.MONGODB)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ["http://localhost:3000", "https://med-assistant-frontend-production.up.railway.app"],
    credentials: true,
    allowedHeaders:['content-type']
  });
  const config = new DocumentBuilder()
  .setTitle('Электронный помощник руководителя (Backend)')
  .setDescription('ОПИСАНИЕ')
  .setVersion('1.0')
  .addTag('')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, ()=>console.log(`Started at ${PORT}`))
}
bootstrap();
