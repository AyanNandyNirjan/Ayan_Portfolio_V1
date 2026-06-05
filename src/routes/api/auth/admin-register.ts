import { createFileRoute } from "@tanstack/react-router";
import { registerAdmin } from "../../../controllers/auth.controller";

export const Route = createFileRoute("/api/auth/admin-register")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        return registerAdmin(request);
      },
    },
  },
});