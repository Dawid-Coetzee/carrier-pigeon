import Button from "@/components/ui/button";
import Bar3 from "../icons/bar3";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg";
import Search from "../icons/search";
import Plus from "../icons/plus";
import Bell from "../icons/bell";

export default function Header() {
    return (
        <header className="fixed w-full border-b bg-background h-14 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Button isIcon variant="plain" size="md">
                    <Bar3 />
                </Button>

                <Link href="/">
                    <Image src={logo} alt={"Carrier Pigeon Logo"} width={32} height={32}/>
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
