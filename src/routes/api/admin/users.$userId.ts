import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/admin/users/$userId")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const { requireAdmin } = await import(
          "../../../middleware/auth.middleware"
        );

        const { getSingleUser } = await import(
          "../../../controllers/user.controller"
        );

        requireAdmin(request);
        return getSingleUser(params.userId);
      },

      PATCH: async ({ request, params }) => {
        const { requireAdmin } = await import(
          "../../../middleware/auth.middleware"
        );

        const { updateUser } = await import(
          "../../../controllers/user.controller"
        );

        requireAdmin(request);
        return updateUser(params.userId, request);
      },

      DELETE: async ({ request, params }) => {
        const { requireAdmin } = await import(
          "../../../middleware/auth.middleware"
        );

        const { deleteUser } = await import(
          "../../../controllers/user.controller"
        );

        const admin = requireAdmin(request);
        return deleteUser(params.userId, admin.id);
      },
    },
  },
});