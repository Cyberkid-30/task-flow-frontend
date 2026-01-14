import { Calendar, Mail, User } from "lucide-react";
import { useAuthStore } from "../stores/authStore";

export default function Account() {
  const user = useAuthStore((s) => s.user);

  return (
    <main className="flex-1 flex justify-center items-start p-10">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="bg-linear-to-br from-foreground via-accent-purple to-accent-blue p-8 rounded-t-3xl text-white shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
              <User className="size-10" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Account Details</h1>
              <p className="text-white/90 mt-1">
                View your account information
              </p>
            </div>
          </div>
        </div>

        {/* Account Information Card */}
        <div className="bg-form border border-b-color rounded-b-3xl shadow-2xl p-8">
          <div className="space-y-6">
            {/* Username */}
            <div className="bg-background-secondary/50 border border-b-color/50 rounded-xl p-5 hover:border-foreground/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="bg-foreground/10 p-3 rounded-lg">
                  <User className="size-6 text-foreground" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-text-secondary font-medium uppercase tracking-wide mb-1">
                    Username
                  </p>
                  <p className="text-primary text-lg font-semibold">
                    {user?.username || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-background-secondary/50 border border-b-color/50 rounded-xl p-5 hover:border-foreground/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="bg-foreground/10 p-3 rounded-lg">
                  <Mail className="size-6 text-foreground" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-text-secondary font-medium uppercase tracking-wide mb-1">
                    Email Address
                  </p>
                  <p className="text-primary text-lg font-semibold">
                    {user?.email || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Created */}
            {user?.created_at && (
              <div className="bg-background-secondary/50 border border-b-color/50 rounded-xl p-5 hover:border-foreground/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-foreground/10 p-3 rounded-lg">
                    <Calendar
                      className="size-6 text-foreground"
                      strokeWidth={2}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-text-secondary font-medium uppercase tracking-wide mb-1">
                      Member Since
                    </p>
                    <p className="text-primary text-lg font-semibold">
                      {new Date(user.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
