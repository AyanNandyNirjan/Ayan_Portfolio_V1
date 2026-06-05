import { createFileRoute } from "@tanstack/react-router";
import { getAllContactMessages } from "../../../controllers/contactMessage.controller";
import { requireAdmin } from "../../../middleware/auth.middleware";

export const Route = createFileRoute("/api/admin/contact-messages")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        requireAdmin(request);
        return getAllContactMessages();
      },
    },
  },
});