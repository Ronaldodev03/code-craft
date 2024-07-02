"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icons } from "./icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  console.log(pathname);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-10 px-0 sm:hidden">
          <Menu className="h-5 w-5 outline-none ring-0 border-none" />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <MobileLink
          onOpenChange={setOpen}
          href="/"
          className="flex items-center gap-2 border-b border-b-border pb-2"
        >
          <Icons.logo className="mr-2 h-4 w-4" />
          <span className="font-bold ">{siteConfig.name}</span>
        </MobileLink>
        <div className="flex flex-col gap-3 mt-3">
          <MobileLink
            className={cn(
              "  border p-2 rounded-md text-center",
              pathname === "/" && "border-primary"
            )}
            onOpenChange={setOpen}
            href="/"
          >
            Home
          </MobileLink>
          <MobileLink
            className={cn(
              "  border p-2 rounded-md text-center",
              pathname === "/blog" && "border-primary"
            )}
            onOpenChange={setOpen}
            href="/blog"
          >
            Blog
          </MobileLink>
          <MobileLink
            className={cn(
              "  border p-2 rounded-md text-center",
              pathname === "/about" && "border-primary"
            )}
            onOpenChange={setOpen}
            href="/about"
          >
            About
          </MobileLink>
          <Link
            className="  border p-2 rounded-md text-center"
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
          >
            GitHub
          </Link>
          <Link
            className=" border p-2 rounded-md text-center"
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.linkedin}
          >
            Linkendin
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

//this is for closing the navBar once clicked a button
function MobileLink({
  href,
  onOpenChange,
  children,
  className,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
