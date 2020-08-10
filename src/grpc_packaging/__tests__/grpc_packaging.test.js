const GrpcPackaging = require('../grpc_packaging');
const GrpcTypes = require('../../../grpc-types/season_pb');

describe('grpc_packaging', () => {
  describe('UpdateTeamSeasonRequest', () => {
    it('it must correctly package and unpackage a team season request', async () => {
      const teamSeasonModel = {
        competitionName: 'Some competition',
        seasonName: 'A test season',
        teamName: 'A test team',
        lastScraped: new Date('2020-02-05T16:45:56'),
        events: [
          {
            type: 'match',
            time: new Date('2020-01-01'),
            court: 'Court 1',
            venue: 'Large Venue',
            home: {
              name: 'Home Team',
              isExternal: false,
            },
            away: {
              name: 'Away Team',
              isExternal: false,
            },
            duty: {
              name: 'Duty Team',
              isExternal: false,
            },
            round: 'Round 1',
          },
          {
            type: 'duty',
            time: new Date('2020-01-01'),
            court: 'Court 1',
            venue: 'Large Venue',
            home: {
              name: 'Home Team',
              isExternal: false,
            },
            away: {
              name: 'Away Team',
              isExternal: false,
            },
            duty: {
              name: 'Duty Team',
              isExternal: false,
            },
            round: 'Round 1',
          },
        ],
      };
      const updateTeamSeasonResponseModel = {
        teamSeason: teamSeasonModel,
      };

      const packaged = GrpcPackaging.packageUpdateTeamSeasonRequest(
        updateTeamSeasonResponseModel,
      );

      expect(packaged).toBeInstanceOf(GrpcTypes.UpdateTeamSeasonRequest);

      const actual = GrpcPackaging.unpackageUpdateTeamSeasonRequest(packaged);

      expect(actual).toEqual(updateTeamSeasonResponseModel);
    });
  });
  describe('UpdateTeamSeasonResponse', () => {
    it('it must correctly package and unpackage a team season Response', async () => {
      const updateTeamSeasonResponseModel = {
        competitionName: 'Some competition name',
        seasonName: 'A test season',
        teamName: 'A test team',
        teamSeasonId: 'uuid for new identified or created team season',
        wasModified: true,
      };

      const packaged = GrpcPackaging.packageUpdateTeamSeasonResponse(
        updateTeamSeasonResponseModel,
      );

      expect(packaged).toBeInstanceOf(GrpcTypes.UpdateTeamSeasonResponse);

      const actual = GrpcPackaging.unpackageUpdateTeamSeasonResponse(packaged);

      expect(actual).toEqual(updateTeamSeasonResponseModel);
    });
  });
  describe('TeamSpecifier', () => {
    it('it must correctly package and unpackage a team specifier', async () => {
      const teamSpecifierModel = {
        competitionName: 'Some competition name',
        seasonName: 'A test season',
        teamName: 'A test team',
      };

      const packaged = GrpcPackaging.packageTeamSpecifier(
        teamSpecifierModel,
      );

      expect(packaged).toBeInstanceOf(GrpcTypes.TeamSpecifier);

      const actual = GrpcPackaging.unpackageTeamSpecifier(packaged);

      expect(actual).toEqual(teamSpecifierModel);
    });
  });
  describe('GetSeasonsForTeamRequest', () => {
    it('it must correctly package and unpackage a get seasons for team request', async () => {
      const getSeasonsForTeamRequestModel = {
        teamSpecifiers: [],
        updatedSince: new Date('2020-01-01'),
      };

      const packaged = GrpcPackaging.packageGetSeasonsForTeamRequest(
        getSeasonsForTeamRequestModel,
      );

      expect(packaged).toBeInstanceOf(GrpcTypes.GetSeasonsForTeamRequest);

      const actual = GrpcPackaging.unpackageGetSeasonsForTeamRequest(packaged);

      expect(actual).toEqual(getSeasonsForTeamRequestModel);
    });
  });
  describe('GetSeasonsForTeamResponse', () => {
    it('it must correctly package and unpackage a get seasons for team Response', async () => {
      const teamSeasonModel = {
        competitionName: 'Some competition',
        seasonName: 'A test season',
        teamName: 'A test team',
        lastScraped: new Date('2020-02-05T16:45:56'),
        lastChanged: new Date('2020-02-05T16:45:56'),
        events: [
          {
            type: 'match',
            time: new Date('2020-01-01'),
            court: 'Court 1',
            venue: 'Large Venue',
            home: {
              name: 'Home Team',
              isExternal: false,
            },
            away: {
              name: 'Away Team',
              isExternal: false,
            },
            duty: {
              name: 'Duty Team',
              isExternal: false,
            },
            round: 'Round 1',
          },
          {
            type: 'duty',
            time: new Date('2020-01-01'),
            court: 'Court 1',
            venue: 'Large Venue',
            home: {
              name: 'Home Team',
              isExternal: false,
            },
            away: {
              name: 'Away Team',
              isExternal: false,
            },
            duty: {
              name: 'Duty Team',
              isExternal: false,
            },
            round: 'Round 1',
          },
        ],
      };
      const getSeasonsForTeamResponseModel = {
        matchingTeamSeasons: [
          teamSeasonModel
        ],
      };

      const packaged = GrpcPackaging.packageGetSeasonsForTeamResponse(
        getSeasonsForTeamResponseModel,
      );

      expect(packaged).toBeInstanceOf(GrpcTypes.GetSeasonsForTeamResponse);

      const actual = GrpcPackaging.unpackageGetSeasonsForTeamResponse(packaged);

      expect(actual).toEqual(getSeasonsForTeamResponseModel);
    });
  });
});
