import { Module } from '@nestjs/common';
import { CoachController } from './coach.controller';
import { CoachService } from './coach.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coach } from './coach.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coach])],
  controllers: [CoachController],
  providers: [CoachService],
  exports: [CoachService],
})
export class CoachModule {}
