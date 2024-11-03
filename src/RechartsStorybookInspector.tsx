import React, { useContext } from "react";
import { useChannel, useStoryContext } from "@storybook/preview-api";
import { Code } from "@storybook/components";

export const hookRequestEvent = "recharts-hook-event-request";
export const hookResultEvent = "recharts-hook-event-result";

export function RechartsStorybookInspector() {
  // const hookRequest = useContext(HookRequestContext);
  // return (
  //   <p>
  //     This is recharts storybook inspector.
  //     {hookRequest == null ? (
  //       "No request"
  //     ) : (
  //       <>
  //         Request: <Code>{JSON.stringify(hookRequest)}</Code>
  //       </>
  //     )}
  //   </p>
  // );
  return null;
}
