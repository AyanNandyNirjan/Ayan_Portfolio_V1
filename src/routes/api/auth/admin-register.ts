import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/auth/admin-register")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { registerAdmin } = await import(
          "../../../controllers/auth.controller"
        );

        return registerAdmin(request);
      },
    },
  },
});