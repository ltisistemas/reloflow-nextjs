import { ApiPayload } from "./domain/api-payload.model";
import { getToken } from "./global/user-logged-validate";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function api<T>(payload: ApiPayload): Promise<T> {
  if (!payload.method) payload.method = "GET";

  if (!payload.headers) payload.headers = { 'Content-Type': 'application/json'};
  
  const isSignIn = window.location.pathname === '/sign-in';
  if (!isSignIn) {
    const token = getToken();
    if (token) 
      payload.headers["Authorization"] = `Bearer ${token}`;
  }
    
  const url = `${API_URL}${payload.endpoint}`;

  const body = payload.body
    ? JSON.stringify(payload.body)
    : undefined;
  
  const response = await fetch(url, {
    method: payload.method,
    headers: { ...payload.headers },
    body,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}