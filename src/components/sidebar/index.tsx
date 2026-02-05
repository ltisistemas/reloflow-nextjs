"use client";

import { useEffect, useState } from "react";
import { Bell, LogOut, Menu, Moon, Sun, UserCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { UserInfo } from "../models/user-info";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "../ui/popover";
import { Link } from "@radix-ui/react-navigation-menu";
import { redirect } from "next/navigation";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Sidebar() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const { setTheme } = useTheme();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      return;
    }

    window.location.href = "/sign-in";
  }, []);
  return (
    <div className="flex w-full h-14 flex-col bg-muted">
      <div className="flex flex-col">
        <header className="w-full flex items-center p-2 gap-4 bg-muted-foreground text-muted border-b shadow-sm sticky top-0 z-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" className="cursor-pointer">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-4">
              <SheetHeader>
                <SheetTitle>Reloflow</SheetTitle>
              </SheetHeader>

              <h2 className="mb-4 text-lg font-semibold">Sidebar</h2>
            </SheetContent>
          </Sheet>
          <span>ReloFlow - Your Workflow Manager</span>
          <Separator orientation="vertical" className="mx-2 h-6 ml-auto" />
          <Button size="icon" className="cursor-pointer">
            <Bell className="w-5 h-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" className="relative cursor-pointer">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className="cursor-pointer"
              >
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="cursor-pointer"
              >
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className="cursor-pointer"
              >
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="default" className="cursor-pointer">
                <UserCircle2 className="w-5 h-5" />
                {user?.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => redirect("/sign-in")}
                className="cursor-pointer"
              >
                <LogOut />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
      </div>
    </div>
  );
}
