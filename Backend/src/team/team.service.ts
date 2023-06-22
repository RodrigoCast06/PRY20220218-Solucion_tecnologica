import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { CoachService } from 'src/coach/coach.service';
import { ObjectID } from 'mongodb';
import { PlayerService } from 'src/player/player.service';

@Injectable()
export class TeamService extends BaseService<Team> {
  constructor(
    @InjectRepository(Team)
    private teamService: Repository<Team>,
    private coachService: CoachService,
    private playerService: PlayerService,
  ) {
    super(teamService);
  }

  async findTeamDetail(teamId: string) {
    const team = await this.teamService.findOneBy({
      _id: new ObjectID(teamId),
    });

    const coach = await this.coachService.findOne(team?.coach);

    const players = await this.playerService.findBy({
      where: {
        team: team?._id.toString(),
      },
    });

    return { ...team, coach, players };
  }

  async deleteTeamAndPlayers(teamId: string) {
    const team = await this.teamService.findOneBy({
      _id: new ObjectID(teamId),
    });
    //Delete team
    await this.teamService.delete(teamId);
    //Delete players
    const players = await this.playerService.findBy({
      where: {
        team: teamId,
      },
    });
    for await (const player of players) {
      await this.playerService.deleteOne(player._id);
    }
    //Delete coach
    await this.coachService.deleteOne(team.coach);

    return true;
  }
}
