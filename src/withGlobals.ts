import type {
  Renderer,
  PartialStoryFn as StoryFunction,
} from "@storybook/types";
import { useEffect, useGlobals } from "@storybook/preview-api";
import { PARAM_KEY } from "./constants";

export const withGlobals = (
  StoryFn: StoryFunction<Renderer>,
) => {
  const [globals] = useGlobals();
  const myAddon = globals[PARAM_KEY];

  useEffect(() => {
    // Execute your side effect here
    // For example, to manipulate the contents of the preview
    const selector = "#storybook-root";

    if (myAddon) {
      displayToolState(selector);
    }

    return () => {
      // Clean up the side effect here
      // For example, to remove the injected content
      const rootElements = document.querySelectorAll(selector);
      rootElements.forEach((rootElement) => {
        const preElement = rootElement.querySelector<HTMLPreElement>(
          `${selector} pre`
        );
        if (preElement) {
          preElement.remove();
        }
      });
    }
  }, [myAddon]);

  return StoryFn();
};

function displayToolState(selector: string) {
  const rootElements = document.querySelectorAll(selector);

  rootElements.forEach((rootElement) => {
    let preElement = rootElement.querySelector<HTMLPreElement>(
      `${selector} pre`
    );

    if (!preElement) {
      preElement = document.createElement("pre");
      preElement.style.setProperty("margin-top", "2rem");
      preElement.style.setProperty("padding", "1rem");
      preElement.style.setProperty("background-color", "#eee");
      preElement.style.setProperty("border-radius", "3px");
      preElement.style.setProperty("max-width", "600px");
      preElement.style.setProperty("overflow", "scroll");
      rootElement.appendChild(preElement);
    }

    preElement.innerText = `This snippet is injected by the withGlobals decorator.
It updates as the user interacts with the ⚡ or Theme tools in the toolbar above.
`;
  });
}
