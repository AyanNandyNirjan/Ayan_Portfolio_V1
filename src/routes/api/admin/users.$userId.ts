import { createFileRoute } from "@tanstack/react-router";
import {
  deleteUser,
  getSingleUser,
  updateUser,
} from "../../../controllers/user.controller";
import { requireAdmin } from "../../../middleware/auth.middleware";

export const Route = createFileRoute("/api/admin/users/$userId")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        requireAdmin(request);
        return getSingleUser(params.userId);
      },

      PATCH: async ({ request, params }) => {
        requireAdmin(request);
        return updateUser(params.userId, request);
      },

      DELETE: async ({ request, params }) => {
        const admin = requireAdmin(request);
        return deleteUser(params.userId, admin.id);
      },
    },
  },
});