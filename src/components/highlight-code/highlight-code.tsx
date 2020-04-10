import React, { FunctionComponent, memo, CSSProperties, useMemo } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export interface IHighlightCodeProps {
  code: string;
  useDiff?: boolean;
  language: string;
}

const HighlightCode: FunctionComponent<IHighlightCodeProps> = memo(
  (props: IHighlightCodeProps) => {
    const { code, useDiff, language } = props;
    if (!code) return null;

    const { codeString, addedLineNumbers, removedLineNumbers } = useMemo(() => {
      const rawPatch: string[] = code.split("\n");
      const codeString: string[] = [];
      const addedLineNumbers: number[] = [];
      const removedLineNumbers: number[] = [];

      // skip the first line, in rawPatch, first line is like `@@ -0,0 +1,2 @@`
      for (let i = 1; i < rawPatch.length; i++) {
        const rawLine = rawPatch[i];
        if (rawLine[0] === "+") {
          addedLineNumbers.push(i);
        } else if (rawLine[0] === "-") {
          removedLineNumbers.push(i);
        }
        codeString.push(rawLine.substr(1));
      }
      return {
        codeString: codeString.join("\n"),
        addedLineNumbers,
        removedLineNumbers
      };
    }, [code]);

    const lineProps = useMemo(() => {
      if (useDiff) {
        return (lineNumber: number) => {
          let style: CSSProperties = {
            display: "block"
          };
          if (addedLineNumbers.indexOf(lineNumber) !== -1) {
            style.backgroundColor = "#dbffdb";
          } else if (removedLineNumbers.indexOf(lineNumber) !== -1) {
            style.backgroundColor = "#ffecec";
          }
          return { style };
        };
      } else return undefined;
    }, [useDiff, addedLineNumbers, removedLineNumbers]);

    return (
      <SyntaxHighlighter
        language={language}
        style={docco}
        showLineNumbers
        wrapLines={true}
        lineProps={lineProps}
      >
        {codeString}
      </SyntaxHighlighter>
    );
  }
);

HighlightCode.defaultProps = {
  useDiff: false
};

export default HighlightCode;
