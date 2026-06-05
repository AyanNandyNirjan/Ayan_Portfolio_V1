import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Edit3,
  Loader2,
  LogOut,
  Plus,
  RefreshCcw,
  Save,
  ShieldCheck,
  Trash2,
  UserCog,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [
      { title: "Users — Admin Panel" },
      {
        name: "description",
        content: "Admin user management page.",
      },
    ],
  }),
  component: AdminUsersPage,
});

type UserRole = "admin" | "user";

type AppUser = {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  count?: number;
  data: T;
};

type EditForm = {
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  password: string;
};

type CreateForm = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
};

const initialCreateForm: CreateForm = {
  name: "",
  email: "",
  password: "",
  role: "admin",
  isActive: true,
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function AdminUsersPage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<AppUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<AppUser | null>(null);

  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [createForm, setCreateForm] = useState<CreateForm>(initialCreateForm);

  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<EditForm>({
    name: "",
    email: "",
    role: "user",
    isActive: true,
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | UserRole>("all");

  const filteredUsers = useMemo(() => {
    if (activeFilter === "all") return users;
    return users.filter((user) => user.role === activeFilter);
  }, [activeFilter, users]);

  const adminCount = users.filter((user) => user.role === "admin").length;
  const normalUserCount = users.filter((user) => user.role === "user").length;
  const activeCount = users.filter((user) => user.isActive).length;

  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("adminToken");
  };

  const handleUnauthorized = async () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    await navigate({ to: "/admin/login" });
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const token = getToken();

      if (!token) {
        await handleUnauthorized();
        return;
      }

      const response = await fetch("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result: ApiResponse<AppUser[]> = await response.json();

      if (response.status === 401 || response.status === 403) {
        await handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(result?.message || "Failed to fetch users.");
      }

      setUsers(result.data || []);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while fetching users."
      );
    } finally {
      setLoading(false);
    }
  };

  const createUser = async () => {
    if (
      !createForm.name.trim() ||
      !createForm.email.trim() ||
      !createForm.password.trim()
    ) {
      setErrorMessage("Name, email and password are required.");
      return;
    }

    if (createForm.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      setActionLoading("create-user");
      setErrorMessage("");
      setSuccessMessage("");

      const token = getToken();

      if (!token) {
        await handleUnauthorized();
        return;
      }

      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: createForm.name.trim(),
          email: createForm.email.trim(),
          password: createForm.password,
          role: createForm.role,
          isActive: createForm.isActive,
        }),
      });

      const result: ApiResponse<AppUser> = await response.json();

      if (response.status === 401 || response.status === 403) {
        await handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(result?.message || "Failed to create user.");
      }

      setUsers((prev) => [result.data, ...prev]);
      setSelectedUser(result.data);
      setCreateForm(initialCreateForm);
      setShowCreatePanel(false);
      setSuccessMessage(result?.message || "User created successfully.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while creating user."
      );
    } finally {
      setActionLoading("");
    }
  };

  const openEdit = (user: AppUser) => {
    setSelectedUser(user);
    setEditMode(true);
    setShowCreatePanel(false);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      password: "",
    });
    setErrorMessage("");
    setSuccessMessage("");
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditForm({
      name: "",
      email: "",
      role: "user",
      isActive: true,
      password: "",
    });
  };

  const updateSelectedUser = async () => {
    if (!selectedUser) return;

    if (!editForm.name.trim() || !editForm.email.trim()) {
      setErrorMessage("Name and email are required.");
      return;
    }

    try {
      setActionLoading(`${selectedUser._id}-update`);
      setErrorMessage("");
      setSuccessMessage("");

      const token = getToken();

      if (!token) {
        await handleUnauthorized();
        return;
      }

      const payload: {
        name: string;
        email: string;
        role: UserRole;
        isActive: boolean;
        password?: string;
      } = {
        name: editForm.name.trim(),
        email: editForm.email.trim(),
        role: editForm.role,
        isActive: editForm.isActive,
      };

      if (editForm.password.trim()) {
        payload.password = editForm.password;
      }

      const response = await fetch(`/api/admin/users/${selectedUser._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result: ApiResponse<AppUser> = await response.json();

      if (response.status === 401 || response.status === 403) {
        await handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(result?.message || "Failed to update user.");
      }

      setUsers((prev) =>
        prev.map((user) => (user._id === selectedUser._id ? result.data : user))
      );

      setSelectedUser(result.data);
      setEditMode(false);
      setSuccessMessage(result?.message || "User updated successfully.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while updating user."
      );
    } finally {
      setActionLoading("");
    }
  };

  const deleteSelectedUser = async (userId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      setActionLoading(`${userId}-delete`);
      setErrorMessage("");
      setSuccessMessage("");

      const token = getToken();

      if (!token) {
        await handleUnauthorized();
        return;
      }

      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result: ApiResponse<null> = await response.json();

      if (response.status === 401 || response.status === 403) {
        await handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(result?.message || "Failed to delete user.");
      }

      setUsers((prev) => prev.filter((user) => user._id !== userId));

      setSelectedUser((prev) => {
        if (prev?._id === userId) return null;
        return prev;
      });

      setSuccessMessage(result?.message || "User deleted successfully.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while deleting user."
      );
    } finally {
      setActionLoading("");
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    await navigate({ to: "/admin/login" });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!successMessage) return;

    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background">
              <Users className="h-6 w-6 text-primary" />
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                Admin Users
              </p>

              <h1 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
                User Management
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Create admins, manage users, update roles, and control access.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to="/admin"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/60 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>

            <button
              onClick={() => {
                setShowCreatePanel((prev) => !prev);
                setEditMode(false);
                setSelectedUser(null);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {showCreatePanel ? (
                <X className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              {showCreatePanel ? "Close Form" : "Add Admin/User"}
            </button>

            <button
              onClick={fetchUsers}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/60 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCcw
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-red-500/50 hover:text-red-500"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </motion.header>

        {showCreatePanel && (
          <motion.section
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-2xl border border-border bg-card p-5 sm:p-6"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                  Create Account
                </p>
                <h2 className="mt-1 text-xl font-bold text-foreground">
                  Add New Admin/User
                </h2>
              </div>

              <button
                onClick={() => setShowCreatePanel(false)}
                className="rounded-xl border border-border bg-background p-3 text-muted-foreground transition-colors hover:border-red-500/50 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Full name"
                value={createForm.name}
                onChange={(e) =>
                  setCreateForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-border bg-background/60 px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary/60 focus:outline-none"
              />

              <input
                type="email"
                placeholder="Email address"
                value={createForm.email}
                onChange={(e) =>
                  setCreateForm((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-border bg-background/60 px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary/60 focus:outline-none"
              />

              <input
                type="password"
                placeholder="Password"
                value={createForm.password}
                onChange={(e) =>
                  setCreateForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-border bg-background/60 px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary/60 focus:outline-none"
              />

              <select
                value={createForm.role}
                onChange={(e) =>
                  setCreateForm((prev) => ({
                    ...prev,
                    role: e.target.value as UserRole,
                  }))
                }
                className="w-full rounded-xl border border-border bg-background/60 px-5 py-4 text-sm text-foreground transition-all focus:border-primary/60 focus:outline-none"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>

              <select
                value={createForm.isActive ? "active" : "inactive"}
                onChange={(e) =>
                  setCreateForm((prev) => ({
                    ...prev,
                    isActive: e.target.value === "active",
                  }))
                }
                className="w-full rounded-xl border border-border bg-background/60 px-5 py-4 text-sm text-foreground transition-all focus:border-primary/60 focus:outline-none md:col-span-2"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={createUser}
                disabled={actionLoading === "create-user"}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {actionLoading === "create-user" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                Create {createForm.role === "admin" ? "Admin" : "User"}
              </button>

              <button
                onClick={() => {
                  setCreateForm(initialCreateForm);
                  setShowCreatePanel(false);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-red-500/50 hover:text-red-500"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
            </div>
          </motion.section>
        )}

        <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button
            onClick={() => setActiveFilter("all")}
            className={`rounded-2xl border p-5 text-left transition-colors ${
              activeFilter === "all"
                ? "border-primary/60 bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <p className="text-sm text-muted-foreground">Total Users</p>
            <h2 className="mt-2 text-3xl font-bold text-foreground">
              {users.length}
            </h2>
          </button>

          <button
            onClick={() => setActiveFilter("admin")}
            className={`rounded-2xl border p-5 text-left transition-colors ${
              activeFilter === "admin"
                ? "border-primary/60 bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <p className="text-sm text-muted-foreground">Admins</p>
            <h2 className="mt-2 text-3xl font-bold text-primary">
              {adminCount}
            </h2>
          </button>

          <button
            onClick={() => setActiveFilter("user")}
            className={`rounded-2xl border p-5 text-left transition-colors ${
              activeFilter === "user"
                ? "border-primary/60 bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <p className="text-sm text-muted-foreground">Normal Users</p>
            <h2 className="mt-2 text-3xl font-bold text-green-500">
              {normalUserCount}
            </h2>
          </button>

          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Active Accounts</p>
            <h2 className="mt-2 text-3xl font-bold text-yellow-500">
              {activeCount}
            </h2>
          </div>
        </section>

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{errorMessage}</span>
          </motion.div>
        )}

        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex items-start gap-3 rounded-xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{successMessage}</span>
          </motion.div>
        )}

        {loading ? (
          <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-sm">Loading users...</span>
            </div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-border bg-card px-4 text-center">
            <UserCog className="mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="text-xl font-bold text-foreground">
              No users found
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              No user accounts found for this filter.
            </p>
          </div>
        ) : (
          <section className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  Users Table
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Showing {filteredUsers.length} user
                  {filteredUsers.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] text-left">
                <thead className="border-b border-border bg-background/60">
                  <tr>
                    <th className="px-5 py-4 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                      User
                    </th>
                    <th className="px-5 py-4 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                      Email
                    </th>
                    <th className="px-5 py-4 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                      Role
                    </th>
                    <th className="px-5 py-4 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                      Status
                    </th>
                    <th className="px-5 py-4 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                      Created
                    </th>
                    <th className="px-5 py-4 text-right text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="transition-colors hover:bg-primary/5"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background">
                            <ShieldCheck
                              className={`h-5 w-5 ${
                                user.role === "admin"
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </div>

                          <div>
                            <p className="font-semibold text-foreground">
                              {user.name}
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              ID: {user._id.slice(-8)}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="max-w-[260px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                            user.role === "admin"
                              ? "border-primary/40 bg-primary/10 text-primary"
                              : "border-green-500/40 bg-green-500/10 text-green-500"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                            user.isActive
                              ? "border-green-500/40 bg-green-500/10 text-green-500"
                              : "border-red-500/40 bg-red-500/10 text-red-500"
                          }`}
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-muted-foreground">
                        {formatDate(user.createdAt)}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEdit(user)}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary/60 hover:text-primary"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                            Edit
                          </button>

                          <button
                            onClick={() => deleteSelectedUser(user._id)}
                            disabled={actionLoading === `${user._id}-delete`}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-500 transition-colors hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {actionLoading === `${user._id}-delete` ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="h-3.5 w-3.5" />
                            )}
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {editMode && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 px-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="w-full max-w-2xl rounded-2xl border border-border bg-card p-5 shadow-2xl sm:p-6"
            >
              <div className="mb-6 flex items-start justify-between gap-4 border-b border-border pb-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                    Edit User
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-foreground">
                    {selectedUser.name}
                  </h2>
                  <p className="mt-1 break-all text-sm text-muted-foreground">
                    {selectedUser.email}
                  </p>
                </div>

                <button
                  onClick={cancelEdit}
                  className="rounded-xl border border-border bg-background p-3 text-muted-foreground transition-colors hover:border-red-500/50 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-border bg-background/60 px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary/60 focus:outline-none"
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-border bg-background/60 px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary/60 focus:outline-none"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <select
                    value={editForm.role}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        role: e.target.value as UserRole,
                      }))
                    }
                    className="w-full rounded-xl border border-border bg-background/60 px-5 py-4 text-sm text-foreground transition-all focus:border-primary/60 focus:outline-none"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>

                  <select
                    value={editForm.isActive ? "active" : "inactive"}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        isActive: e.target.value === "active",
                      }))
                    }
                    className="w-full rounded-xl border border-border bg-background/60 px-5 py-4 text-sm text-foreground transition-all focus:border-primary/60 focus:outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <input
                  type="password"
                  placeholder="New password optional"
                  value={editForm.password}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-border bg-background/60 px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary/60 focus:outline-none"
                />

                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={updateSelectedUser}
                    disabled={actionLoading === `${selectedUser._id}-update`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {actionLoading === `${selectedUser._id}-update` ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    Save Changes
                  </button>

                  <button
                    onClick={cancelEdit}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-red-500/50 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
}