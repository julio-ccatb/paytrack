import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../_components/modeToggle";
import { getServerAuthSession } from "@/server/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/routesEnum";

export const metadata = {
  title: "PayTrack - Clients",
  description: "PayTrack",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) redirect(ROUTES.LOGIN);

  return (
    <div>
      <div className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className=" ">PayTrack</span>
          </Link>
          <Link
            href="/dachboard/projects"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Projects
          </Link>
          <Link
            href="/dashboard/clients"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Clients
          </Link>
          <Link
            href="/dashboard/financials"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Financials
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="">PayTrack</span>
              </Link>
              <Link href="#" className="hover:text-foreground">
                Projects
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Clients
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Financials
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Image
                  className="!rounded-full"
                  src={session.user.image!}
                  alt={session.user.name!}
                  width={160}
                  height={160}
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link
                className="hover:cursor-pointer"
                href={"/api/auth/signout/google"}
              >
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </Link>
              <ModeToggle label="Theme" />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
