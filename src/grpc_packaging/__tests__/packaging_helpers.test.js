const google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb');

const PackagingHelpers = require('../packaging_helpers');

describe('packaging helpers', () => {
  describe('optional string', () => {
    it('must correctly package and unpackage optional string (with value)', async () => {
      const value = 'test';

      const packaged = PackagingHelpers.packageOptionalString(value);

      expect(packaged).toBeInstanceOf(google_protobuf_wrappers_pb.StringValue);

      const actual = PackagingHelpers.unpackageOptionalString(packaged);

      expect(actual).toEqual(value);
    });
    it('must correctly package and unpackage optional string (without value)', async () => {
      const value = undefined;

      const packaged = PackagingHelpers.packageOptionalString(value);

      expect(packaged).toBe(undefined);

      const actual = PackagingHelpers.unpackageOptionalString(packaged);

      expect(actual).toEqual(value);
    });
  });
  describe('optional int32', () => {
    it('must correctly package and unpackage optional int32 (with value)', async () => {
      const value = 25;

      const packaged = PackagingHelpers.packageOptionalInt32(value);

      expect(packaged).toBeInstanceOf(google_protobuf_wrappers_pb.Int32Value);

      const actual = PackagingHelpers.unpackageOptionalInt32(packaged);

      expect(actual).toEqual(value);
    });
    it('must correctly package and unpackage optional int32 (without value)', async () => {
      const value = undefined;

      const packaged = PackagingHelpers.packageOptionalInt32(value);

      expect(packaged).toBe(undefined);

      const actual = PackagingHelpers.unpackageOptionalInt32(packaged);

      expect(actual).toEqual(value);
    });
  });
  describe('time', () => {
    it('must correctly package and unpackage time', async () => {
      const time = new Date('2020-02-05T16:45:56');

      const packaged = PackagingHelpers.packageTime(time);

      expect(typeof packaged).toBe('string');

      const actual = PackagingHelpers.unpackageTime(packaged);

      expect(actual).toEqual(time);
    });
  });
});
