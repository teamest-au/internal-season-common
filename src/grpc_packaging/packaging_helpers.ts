import * as google_protobuf_wrappers_pb from 'google-protobuf/google/protobuf/wrappers_pb';

export function packageOptionalInt32(
  value?: number,
): google_protobuf_wrappers_pb.Int32Value | undefined {
  if (value) {
    const result = new google_protobuf_wrappers_pb.Int32Value();
    result.setValue(value);
    return result;
  }
  return undefined;
}

export function unpackageOptionalInt32(
  value: google_protobuf_wrappers_pb.Int32Value | undefined,
): number | undefined {
  if (value && value.getValue()) {
    return value.getValue();
  }
  return undefined;
}

export function packageOptionalString(
  value?: string,
): google_protobuf_wrappers_pb.StringValue | undefined {
  if (value) {
    const result = new google_protobuf_wrappers_pb.StringValue();
    result.setValue(value);
    return result;
  }
  return undefined;
}

export function unpackageOptionalString(
  value: google_protobuf_wrappers_pb.StringValue | undefined,
): string | undefined {
  if (value && value.getValue()) {
    return value.getValue();
  }
  return undefined;
}

export function packageTime(time: Date): string {
  return time.toISOString();
}

export function unpackageTime(time: string): Date {
  return new Date(time);
}