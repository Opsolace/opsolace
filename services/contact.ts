import { ContactPayload, ApiResponse } from "@/types/contact";
import { API_BASE_URL } from ".";

export async function sendContactEnquiry(payload: ContactPayload): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data: ApiResponse = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.error || "Failed to send message. Please try again.");
  }

  return data;
}