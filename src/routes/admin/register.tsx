import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldPlus,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/admin/register")({
  head: () => ({
    meta: [
      { title: "Admin Register — Ayan Nandy Portfolio" },
      {
        name: "description",
        content: "Admin registration page for portfolio admin panel.",
      },
    ],
  }),
  component: AdminRegisterPage,
});

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

type StatusMessage = {
  type: "success" | "error" | "";
  message: string;
};

const initialForm: RegisterForm = {
  name: "",
  email: "",
  password: "",
};

function AdminRegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<StatusMessage>({
    type: "",
    message: "",
  });

  useEffect(() => {
    if (!status.message || status.type !== "success") return;

    const timer = setTimeout(() => {
      setStatus({
        type: "",
        message: "",
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [status.message, status.type]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (status.message) {
      setStatus({
        type: "",
        message: "",
      });
    }
  };

  const validateForm = () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      setStatus({
        type: "error",
        message: "Name, email and password are required.",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return false;
    }

    if (formData.password.length < 6) {
      setStatus({
        type: "error",
        message: "Password must be at least 6 characters.",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      setStatus({
        type: "",
        message: "",
      });

      const existingToken = localStorage.getItem("adminToken");

      const response = await fetch("/api/auth/admin-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(existingToken
            ? {
                Authorization: `Bearer ${existingToken}`,
              }
            : {}),
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Admin registration failed.");
      }

      localStorage.setItem("adminToken", result.token);
      localStorage.setItem("adminUser", JSON.stringify(result.data));

      setFormData(initialForm);
      setStatus({
        type: "success",
        message: result?.message || "Admin registered successfully.",
      });

      setTimeout(() => {
        navigate({ to: "/admin" });
      }, 900);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="bento-card bento-card-glow relative w-full max-w-md p-6 sm:p-8"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card">
            <ShieldPlus className="h-7 w-7 text-primary" />
          </div>

          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            Create Admin
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Register Admin
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            First admin can register directly. After that, only logged-in admin
            can create another admin.
          </p>
        </div>

        {status.message && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-5 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
              status.type === "success"
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-red-500/40 bg-red-500/10 text-red-500"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            ) : (
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            )}
            <span>{status.message}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              name="name"
              type="text"
              placeholder="Admin name"
              maxLength={100}
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-xl border border-border bg-background/60 py-4 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary/60 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              name="email"
              type="email"
              placeholder="Admin email"
              maxLength={255}
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-xl border border-border bg-background/60 py-4 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary/60 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              minLength={6}
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-xl border border-border bg-background/60 py-4 pl-11 pr-12 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary/60 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={loading}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary py-4 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating admin...
              </>
            ) : (
              <>
                <ShieldPlus className="h-4 w-4" />
                Register Admin
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have admin access?{" "}
            <Link
              to="/admin/login"
              className="font-semibold text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-primary"
          >
            Back to home
          </Link>
        </div>
      </motion.section>
    </main>
  );
}