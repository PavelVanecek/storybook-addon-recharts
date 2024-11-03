import React from 'react';
import { useGlobals } from "@storybook/preview-api";

export function RechartsHookInspector() {
  const [globals] = useGlobals();
  return <>I am the Inspector.{JSON.stringify(globals)}</>
}
