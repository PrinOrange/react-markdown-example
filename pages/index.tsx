import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import { unified } from "unified";
import * as production from "react/jsx-runtime";
import { Fragment, createElement, useEffect, useState } from "react";
import { customImg } from "@/components/customImg";
import "highlight.js/styles/dark.css"; // import css file for code highlight theme.
import "katex/dist/katex.css"; // import css file for formula blocks.

const markdownText = `

## This is the heading

hello **world**, _this is italic sentence_
[This is a link](https://example.com)

$$
a^{2} + b^{2} = c^{2}
$$

\`\`\`javascript
console.log(hello world)
\`\`\`

| name    | age | job      |
| ------- | --- | -------- |
| Alice   | 30  | engineer |
| Bob     | 25  | designer |
| Charlie | 28  | techer   |

![This is a Qomolangma mountain, the highest mountain around the world](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdzhPIE2I8agW_N3Cl2hNuwy9xSUiDfKtFFQ&s)
Mount Everest attracts many climbers, including highly experienced mountaineers. There are two main climbing routes, one approaching the summit from the southeast in Nepal (known as the "standard route") and the other from the north in Tibet. While not posing substantial technical climbing challenges on the standard route, Everest presents dangers such as altitude sickness, weather, and wind, as well as hazards from avalanches and the Khumbu Icefall. As of May 2024, 340 people have died on Everest. Over 200 bodies remain on the mountain and have not been removed due to the dangerous conditions.

`;

export default function Home() {
  const [element, setElement] = useState(createElement(Fragment));

  const processMarkdown = async () => {
    const pipeline = await unified()
      // Entry Plugin, string to mdast
      .use(remarkParse)
      // Add remark-gfm to recognize table syntax
      .use(remarkGfm)
      // Add remark-math to recognize the formula-block syntax
      .use(remarkMath)
      // Syntax convert plugin, mdast to hast
      .use(remarkRehype)
      // Use rehype-katex to add formula styles to formula block.
      .use(rehypeKatex)
      // Use rehype-highlight to add css classes for elements in code block to make them stylified.
      .use(rehypeHighlight, { detect: true })
      // Output plugin, hast to React JSX Element
      .use(rehypeReact, { ...production, components: { img: customImg } })
      .process(markdownText);
    return pipeline.result;
  };

  useEffect(() => {
    processMarkdown().then((elem) => setElement(elem));
  }, [markdownText]);

  return (
    <div className="p-5">
      <main className="prose">
        {/* The compiled element will display here. */}
        {element}
      </main>
    </div>
  );
}
