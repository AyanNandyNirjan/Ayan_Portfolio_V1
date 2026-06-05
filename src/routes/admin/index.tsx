import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Bell,
  Loader2,
  LogOut,
  Mail,
  MessageSquareText,
  ShieldCheck,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Panel — Ayan Nandy Portfolio" },
      {
        name: "description",
        content: "Admin dashboard for managing portfolio messages.",
      },
    ],
  }),
  component: AdminDashboardPage,
});

type AdminUser = {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

type ContactMessage = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "archived";
  createdAt: string;
  updatedAt: string;
};

type MessagesApiResponse = {
  success: boolean;
  message?: string;
  count?: number;
  data: ContactMessage[];
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function AdminDashboardPage() {
  const navigate = useNavigate();
  const notificationRef = useRef<HTMLDivElement | null>(null);

  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [messageLoading, setMessageLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [totalMessages, setTotalMessages] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [latestUnreadMessages, setLatestUnreadMessages] = useState<
    ContactMessage[]
  >([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleUnauthorized = async () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    await navigate({ to: "/admin/login" });
  };

  const fetchMessageNotifications = async (token: string) => {
    try {
      setMessageLoading(true);

      const response = await fetch("/api/admin/contact-messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result: MessagesApiResponse = await response.json();

      if (response.status === 401 || response.status === 403) {
        await handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(result?.message || "Failed to fetch message data.");
      }

      const messages = result.data || [];
      const unread = messages.filter((message) => message.status === "unread");

      setTotalMessages(messages.length);
      setUnreadMessages(unread.length);
      setLatestUnreadMessages(unread.slice(0, 5));
    } catch {
      setTotalMessages(0);
      setUnreadMessages(0);
      setLatestUnreadMessages([]);
    } finally {
      setMessageLoading(false);
    }
  };

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        if (!token) {
          await navigate({ to: "/admin/login" });
          return;
        }

        const response = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminUser");
          await navigate({ to: "/admin/login" });
          return;
        }

        setAdmin(result.data);
        await fetchMessageNotifications(token);
      } catch {
        setErrorMessage("Failed to verify admin session.");
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    await navigate({ to: "/admin/login" });
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="text-sm">Checking admin access...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                Admin Panel
              </p>

              <h1 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
                Welcome, {admin?.name || "Admin"}
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                {admin?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div ref={notificationRef} className="relative">
              <button
                onClick={() => setShowNotifications((prev) => !prev)}
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background text-foreground transition-colors hover:border-primary/60 hover:text-primary"
                aria-label="Notifications"
              >
                {messageLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Bell className="h-5 w-5" />
                )}

                {unreadMessages > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold leading-none text-primary-foreground">
                    {unreadMessages > 99 ? "99+" : unreadMessages}
                  </span>
                )}
              </button>

              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute right-0 top-14 z-50 w-[320px] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:w-[380px]"
                >
                  <div className="flex items-center justify-between border-b border-border px-4 py-4">
                    <div>
                      <h2 className="font-bold text-foreground">
                        Notifications
                      </h2>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {unreadMessages > 0
                          ? `${unreadMessages} unread contact message${
                              unreadMessages > 1 ? "s" : ""
                            }`
                          : "No unread messages"}
                      </p>
                    </div>

                    <button
                      onClick={() => setShowNotifications(false)}
                      className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="max-h-[320px] overflow-y-auto">
                    {latestUnreadMessages.length === 0 ? (
                      <div className="px-4 py-8 text-center">
                        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background">
                          <Bell className="h-5 w-5 text-muted-foreground" />
                        </div>

                        <p className="font-semibold text-foreground">
                          No new messages
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          New contact messages will appear here.
                        </p>
                      </div>
                    ) : (
                      <div className="divide-y divide-border">
                        {latestUnreadMessages.map((message) => (
                          <Link
                            key={message._id}
                            to="/admin/messages"
                            onClick={() => setShowNotifications(false)}
                            className="block px-4 py-4 transition-colors hover:bg-primary/5"
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                                <Mail className="h-4 w-4 text-primary" />
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="truncate text-sm font-bold text-foreground">
                                    {message.name}
                                  </p>

                                  <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-primary-foreground">
                                    New
                                  </span>
                                </div>

                                <p className="mt-1 line-clamp-1 text-sm font-medium text-foreground">
                                  {message.subject}
                                </p>

                                <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                                  {message.message}
                                </p>

                                <p className="mt-2 text-[11px] text-muted-foreground">
                                  {formatDate(message.createdAt)}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-border p-3">
                    <Link
                      to="/admin/messages"
                      onClick={() => setShowNotifications(false)}
                      className="flex w-full items-center justify-center rounded-xl border border-primary/40 bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      View All Messages
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-red-500/50 hover:text-red-500"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </motion.header>

        {errorMessage && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <Link
            to="/admin/messages"
            className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/60 hover:bg-primary/5"
          >
            {unreadMessages > 0 && (
              <span className="absolute right-5 top-5 flex h-7 min-w-7 items-center justify-center rounded-full bg-primary px-2 text-xs font-bold text-primary-foreground">
                {unreadMessages > 99 ? "99+" : unreadMessages}
              </span>
            )}

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-primary">
              {messageLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <MessageSquareText className="h-6 w-6" />
              )}
            </div>

            <h2 className="text-lg font-bold text-foreground group-hover:text-primary">
              Contact Messages
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              View, read, archive, and delete messages sent from the contact
              form.
            </p>

           
          </Link>

          <Link
            to="/admin/users"
            className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/60 hover:bg-primary/5"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-primary">
              <Users className="h-6 w-6" />
            </div>

            <h2 className="text-lg font-bold text-foreground group-hover:text-primary">
              Users
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Manage admin and normal user accounts with full CRUD access.
            </p>
          </Link>

          <Link
            to="/admin/register"
            className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/60 hover:bg-primary/5"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-primary">
              <UserPlus className="h-6 w-6" />
            </div>

            <h2 className="text-lg font-bold text-foreground group-hover:text-primary">
              Add Admin
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Create another admin account using your existing admin session.
            </p>
          </Link>

          <Link
            to="/"
            className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/60 hover:bg-primary/5"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-primary">
              <Mail className="h-6 w-6" />
            </div>

            <h2 className="text-lg font-bold text-foreground group-hover:text-primary">
              Back to Website
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Return to the main portfolio website.
            </p>
          </Link>
        </motion.section>
      </div>
    </main>
  );
}