export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

export type ContactErrorCode =
  | "invalid_json"
  | "validation_error"
  | "rate_limited"
  | "delivery_failed"
  | "server_error";

export type ContactResponse =
  | { ok: true }
  | { ok: false; error: ContactErrorCode; message: string; fields?: FieldErrors };
