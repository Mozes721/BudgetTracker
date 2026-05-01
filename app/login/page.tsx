import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";

interface Props {
  searchParams: { registered?: string };
}

export default async function LoginPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-xl shadow-lg border border-gray-800">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
        {searchParams.registered && (
          <div className="mb-4 bg-green-900/40 border border-green-700 text-green-300 px-4 py-3 rounded-lg text-sm">
            Account created — you can now sign in.
          </div>
        )}
        <LoginForm />
      </div>
    </div>
  );
}
