import CloseModal from "@/src/components/ui/close-modal";
import SignUp from "@/src/components/ui/sign-up";

type Props = {

}

export default function page({}: Props) {
    return (
        <div className="fixed inset-0 z-10">
            <div className="container flex items-center h-full max-w-lg mx-auto">
                <div className="relative w-full h-fit rounded-lg">
                    <CloseModal />

                    <SignUp />
                </div>
            </div>
        </div>
    );
}