"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useCallback, useEffect, useState } from "react";
import { login } from "./actions";
import { alert } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { redirect } from "next/navigation";

export default function AuthPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Clear any existing authentication tokens or user data on mount
    document.cookie = "token=; path=/; max-age=0";

    localStorage.removeItem("user");
  }, []);

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (loading) return;
      setLoading(true);

      // Implement login logic here
      const { email, password } = formData;
      console.log("> FormData:", formData);
      if (!email.length || !password.length) {
        alert("Please enter both email and password.", "error");
        return;
      }

      login({ email, password })
        .then((response) => {
          if (response) {
            document.cookie = `token=${response.access_token}; path=/; max-age=86400`; // 1 day

            // set User Info on Local Storage
            const user = {
              sub: response.sub,
              email: response.email,
              name: response.name,
            };
            localStorage.setItem("user", JSON.stringify(user));

            alert("Login successful!", "success");

            // Redirect to dashboard or home page
            window.location.href = "/home";
            return;
          }

          alert("Erro ao realizar o login.", "error");
        })
        .catch((error) => {
          console.log("> Err", error);
          alert("An unexpected error occurred.", "error");
        })
        .finally(() => setLoading(false));
    },
    [formData, loading, login],
  );

  return (
    <div className="flex justify-center min-h-screen items-center bg-muted dark:bg-muted-foreground p-2">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>ReloFlow - Autenticação</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={formData.email}
                  onChange={onChangeForm}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={onChangeForm}
                />
                <a
                  href="#"
                  className="flex justify-end text-sm underline-offset-4 hover:underline"
                >
                  Esqueceu sua senha?
                </a>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            variant="default"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
            type="button"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading && <Spinner className="mr-2" />}
            {loading && "Autenticando..."}
            {!loading && "Entrar"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
