import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function communityPreview() {
    return (
        <Card className="py-4 border-2 shadow-[1px_2px_4px_2px_#777] rounded-md gap-2">
            <CardHeader className="px-4 gap-1">
                <CardTitle className="text-black font-semibold text-xl">p/communityname</CardTitle>
                <p className="text-md">1 member · 1 online</p>
            </CardHeader>
            <CardContent className="px-4">
                <p className="text-lg">Your community description</p>
            </CardContent>
        </Card>
    );
}
