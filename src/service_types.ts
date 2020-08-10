import { TeamSeason, SavedTeamSeason } from '@teamest/models/processed';

export interface UpdateTeamSeasonRequest {
  teamSeason: TeamSeason;
}

export interface UpdateTeamSeasonResponse {
  competitionName: string;
  seasonName: string;
  teamName: string;
  teamSeasonId: string;
  wasModified: boolean;
}

export interface TeamSpecifier {
  competitionName: string;
  seasonName: string;
  teamName: string;
}

export interface GetSeasonsForTeamRequest {
  teamSpecifiers: TeamSpecifier[],
  updatedSince?: Date,
}

export interface GetSeasonsForTeamResponse {
  matchingTeamSeasons: SavedTeamSeason[];
}
