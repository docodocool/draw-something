import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { EventsModule } from './events/events.module';
import { PostModule } from './post/post.module';
import { ScheduleModule } from '@nestjs/schedule';
import { WowTokenModule } from './wow-token/wow-token.module';
import { TaskModule } from './tasks/tasks.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    CatsModule,
    EventsModule,
    // 这里的 { useCreateIndex: true } 是为了解决
    // https://mongoosejs.com/docs/deprecations.html#ensure Index()的报错
    MongooseModule.forRoot('mongodb://manager:main_db_manager@89.208.248.23:27017/main', { useCreateIndex: true }),
    PostModule,
    ScheduleModule.forRoot(),
    TaskModule,
    WowTokenModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ method: RequestMethod.GET, path: 'wow-token' });
  }
}
