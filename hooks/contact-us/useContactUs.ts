import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import { useMutation } from "@tanstack/react-query";

interface ContactUsPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactUsResponse {
  success: boolean;
  error?: string;
}

async function contactUsByEmail(
  contactData: ContactUsPayload
): Promise<ContactUsResponse> {
  return await fetchWrapper({
    url: `contact-us`,
    method: "POST",
    body: contactData,
  });
}

export default function useContactUs() {
  return useMutation<ContactUsResponse, Error, ContactUsPayload>({
    mutationFn: (contactData) => contactUsByEmail(contactData),
  });
}
