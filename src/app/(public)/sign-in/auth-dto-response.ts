import { GlobalResponse } from "@/lib/domain/models/global-response.model";

export interface AuthDtoResponse {
  sub: string;
  email: string;
  name: string;
  lastLogin: string;
  access_token: string;
}
