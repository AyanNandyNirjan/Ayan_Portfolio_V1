import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/auth/admin-login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { loginAdmin } = await import(
          "../../../controllers/auth.controller"
        );

        return loginAdmin(request);
      },
    },
  },
});