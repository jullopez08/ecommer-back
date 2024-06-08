import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';
import { FilesModule } from './files/files.module';
import typeOrmConfig from './config/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AppInitializerModule } from './initializers/appInitializer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),

    UsersModule,

    AppInitializerModule,
    AuthModule,
    OrdersModule,
    FilesModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
