import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/admin/contact-messages/$messageId")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const { requireAdmin } = await import(
          "../../../middleware/auth.middleware"
        );

        const { getSingleContactMessage } = await import(
          "../../../controllers/contactMessage.controller"
        );

        requireAdmin(request);
        return getSingleContactMessage(params.messageId);
      },

      PATCH: async ({ request, params }) => {
        const { requireAdmin } = await import(
          "../../../middleware/auth.middleware"
        );

        const { updateContactMessageStatus } = await import(
          "../../../controllers/contactMessage.controller"
        );

        requireAdmin(request);
        return updateContactMessageStatus(params.messageId, request);
      },

      DELETE: async ({ request, params }) => {
        const { requireAdmin } = await import(
          "../../../middleware/auth.middleware"
        );

        const { deleteContactMessage } = await import(
          "../../../controllers/contactMessage.controller"
        );

        requireAdmin(request);
        return deleteContactMessage(params.messageId);
      },
    },
  },
});