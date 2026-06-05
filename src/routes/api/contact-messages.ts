import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/contact-messages")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { createContactMessage } = await import(
          "../../controllers/contactMessage.controller"
        );

        return createContactMessage(request);
      },
    },
  },
});