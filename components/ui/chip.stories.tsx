import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Chip } from "./chip";

const meta = {
    title: "Design System/Chip",
    component: Chip
} satisfies Meta<typeof Chip>

export default meta;

type Story = StoryObj<typeof Chip>;

export const Variants = {
    render: () => {
        return <div>
            <Chip>Default</Chip>
            <Chip variant={"bordered"}>Bordered</Chip>
        </div>
    }
} satisfies Story;