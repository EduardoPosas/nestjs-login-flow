import { Module } from "@nestjs/common";

/**Modules and services */
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "./common/common.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";

/**Services */
import { AppService } from "./app.service";

/**Controllers */
import { AppController } from "./app.controller";

/**Entities */
import { User } from "./users/entity/user.entity";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // import .env file and make it global
    // TypeOrm module with dynamic provider (factory provider)
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get<string>("DEV_DB_HOST"),
        port: configService.get<number>("DEV_DB_PORT"),
        username: configService.get<string>("DEV_DB_USERNAME"),
        password: configService.get<string>("DEV_DB_PASSWORD"),
        database: configService.get<string>("DEV_DB_NAME"),
        entities: [User], // indicate all entities
        synchronize: true,
      }),
      inject: [ConfigService], // array of providers
    }),
    CommonModule,
    AuthModule,
    UsersModule,
  ], // importing another module
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
