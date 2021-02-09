import * as React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import { getDefaultToolbarCommands } from "react-mde";
import styled from "styled-components";

export const RichTextTyper = styled(ReactMde)`
  width: 100%;
`;

function loadSuggestions(text) {
  return new Promise((accept, reject) => {
    setTimeout(() => {
      const suggestions = [
        {
          preview: "Andre",
          description: "@andre",
        },
        {
          preview: "Angela",
          description: "@angela",
        },
        {
          preview: "David",
          description: "@david",
        },
        {
          preview: "Louise",
          description: "@louise",
        },
      ].filter((i) => i.preview.toLowerCase().includes(text.toLowerCase()));
      accept(suggestions);
    }, 250);
  });
}

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

export default function RichTextEditor({ description, setDescription, className }) {
  const commands = getDefaultToolbarCommands();
  // console.log(commands);
  // const [value, setValue] = React.useState("**Hello world!!!**");
  const [selectedTab, setSelectedTab] = React.useState("write");
  // console.log(description);

  return (
    <div className={`w-3/4 md:w-1/2 my-3 ${className}`}>
      <RichTextTyper
        id="description"
        value={description}
        toolbarCommands={[["header", "bold", "ordered-list", "unordered-list", "checked-list"]]}
        onChange={setDescription}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) => Promise.resolve(converter.makeHtml(markdown))}
        loadSuggestions={loadSuggestions}
        childProps={{
          writeButton: {
            tabIndex: -1,
          },
        }}
      />
    </div>
  );
}
