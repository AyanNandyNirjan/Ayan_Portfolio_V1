import { createFileRoute } from "@tanstack/react-router";
import {
  deleteContactMessage,
  getSingleContactMessage,
  updateContactMessageStatus,
} from "../../../controllers/contactMessage.controller";
import { requireAdmin } from "../../../middleware/auth.middleware";

export const Route = createFileRoute("/api/admin/contact-messages/$messageId")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        requireAdmin(request);
        return getSingleContactMessage(params.messageId);
      },

      PATCH: async ({ request, params }) => {
        requireAdmin(request);
        return updateContactMessageStatus(params.messageId, request);
      },

      DELETE: async ({ request, params }) => {
        requireAdmin(request);
        return deleteContactMessage(params.messageId);
      },
    },
  },
});