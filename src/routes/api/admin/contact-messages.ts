import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/admin/contact-messages")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { requireAdmin } = await import(
          "../../../middleware/auth.middleware"
        );

        const { getAllContactMessages } = await import(
          "../../../controllers/contactMessage.controller"
        );

        requireAdmin(request);
        return getAllContactMessages();
      },
    },
  },
});