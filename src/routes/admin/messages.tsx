import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Archive,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Loader2,
  LogOut,
  Mail,
  MailOpen,
  RefreshCcw,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/admin/messages")({
  head: () => ({
    meta: [
      { title: "Contact Messages — Admin Panel" },
      {
        name: "description",
        content: "Admin contact message management page.",
      },
    ],
  }),
  component: AdminMessagesPage,
});

type MessageStatus = "unread" | "read" | "archived";

type ContactMessage = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  count?: number;
  data: T;
};

const statusOptions: MessageStatus[] = ["unread", "read", "archived"];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function getStatusStyle(status: MessageStatus) {
  if (status === "unread") {
    return "border-primary/40 bg-primary/10 text-primary";
  }

  if (status === "read") {
    return "border-green-500/40 bg-green-500/10 text-green-500";
  }

  return "border-yellow-500/40 bg-yellow-500/10 text-yellow-500";
}

function AdminMessagesPage() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | MessageStatus>("all");

  const filteredMessages = useMemo(() => {
    if (activeFilter === "all") return messages;
    return messages.filter((message) => message.status === activeFilter);
  }, [activeFilter, messages]);

  const unreadCount = messages.filter(
    (message) => message.status === "unread"
  ).length;

  const readCount = messages.filter((message) => message.status === "read").length;

  const archivedCount = messages.filter(
    (message) => message.status === "archived"
  ).length;

  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("adminToken");
  };

  const handleUnauthorized = async () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    await navigate({ to: "/admin/login" });
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const token = getToken();

      if (!token) {
        await handleUnauthorized();
        return;
      }

      const response = await fetch("/api/admin/contact-messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result: ApiResponse<ContactMessage[]> = await response.json();

      if (response.status === 401 || response.status === 403) {
        await handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(result?.message || "Failed to fetch messages.");
      }

      setMessages(result.data || []);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while fetching messages."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (
    messageId: string,
    status: MessageStatus
  ) => {
    try {
      setActionLoading(`${messageId}-${status}`);
      setErrorMessage("");
      setSuccessMessage("");

      const token = getToken();

      if (!token) {
        await handleUnauthorized();
        return;
      }

      const response = await fetch(`/api/admin/contact-messages/${messageId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const result: ApiResponse<ContactMessage> = await response.json();

      if (response.status === 401 || response.status === 403) {
        await handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(result?.message || "Failed to update message status.");
      }

      setMessages((prev) =>
        prev.map((message) =>
          message._id === messageId ? result.data : message
        )
      );

      setSelectedMessage((prev) =>
        prev?._id === messageId ? result.data : prev
      );

      setSuccessMessage(result?.message || "Message status updated.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while updating status."
      );
    } finally {
      setActionLoading("");
    }
  };

  const deleteMessage = async (messageId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmDelete) return;

    try {
      setActionLoading(`${messageId}-delete`);
      setErrorMessage("");
      setSuccessMessage("");

      const token = getToken();

      if (!token) {
        await handleUnauthorized();
        return;
      }

      const response = await fetch(`/api/admin/contact-messages/${messageId}`, {
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
        throw new Error(result?.message || "Failed to delete message.");
      }

      setMessages((prev) => prev.filter((message) => message._id !== messageId));

      setSelectedMessage((prev) => {
        if (prev?._id === messageId) return null;
        return prev;
      });

      setSuccessMessage(result?.message || "Message deleted successfully.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while deleting message."
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
    fetchMessages();
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
              <Mail className="h-6 w-6 text-primary" />
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                Admin Messages
              </p>

              <h1 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
                Contact Messages
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Manage all messages sent from the contact form.
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
              onClick={fetchMessages}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/60 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
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

        <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button
            onClick={() => setActiveFilter("all")}
            className={`rounded-2xl border p-5 text-left transition-colors ${
              activeFilter === "all"
                ? "border-primary/60 bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <p className="text-sm text-muted-foreground">Total Messages</p>
            <h2 className="mt-2 text-3xl font-bold text-foreground">
              {messages.length}
            </h2>
          </button>

          <button
            onClick={() => setActiveFilter("unread")}
            className={`rounded-2xl border p-5 text-left transition-colors ${
              activeFilter === "unread"
                ? "border-primary/60 bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <p className="text-sm text-muted-foreground">Unread</p>
            <h2 className="mt-2 text-3xl font-bold text-primary">
              {unreadCount}
            </h2>
          </button>

          <button
            onClick={() => setActiveFilter("read")}
            className={`rounded-2xl border p-5 text-left transition-colors ${
              activeFilter === "read"
                ? "border-primary/60 bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <p className="text-sm text-muted-foreground">Read</p>
            <h2 className="mt-2 text-3xl font-bold text-green-500">
              {readCount}
            </h2>
          </button>

          <button
            onClick={() => setActiveFilter("archived")}
            className={`rounded-2xl border p-5 text-left transition-colors ${
              activeFilter === "archived"
                ? "border-primary/60 bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <p className="text-sm text-muted-foreground">Archived</p>
            <h2 className="mt-2 text-3xl font-bold text-yellow-500">
              {archivedCount}
            </h2>
          </button>
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
              <span className="text-sm">Loading contact messages...</span>
            </div>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-border bg-card px-4 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background">
              <Mail className="h-7 w-7 text-muted-foreground" />
            </div>

            <h2 className="text-xl font-bold text-foreground">
              No messages found
            </h2>

            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              There are no contact messages for this filter yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-12">
            <section className="lg:col-span-5 xl:col-span-4">
              <div className="space-y-3">
                {filteredMessages.map((message) => (
                  <button
                    key={message._id}
                    onClick={() => setSelectedMessage(message)}
                    className={`w-full rounded-2xl border p-4 text-left transition-all ${
                      selectedMessage?._id === message._id
                        ? "border-primary/60 bg-primary/10"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="line-clamp-1 font-bold text-foreground">
                          {message.name}
                        </h3>

                        <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                          {message.email}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${getStatusStyle(
                          message.status
                        )}`}
                      >
                        {message.status}
                      </span>
                    </div>

                    <p className="line-clamp-1 text-sm font-semibold text-foreground">
                      {message.subject}
                    </p>

                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {message.message}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {formatDate(message.createdAt)}
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="lg:col-span-7 xl:col-span-8">
              {selectedMessage ? (
                <motion.div
                  key={selectedMessage._id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="sticky top-6 rounded-2xl border border-border bg-card p-5 sm:p-6"
                >
                  <div className="mb-6 flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${getStatusStyle(
                          selectedMessage.status
                        )}`}
                      >
                        {selectedMessage.status}
                      </span>

                      <h2 className="mt-4 text-2xl font-bold text-foreground">
                        {selectedMessage.subject}
                      </h2>

                      <p className="mt-2 text-sm text-muted-foreground">
                        Sent on {formatDate(selectedMessage.createdAt)}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteMessage(selectedMessage._id)}
                      disabled={actionLoading === `${selectedMessage._id}-delete`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-500 transition-colors hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {actionLoading === `${selectedMessage._id}-delete` ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                      Delete
                    </button>
                  </div>

                  <div className="mb-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-border bg-background/60 p-4">
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                        Sender
                      </p>
                      <h3 className="mt-2 font-bold text-foreground">
                        {selectedMessage.name}
                      </h3>
                    </div>

                    <div className="rounded-xl border border-border bg-background/60 p-4">
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                        Email
                      </p>
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="mt-2 block break-all font-bold text-primary hover:underline"
                      >
                        {selectedMessage.email}
                      </a>
                    </div>
                  </div>

                  <div className="mb-6 rounded-xl border border-border bg-background/60 p-5">
                    <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                      Message
                    </p>

                    <p className="whitespace-pre-wrap text-sm leading-7 text-foreground">
                      {selectedMessage.message}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((status) => (
                      <button
                        key={status}
                        onClick={() =>
                          updateMessageStatus(selectedMessage._id, status)
                        }
                        disabled={
                          selectedMessage.status === status ||
                          actionLoading === `${selectedMessage._id}-${status}`
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/60 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {actionLoading === `${selectedMessage._id}-${status}` ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : status === "unread" ? (
                          <Mail className="h-4 w-4" />
                        ) : status === "read" ? (
                          <MailOpen className="h-4 w-4" />
                        ) : (
                          <Archive className="h-4 w-4" />
                        )}
                        Mark {status}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="flex min-h-[520px] flex-col items-center justify-center rounded-2xl border border-border bg-card px-4 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background">
                    <ShieldCheck className="h-7 w-7 text-primary" />
                  </div>

                  <h2 className="text-xl font-bold text-foreground">
                    Select a message
                  </h2>

                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                    Choose a message from the left side to view full details and
                    manage its status.
                  </p>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}