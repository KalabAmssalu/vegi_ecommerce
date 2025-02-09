"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignIn } from "@/action/Query/auth-Query/auth";

export function Login() {
  const { mutate: signIn } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // Default role is "admin"
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }

    try {
      const data = { email, password, role };
      await signIn(data);
    } catch (err) {
      setError("An error occurred during login");
    }
  };

  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/auth/forget"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Role Selection */}
          <div className="grid gap-2 mt-4">
            <Label htmlFor="role">Role</Label>
            <div className="flex items-center">
              <input
                type="radio"
                id="admin"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={(e) => setRole(e.target.value)}
              />
              <Label htmlFor="admin" className="ml-2">
                Admin
              </Label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="manager"
                name="role"
                value="manager"
                checked={role === "manager"}
                onChange={(e) => setRole(e.target.value)}
              />
              <Label htmlFor="manager" className="ml-2">
                Manager
              </Label>
            </div>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <Button type="button" className="w-full" onClick={handleLogin}>
            Login
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          <span>Don&apos;t have an account? </span>
          <Link href="/auth/register" className="text-blue-500">
            Register here
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
