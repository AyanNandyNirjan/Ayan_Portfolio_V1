import { createFileRoute } from "@tanstack/react-router";
import {
  createUserByAdmin,
  getAllUsers,
} from "../../../controllers/user.controller";
import { requireAdmin } from "../../../middleware/auth.middleware";

export const Route = createFileRoute("/api/admin/users")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        requireAdmin(request);
        return getAllUsers();
      },

      POST: async ({ request }) => {
        requireAdmin(request);
        return createUserByAdmin(request);
      },
    },
  },
});