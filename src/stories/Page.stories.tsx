import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/test";

import { Page } from "./Page";
import { RechartsStorybookInspector } from "../RechartsStorybookInspector";
import React from "react";
import { useChannel } from "@storybook/preview-api";

const meta: Meta<typeof Page> = {
  title: "Example/Page",
  component: Page,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Page>;

export const LoggedOut: Story = {
  render: (...args) => {
    console.log("story args", args);
    const emit = useChannel({});
    return (
      <>
        <RechartsStorybookInspector />
        <Page />
      </>
    );
  },
};

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const LoggedIn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = await canvas.getByRole("button", {
      name: /Log in/i,
    });
    await userEvent.click(loginButton);
  },
};
