import * as G from '../../grpc-types/season_pb';

import { Event, Team, Match, Duty } from '@teamest/models/raw';
import { EventType } from '@teamest/models/raw/event';
import { EventGuards } from '@teamest/models/helpers';
import { TeamSeason } from '@teamest/models/processed/team_season';

import * as PackagingHelpers from './packaging_helpers';
import { SavedTeamSeason } from '@teamest/models/processed';

export function packageTeam(team: Team | undefined): G.Team | undefined {
  if (team) {
    const result = new G.Team();
    result.setIsExternal(team.isExternal);
    result.setName(team.name);
    return result;
  }
  return undefined;
}

export function unpackageTeam(team: G.Team | undefined): Team | undefined {
  if (team) {
    return team.toObject();
  }
  return undefined;
}

export function packageEventType(type: EventType) {
  switch (type) {
    case 'duty':
      return G.EventType.DUTY;
    case 'match':
      return G.EventType.MATCH;
    case 'other':
    default:
      return G.EventType.OTHER;
  }
}

export function unpackageEventType(type: number): EventType {
  switch (type) {
    case G.EventType.DUTY:
      return 'duty';
    case G.EventType.MATCH:
      return 'match';
    case G.EventType.OTHER:
    default:
      return 'other';
  }
}

function packageMatchFields(rawMatch: Match): G.EventWrapper {
  const result = new G.EventWrapper();
  const match = new G.Match();
  match.setHome(packageTeam(rawMatch.home));
  match.setAway(packageTeam(rawMatch.away));
  if (rawMatch.duty) match.setDuty(packageTeam(rawMatch.duty));
  match.setRound(PackagingHelpers.packageOptionalString(rawMatch.round));
  result.setDuty(match);
  return result;
}

function unpackageMatchFields(event: G.EventWrapper) {
  const match = event.getMatch();
  if (match) {
    return {
      home: unpackageTeam(match.getHome()),
      away: unpackageTeam(match.getAway()),
      duty: unpackageTeam(match.getDuty()),
      round: PackagingHelpers.unpackageOptionalString(match.getRound()),
    };
  } else {
    return false;
  }
}

function packageDutyFields(rawDuty: Duty): G.EventWrapper {
  const result = new G.EventWrapper();
  const duty = new G.Duty();
  if (rawDuty.home) duty.setHome(packageTeam(rawDuty.home));
  if (rawDuty.away) duty.setAway(packageTeam(rawDuty.away));
  duty.setDuty(packageTeam(rawDuty.duty));
  if (rawDuty.round) duty.setRound(PackagingHelpers.packageOptionalString(rawDuty.round));
  result.setDuty(duty);
  return result;
}

function unpackageDutyFields(event: G.EventWrapper) {
  const duty = event.getDuty();
  if (duty) {
    return {
      home: unpackageTeam(duty.getHome()),
      away: unpackageTeam(duty.getAway()),
      duty: unpackageTeam(duty.getDuty()),
      round: PackagingHelpers.unpackageOptionalString(duty.getRound()),
    };
  } else {
    return false;
  }
}

export function packageEvent(event: Event): G.EventWrapper {
  let result;
  if (EventGuards.isDuty(event)) {
    result = packageDutyFields(event);
  } else if (EventGuards.isMatch(event)) {
    result = packageMatchFields(event);
  } else {
    throw new Error(`Recieved unknown event type ${event.type}`);
  }

  result.setType(packageEventType(event.type));
  result.setTime(PackagingHelpers.packageTime(event.time));
  result.setTimezone(PackagingHelpers.packageOptionalString(event.timezone));
  result.setDuration(PackagingHelpers.packageOptionalInt32(event.duration));
  result.setCourt(PackagingHelpers.packageOptionalString(event.court));
  result.setVenue(PackagingHelpers.packageOptionalString(event.venue));

  return result;
}

export function unpackageEvent(wrappedEvent: G.EventWrapper): Event {
  return {
    type: unpackageEventType(wrappedEvent.getType()),
    time: PackagingHelpers.unpackageTime(wrappedEvent.getTime()),
    timezone: PackagingHelpers.unpackageOptionalString(wrappedEvent.getTimezone()),
    duration: PackagingHelpers.unpackageOptionalInt32(wrappedEvent.getDuration()),
    court: PackagingHelpers.unpackageOptionalString(wrappedEvent.getCourt()),
    venue: PackagingHelpers.unpackageOptionalString(wrappedEvent.getVenue()),
    ...unpackageMatchFields(wrappedEvent),
    ...unpackageDutyFields(wrappedEvent),
  };
}

export function packageTeamSeason(rawTeamSeason: TeamSeason): G.TeamSeason {
  const teamSeason = new G.TeamSeason();
  teamSeason.setCompetitionName(rawTeamSeason.competitionName);
  teamSeason.setSeasonName(rawTeamSeason.seasonName);
  teamSeason.setTeamName(rawTeamSeason.teamName);
  teamSeason.setWrappedEventsList(rawTeamSeason.events.map(packageEvent));
  teamSeason.setLastScraped(PackagingHelpers.packageTime(rawTeamSeason.lastScraped));
  return teamSeason;
}

export function unpackageTeamSeason(teamSeason: G.TeamSeason): TeamSeason {
  return {
    competitionName: teamSeason.getCompetitionName(),
    seasonName: teamSeason.getSeasonName(),
    teamName: teamSeason.getTeamName(),
    events: teamSeason.getWrappedEventsList().map(unpackageEvent),
    lastScraped: PackagingHelpers.unpackageTime(teamSeason.getLastScraped()),
  };
}

export function packageSavedTeamSeason(rawTeamSeason: SavedTeamSeason): G.SavedTeamSeason {
  const teamSeason = new G.SavedTeamSeason();
  teamSeason.setCompetitionName(rawTeamSeason.competitionName);
  teamSeason.setSeasonName(rawTeamSeason.seasonName);
  teamSeason.setTeamName(rawTeamSeason.teamName);
  teamSeason.setWrappedEventsList(rawTeamSeason.events.map(packageEvent));
  teamSeason.setLastScraped(PackagingHelpers.packageTime(rawTeamSeason.lastScraped));
  teamSeason.setLastChanged(PackagingHelpers.packageTime(rawTeamSeason.lastChanged));
  return teamSeason;
}

export function unpackageSavedTeamSeason(teamSeason: G.SavedTeamSeason): SavedTeamSeason {
  return {
    competitionName: teamSeason.getCompetitionName(),
    seasonName: teamSeason.getSeasonName(),
    teamName: teamSeason.getTeamName(),
    events: teamSeason.getWrappedEventsList().map(unpackageEvent),
    lastScraped: PackagingHelpers.unpackageTime(teamSeason.getLastScraped()),
    lastChanged: PackagingHelpers.unpackageTime(teamSeason.getLastChanged()),
  };
}