import { createFileRoute } from "@tanstack/react-router";
import { getMe } from "../../../controllers/auth.controller";

export const Route = createFileRoute("/api/auth/me")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return getMe(request);
      },
    },
  },
});