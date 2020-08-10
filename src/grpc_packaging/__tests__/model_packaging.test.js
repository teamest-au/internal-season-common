const GrpcTypes = require('../../../grpc-types/season_pb');
const ModelPackaging = require('../model_packaging');

describe('model packaging', () => {
  describe('team', () => {
    it('must correctly package and unpackage team model', async () => {
      const teamModel = {
        name: 'Test',
        isExternal: true,
      };

      const packaged = ModelPackaging.packageTeam(teamModel);

      expect(packaged).toBeInstanceOf(GrpcTypes.Team);

      const actual = ModelPackaging.unpackageTeam(packaged);

      expect(actual).toEqual(teamModel);
    });
  });
  describe('eventType', () => {
    it('must correctly package and unpackage event type', async () => {
      const eventType = 'duty';

      const packaged = ModelPackaging.packageEventType(eventType);

      expect(typeof packaged).toBe('number');

      const actual = ModelPackaging.unpackageEventType(packaged);

      expect(actual).toEqual(eventType);
    });
  });
  describe('event', () => {
    describe('match', () => {
      it('must correctly package and unpackage match event model', async () => {
        const matchModel = {
          type: 'match',
          time: new Date('2020-01-01'),
          timezone: 'Australia/Adelaide',
          duration: 45,
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
        };

        const packaged = ModelPackaging.packageEvent(matchModel);

        expect(packaged).toBeInstanceOf(GrpcTypes.EventWrapper);

        const actual = ModelPackaging.unpackageEvent(packaged);

        expect(actual).toEqual(matchModel);
      });
      it('must correctly package and unpackage match event model with optional fields not set', async () => {
        const matchModel = {
          type: 'duty',
          time: new Date('2020-01-01'),
          home: {
            name: 'Home Team',
            isExternal: false,
          },
          away: {
            name: 'Away Team',
            isExternal: false,
          },
        };

        const packaged = ModelPackaging.packageEvent(matchModel);

        expect(packaged).toBeInstanceOf(GrpcTypes.EventWrapper);

        const actual = ModelPackaging.unpackageEvent(packaged);

        expect(actual).toEqual(matchModel);
      });
    });
    describe('duty', () => {
      it('must correctly package and unpackage duty event model', async () => {
        const dutyModel = {
          type: 'duty',
          time: new Date('2020-01-01'),
          timezone: 'Australia/Adelaide',
          duration: 35,
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
        };

        const packaged = ModelPackaging.packageEvent(dutyModel);

        expect(packaged).toBeInstanceOf(GrpcTypes.EventWrapper);

        const actual = ModelPackaging.unpackageEvent(packaged);

        expect(actual).toEqual(dutyModel);
      });
      it('must correctly package and unpackage duty event model with optional fields not set', async () => {
        const dutyModel = {
          type: 'duty',
          time: new Date('2020-01-01'),
          duty: {
            name: 'Duty Team',
            isExternal: false,
          },
        };

        const packaged = ModelPackaging.packageEvent(dutyModel);

        expect(packaged).toBeInstanceOf(GrpcTypes.EventWrapper);

        const actual = ModelPackaging.unpackageEvent(packaged);

        expect(actual).toEqual(dutyModel);
      });
    });
  });
  describe('team season', () => {
    it('it must correct package and unpackage a team season', async () => {
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

      const packaged = ModelPackaging.packageTeamSeason(teamSeasonModel);

      expect(packaged).toBeInstanceOf(GrpcTypes.TeamSeason);

      const actual = ModelPackaging.unpackageTeamSeason(packaged);

      expect(actual).toEqual(teamSeasonModel);
    });
  });
  describe('team season', () => {
    it('it must correct package and unpackage a saved team season', async () => {
      const savedTeamSeasonModel = {
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

      const packaged = ModelPackaging.packageSavedTeamSeason(savedTeamSeasonModel);

      expect(packaged).toBeInstanceOf(GrpcTypes.SavedTeamSeason);

      const actual = ModelPackaging.unpackageSavedTeamSeason(packaged);

      expect(actual).toEqual(savedTeamSeasonModel);
    });
  });
});
