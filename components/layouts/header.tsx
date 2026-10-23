import Button from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg";
import Search from "../icons/search";
import Plus from "../icons/plus";
import Bell from "../icons/bell";
import { SidebarTrigger } from "../ui/sidebar";

export default function Header() {
    return (
        <header className="fixed w-full border-b-2 [background:var(--background)] h-14 px-4 flex items-center justify-between z-50">
            <div className="flex items-center gap-2">
                <SidebarTrigger />

                <Link href="/">
                    <Image 
                        src={logo} 
                        alt={"Carrier Pigeon Logo"} 
                        width={45} 
                        height={45}
                        priority
                    />
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
            </div>
        </header>
    );
}
