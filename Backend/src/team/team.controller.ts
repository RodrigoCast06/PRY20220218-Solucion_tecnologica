import { Controller, Delete, Get, Param } from '@nestjs/common';
import { BaseController } from 'src/base';
import { Team } from './team.entity';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController extends BaseController<Team> {
  constructor(private teamService: TeamService) {
    super(teamService, true);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.teamService.findTeamDetail(id);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<any> {
    return await this.teamService.deleteTeamAndPlayers(id);
  }
}
