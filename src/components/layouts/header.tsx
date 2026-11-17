import Button, { buttonVariants } from "@/src/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg";
import Search from "../icons/search";
import Plus from "../icons/plus";
import Bell from "../icons/bell";
import { SidebarTrigger } from "../ui/sidebar";
import { getAuthSession } from "@/src/lib/auth";

export default async function Header() {
    const session = await getAuthSession();

    return (
        <header className="fixed w-full border-b-2 [background:var(--background)] h-14 px-4 flex items-center justify-between z-50">
            <div className="flex items-center gap-2">
                <SidebarTrigger />

                <Link href="/" className={"flex items-center justify-center relative"}>
                    <Image 
                        src={logo} 
                        alt={"Carrier Pigeon Logo"} 
                        width={45} 
                        height={45}
                        priority
                    />
                    <span className="hidden md:inline font-bold text-lg relative top-0.5">Carrier Pigeon</span>
                </Link>
            </div>

            <div className="flex items-center">
                <Button isIcon variant="plain" size="md">
                    <Search />
                </Button>
                <Button isIcon variant="plain" size="md">
                    <Plus />
                </Button>
                <Button isIcon variant="plain" size="md">
                    <Bell />
                </Button>
                <Link href="/sign-in" className={buttonVariants()}>Sign In</Link>
            </div>
        </header>
    );
}
