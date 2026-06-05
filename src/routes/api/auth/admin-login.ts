import { createFileRoute } from "@tanstack/react-router";
import { loginAdmin } from "../../../controllers/auth.controller";

export const Route = createFileRoute("/api/auth/admin-login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        return loginAdmin(request);
      },
    },
  },
});