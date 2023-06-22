import { Controller, Get } from '@nestjs/common';
import { BaseController } from 'src/base';
import { Coach } from './coach.entity';
import { CoachService } from './coach.service';

@Controller('coach')
export class CoachController extends BaseController<Coach> {
  constructor(private coachService: CoachService) {
    super(coachService, true);
  }
}
