import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // เปิด CORS ถ้าต้องการ
  app.enableCors();

  await app.listen(process.env.PORT || 3001);
  console.log('🚀 Server running on http://localhost:3001');
}
void bootstrap();
