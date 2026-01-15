import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Spinner } from "../../components/ui/Spinner";
import { loginSchema } from "../../schema";
import { useAuthStore } from "../../stores/authStore";
import { useUIStore } from "../../stores/uiStore";
import { LogIn, Mail, Lock, ArrowRight } from "lucide-react";

export default function Login() {
  const login = useAuthStore((s) => s.login);
  const addToast = useUIStore((s) => s.addToast);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await login(data);
    } catch (err) {
      let errorMessage = "Login failed";

      if (err.response?.status === 422) {
        errorMessage = err.response?.data?.detail?.[0]?.msg;
      } else if (err.response?.data?.detail) {
        errorMessage = err.response.data.detail;
      }

      addToast({ message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-form border border-b-color rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-linear-to-br from-foreground via-accent-purple to-accent-blue p-8 text-white">
        <div className="flex items-center justify-center mb-3">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
            <LogIn className="size-10" strokeWidth={2} />
          </div>
        </div>
        <h2 className="text-center text-3xl font-bold">Welcome Back</h2>
        <p className="text-center text-white/90 mt-2 text-sm">
          Sign in to continue to your account
        </p>
      </div>

      {/* Form content */}
      <div className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute left-3 top-9.5 text-text-secondary">
                <Mail className="size-5" strokeWidth={2} />
              </div>
              <Input
                label="Email"
                {...register("email")}
                error={errors.email?.message}
                className="pl-11"
              />
            </div>

            <div className="relative">
              <div className="absolute left-3 top-9.5 text-text-secondary">
                <Lock className="size-5" strokeWidth={2} />
              </div>
              <Input
                label="Password"
                type="password"
                {...register("password")}
                error={errors.password?.message}
                className="pl-11"
              />
            </div>
          </div>

          <Button
            disabled={loading}
            className="w-full bg-linear-to-r from-foreground to-accent-purple hover:from-foreground-hover hover:to-accent-purple text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <>
                <Spinner />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight
                  className="size-5 group-hover:translate-x-1 transition-transform"
                  strokeWidth={2}
                />
              </>
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-b-color"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-form px-4 text-text-secondary">
              Don't have an account?
            </span>
          </div>
        </div>

        {/* Register link */}
        <Link
          to="/auth/register"
          className="block w-full text-center py-3 rounded-xl border-2 border-b-color hover:border-foreground text-primary hover:text-foreground font-medium transition-all duration-300 hover:shadow-md"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}
