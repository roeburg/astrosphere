import axios, { AxiosResponse } from "axios";

// The base URL is now hardcoded to your live Render backend.

//when to test locally 
//const base: string =
//"http://localhost:4000";

const base: string = "https://astrosphere-backend.onrender.com";

export const api = axios.create({ baseURL: base });

// --- Types ---
export interface OtpRequest {
  email: string;
}

export interface OtpVerify {
  email: string;
  otp: string;
}

export interface AdminLogin {
  email: string;
  password: string;
}

export interface NumerologyRequest {
  [key: string]: any; // adjust according to your backend schema
}

export interface KundliRequest {
  [key: string]: any; // adjust according to your backend schema
}

export interface AppointmentRequest {
  [key: string]: any; // adjust according to your backend schema
}

// --- Auth helpers ---
export async function requestOtp(email: string): Promise<AxiosResponse<any>> {
  return api.post("/api/auth/send-otp", { email });
}

export async function verifyOtp(email: string, otp: string): Promise<AxiosResponse<any>> {
  return api.post("/api/auth/verify-otp", { email, otp });
}

export async function adminLogin(email: string, password: string): Promise<AxiosResponse<any>> {
  // Use the 'api' axios instance to call the Express backend
  return api.post("/api/auth/admin-login", { email, password });
}

// --- Numerology ---
export async function fetchNumerology(
  data: NumerologyRequest
): Promise<AxiosResponse<any>> {
  return api.post("/api/numerology/calculate", data);
}

// --- Kundli ---
export async function fetchKundliPlanets(
  data: KundliRequest
): Promise<AxiosResponse<any>> {
  return api.post("/api/kundli/planets", data);
}

export async function fetchKundliDetails(
  data: KundliRequest
): Promise<AxiosResponse<any>> {
  return api.post("/api/kundli/astro-details", data);
}

export async function fetchKundliChart(
  chartId: string,
  data: KundliRequest
): Promise<AxiosResponse<any>> {
  return api.post(`/api/kundli/chart/${chartId}`, data);
}

// --- Appointments ---
export async function bookAppointment(
  data: AppointmentRequest
): Promise<AxiosResponse<any>> {
  return api.post("/api/appointments/book", data);
}

export async function getAllAppointments(): Promise<AxiosResponse<any>> {
  return api.get("/api/appointments");
}

/**
 * Fetch appointment status by user email
 */
export async function getAppointmentStatusByUser<T = any>(
  email: string
): Promise<AxiosResponse<T>> {
  return api.get(`/api/appointments/status`, {
    params: { email }, // attach email as query param
  });
}
