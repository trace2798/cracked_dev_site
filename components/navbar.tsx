import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

export const Navbar = () => {
  return (
    <>
      <div className="fixed top-0 w-full h-14 px-4 border-b border-muted backdrop-blur-md shadow-sm flex items-center">
        <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
          <Logo />
          <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
            {/* <Button size="sm" variant="outline" asChild>
              <Link href="/">Home</Link>
            </Button> */}
            <ModeToggle />
            <Button size="sm" asChild>
              <Link href="/jobs">All Jobs</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
