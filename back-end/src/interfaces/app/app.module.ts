/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import V1Module from '@v1/v1.module';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import AppController from './app.controller';
import AppService from './app.service';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get('POSTGRESQL_HOST') || 'postgres',
        port: cfg.get('POSTGRESQL_PORT') as unknown as number,
        database: cfg.get('POSTGRESQL_DB'),
        username: cfg.get('POSTGRESQL_ROOT_USER'),
        password: cfg.get('POSTGRESQL_PASSWORD'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync({
      useFactory: (cfg: ConfigService) => ({
        config: {
          url: cfg.get('REDIS_URL'),
        },
      }),
      inject: [ConfigService],
    }),
    V1Module,
    MorganModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: MorganInterceptor("tiny"),
  }],
})
export default class AppModule {}
