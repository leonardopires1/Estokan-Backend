import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ativar validação global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove propriedades não definidas no DTO
    forbidNonWhitelisted: true, // Lança erro se propriedades extras forem enviadas
    transform: true, // Transforma automaticamente os tipos (string para number, etc.)
    transformOptions: {
      enableImplicitConversion: true, // Converte tipos automaticamente
    },
  }));

  const config = new DocumentBuilder()
    .setTitle('Estokan API')
    .setDescription('API para gerenciamento de informações do App Estokan.')
    .setVersion('1.0')
    .addTag('auth', 'Endpoints de autenticação')
    .addTag('users', 'Gerenciamento de usuários')
    .addTag('functionaries', 'Gerenciamento de funcionários')
    .addTag('works', 'Gerenciamento de obras')
    .addTag('products', 'Gerenciamento de produtos')
    .addTag('inventory', 'Controle de estoque')
    .addBearerAuth() // Para autenticação JWT
    .setContact('Equipe Estokan', 'https://estokan.com', 'contato@estokan.com')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addServer('http://localhost:3000', 'Servidor de desenvolvimento')
    .addServer('https://api.estokan.com', 'Servidor de produção')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
