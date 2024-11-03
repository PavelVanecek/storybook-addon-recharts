import React, { createContext, useContext } from "react";
import { useChannel, useState } from "@storybook/preview-api";
import type {
  PartialStoryFn as StoryFunction,
  Renderer,
} from "@storybook/types";
import { STORY_CHANGED } from "@storybook/core-events";
import { EVENTS } from "./constants";
import {
  hookRequestEvent,
  // RechartsStorybookInspector,
} from "./RechartsStorybookInspector";
import { Code } from "@storybook/components";

type HookRequest = {
  hookName: string;
  args: ReadonlyArray<string | number>;
};

type HookResult = HookRequest & {
  result: unknown;
};

const HookRequestContext = createContext<HookRequest | null>(null);

function RechartsStorybookInspector() {
  const hookRequest = useContext(HookRequestContext);
  return (
    <p>
      This is recharts storybook inspector v2.
      {hookRequest == null ? (
        "No request"
      ) : (
        <>
          Request: <Code>{JSON.stringify(hookRequest)}</Code>
        </>
      )}
    </p>
  );
}

export const withRoundTrip = (storyFn: StoryFunction<Renderer>) => {
  const [hookRequest, setHookRequest] = useState<HookRequest | null>(null);

  const emit = useChannel({
    [hookRequestEvent]: (args) => {
      console.log("addon manager is requesting a hook call", args);
      setHookRequest(args);
    },
    [STORY_CHANGED]: () => {
      emit(EVENTS.RESULT, {
        danger: [],
        warning: [],
      });
    },
    [EVENTS.CLEAR]: () => {
      emit(EVENTS.RESULT, {
        danger: [],
        warning: [],
      });
    },
  });

  return (
    <HookRequestContext.Provider value={hookRequest}>
      {storyFn({ RechartsStorybookInspector })}
    </HookRequestContext.Provider>
  );
};
