export const template1 = [
    {
      object: "block",
      type: "heading_1",
      heading_1: {
        rich_text: [{ type: "text", text: { content: "今日の出来事" } }],
      },
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          { type: "text", text: { content: "ここに内容を書きましょう。" } },
        ],
      },
    },
    {
      object: "block",
      type: "to_do",
      to_do: {
        rich_text: [{ type: "text", text: { content: "明日の予定を立てる" } }],
        checked: false,
      },
    },
  ];
  