import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { CoachModule } from 'src/coach/coach.module';
import { PlayerModule } from 'src/player/player.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team]),
    forwardRef(() => CoachModule),
    forwardRef(() => PlayerModule),
  ],
  providers: [TeamService],
  controllers: [TeamController],
})
export class TeamModule {}
