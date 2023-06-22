import { Controller, Get } from '@nestjs/common';
import { BaseController } from 'src/base';
import { Player } from './player.entity';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController extends BaseController<Player> {
  constructor(private playerService: PlayerService) {
    super(playerService, true);
  }
}
