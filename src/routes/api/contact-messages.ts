import { createFileRoute } from "@tanstack/react-router";
import { createContactMessage } from "../../controllers/contactMessage.controller";

export const Route = createFileRoute("/api/contact-messages")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        return createContactMessage(request);
      },
    },
  },
});