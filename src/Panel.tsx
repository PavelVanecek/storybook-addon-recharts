import React, { MouseEvent } from "react";
import { useAddonState, useChannel } from "@storybook/manager-api";
import { AddonPanel, Code, Button } from "@storybook/components";
import { ADDON_ID, EVENTS } from "./constants";
import { PanelContent } from "./components/PanelContent";
import { styled } from "@storybook/theming";
import {
  hookRequestEvent,
  hookResultEvent,
} from "./RechartsStorybookInspector";

interface PanelProps {
  active: boolean;
}

const Main = styled.main({
  display: "flex",
  flexDirection: "row",
  justifyContent: "start",
  alignContent: "stretch",
});

const HookList = styled.ol({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

function HookItem({ hookName }: { hookName: string }) {
  const emit = useChannel({});
  function onClick(e: MouseEvent) {
    e.preventDefault();
    console.log("emitting");
    emit(hookRequestEvent, { hookName });
  }
  return (
    <li>
      <Button onClick={onClick}>{hookName}</Button>
    </li>
  );
}

export const Panel: React.FC<PanelProps> = (props) => {
  // https://storybook.js.org/docs/react/addons/addons-api#useaddonstate
  const [results, setState] = useAddonState(ADDON_ID, {
    hookName: "",
    result: undefined,
  });

  // https://storybook.js.org/docs/react/addons/addons-api#usechannel
  const emit = useChannel({
    [hookResultEvent]: (newResults) => setState(newResults),
  });

  return (
    <AddonPanel {...props}>
      <Main>
        <HookList>
          <HookItem hookName="useXAxis" />
          <HookItem hookName="useYAxis" />
        </HookList>
        <PanelContent
          results={results}
          fetchData={() => {
            emit(EVENTS.REQUEST);
          }}
          clearData={() => {
            emit(EVENTS.CLEAR);
          }}
        />
      </Main>
    </AddonPanel>
  );
};
