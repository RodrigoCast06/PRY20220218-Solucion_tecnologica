import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamModule } from './team/team.module';
import { CoachModule } from './coach/coach.module';
import { PlayerModule } from './player/player.module';
import { ExerciseCalculationModule } from './exercise-calculation/exercise-calculation.module';
import { UserModule } from './user/user.module';
import { PlayerStatisticsModule } from './player-statistics/player-statistics.module';

@Module({
  imports: [
    TeamModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + './**/**/*entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
    }),
    CoachModule,
    PlayerModule,
    ExerciseCalculationModule,
    UserModule,
    PlayerStatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
