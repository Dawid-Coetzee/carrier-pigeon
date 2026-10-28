import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./input";

const meta = {
  title: "Design System/Input",
  component: Input,
} satisfies Meta<typeof Input>

export default meta;

type Story = StoryObj<typeof Input>;

export const Default = {} satisfies Story;