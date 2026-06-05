import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/admin/users")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { requireAdmin } = await import(
          "../../../middleware/auth.middleware"
        );

        const { getAllUsers } = await import(
          "../../../controllers/user.controller"
        );

        requireAdmin(request);
        return getAllUsers();
      },

      POST: async ({ request }) => {
        const { requireAdmin } = await import(
          "../../../middleware/auth.middleware"
        );

        const { createUserByAdmin } = await import(
          "../../../controllers/user.controller"
        );

        requireAdmin(request);
        return createUserByAdmin(request);
      },
    },
  },
});