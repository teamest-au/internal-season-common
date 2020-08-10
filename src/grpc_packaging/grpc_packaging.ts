import * as G from '../../grpc-types/season_pb';
import {
  UpdateTeamSeasonRequest,
  UpdateTeamSeasonResponse,
  TeamSpecifier,
  GetSeasonsForTeamRequest,
  GetSeasonsForTeamResponse,
} from '../service_types';
import {
  unpackageTeamSeason,
  packageTeamSeason,
  packageSavedTeamSeason,
  unpackageSavedTeamSeason,
} from './model_packaging';
import {
  unpackageTime,
  unpackageOptionalString,
  packageOptionalString,
  packageTime,
} from './packaging_helpers';

export function packageUpdateTeamSeasonRequest(
  rawUpdateTeamSeasonRequest: UpdateTeamSeasonRequest,
): G.UpdateTeamSeasonRequest {
  const updateTeamSeasonRequest = new G.UpdateTeamSeasonRequest();
  updateTeamSeasonRequest.setTeamSeason(
    packageTeamSeason(rawUpdateTeamSeasonRequest.teamSeason),
  );
  return updateTeamSeasonRequest;
}

export function unpackageUpdateTeamSeasonRequest(
  updateTeamSeasonRequest: G.UpdateTeamSeasonRequest,
): UpdateTeamSeasonRequest {
  const teamSeason = updateTeamSeasonRequest.getTeamSeason();
  if (!teamSeason) {
    throw new Error();
  }
  return {
    teamSeason: unpackageTeamSeason(teamSeason),
  };
}

export function packageUpdateTeamSeasonResponse(
  rawUpdateTeamSeasonResponse: UpdateTeamSeasonResponse,
): G.UpdateTeamSeasonResponse {
  const updateTeamSeasonResponse = new G.UpdateTeamSeasonResponse();
  updateTeamSeasonResponse.setCompetitionName(
    rawUpdateTeamSeasonResponse.competitionName,
  );
  updateTeamSeasonResponse.setSeasonName(rawUpdateTeamSeasonResponse.seasonName);
  updateTeamSeasonResponse.setTeamName(rawUpdateTeamSeasonResponse.teamName);
  updateTeamSeasonResponse.setTeamSeasonId(
    rawUpdateTeamSeasonResponse.teamSeasonId,
  );
  updateTeamSeasonResponse.setWasModified(rawUpdateTeamSeasonResponse.wasModified);
  return updateTeamSeasonResponse;
}

export function unpackageUpdateTeamSeasonResponse(
  updateTeamSeasonResponse: G.UpdateTeamSeasonResponse,
): UpdateTeamSeasonResponse {
  return {
    competitionName: updateTeamSeasonResponse.getCompetitionName(),
    seasonName: updateTeamSeasonResponse.getSeasonName(),
    teamName: updateTeamSeasonResponse.getTeamName(),
    teamSeasonId: updateTeamSeasonResponse.getTeamSeasonId(),
    wasModified: updateTeamSeasonResponse.getWasModified(),
  };
}

export function packageTeamSpecifier(
  rawTeamSpecifier: TeamSpecifier,
): G.TeamSpecifier {
  const teamSpecifier = new G.TeamSpecifier();
  teamSpecifier.setCompetitionName(rawTeamSpecifier.competitionName);
  teamSpecifier.setSeasonName(rawTeamSpecifier.seasonName);
  teamSpecifier.setTeamName(rawTeamSpecifier.teamName);
  return teamSpecifier;
}

export function unpackageTeamSpecifier(
  teamSpecifier: G.TeamSpecifier,
): TeamSpecifier {
  return {
    competitionName: teamSpecifier.getCompetitionName(),
    seasonName: teamSpecifier.getSeasonName(),
    teamName: teamSpecifier.getTeamName(),
  };
}

export function packageGetSeasonsForTeamRequest(
  rawGetSeasonsForTeamRequest: GetSeasonsForTeamRequest,
): G.GetSeasonsForTeamRequest {
  const getSeasonsForTeamRequest = new G.GetSeasonsForTeamRequest();
  getSeasonsForTeamRequest.setTeamSpecifiersList(
    rawGetSeasonsForTeamRequest.teamSpecifiers.map(packageTeamSpecifier),
  );
  if (rawGetSeasonsForTeamRequest.updatedSince) {
    getSeasonsForTeamRequest.setUpdatedSince(
      packageOptionalString(
        packageTime(rawGetSeasonsForTeamRequest.updatedSince),
      ),
    );
  }
  return getSeasonsForTeamRequest;
}

export function unpackageGetSeasonsForTeamRequest(
  getSeasonsForTeamRequest: G.GetSeasonsForTeamRequest,
): GetSeasonsForTeamRequest {
  const updatedSince = unpackageOptionalString(
    getSeasonsForTeamRequest.getUpdatedSince(),
  );
  return {
    teamSpecifiers: getSeasonsForTeamRequest
      .getTeamSpecifiersList()
      .map(unpackageTeamSpecifier),
    updatedSince: updatedSince ? unpackageTime(updatedSince) : undefined,
  };
}

export function packageGetSeasonsForTeamResponse(
  rawGetSeasonsForTeamResponse: GetSeasonsForTeamResponse,
): G.GetSeasonsForTeamResponse {
  const getSeasonsForTeamResponse = new G.GetSeasonsForTeamResponse();
  getSeasonsForTeamResponse.setMatchingTeamSeasonsList(
    rawGetSeasonsForTeamResponse.matchingTeamSeasons.map(packageSavedTeamSeason),
  );
  return getSeasonsForTeamResponse;
}

export function unpackageGetSeasonsForTeamResponse(
  getSeasonsForTeamResponse: G.GetSeasonsForTeamResponse,
): GetSeasonsForTeamResponse {
  return {
    matchingTeamSeasons: getSeasonsForTeamResponse
      .getMatchingTeamSeasonsList()
      .map(unpackageSavedTeamSeason),
  };
}
