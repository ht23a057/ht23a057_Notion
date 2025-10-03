import { NOTION_TOKEN } from "./token.js";

// メッセージ受信
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  switch (msg.action) {
    //通常ブロック
    case "appendBlock":
      handleAppendBlock(msg)
        .then((res) => sendResponse(res))
        .catch((err) => sendResponse({ success: false, error: err.message }));
      return true;
    case "addMediaBlock":
      handleAddMediaBlock(msg)
        .then((res) => sendResponse(res))
        .catch((err) => sendResponse({ success: false, error: err.message }));
      return true;
  }
});
// 通常ブロック追加
async function handleAppendBlock({ pageId, type }) {
  const block = createBlock(type);
  if (!block)
    return { success: false, error: "対応していないブロックタイプです" };

  const res = await fetch(
    `https://api.notion.com/v1/blocks/${pageId}/children`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({ children: [block] }),
    }
  );
  if (!res.ok) {
    console.log("ブロックを追加できません");
    throw new Error(`Notion API エラー: ${res.status} ${await res.text()}`);
  }
  return { success: true, data: await res.json() };
}
function normalizeEmbedUrl(url) {
  // TikTok URL → embed URL
  const tiktokMatch = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
  if (tiktokMatch) {
    return `https://www.tiktok.com/embed/v2/${tiktokMatch[1]}`;
  }

  // YouTube 短縮URL対応
  const ytShortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (ytShortMatch) {
    return `https://www.youtube.com/embed/${ytShortMatch[1]}`;
  }

  // YouTube 通常URL
  const ytMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

  return url;
}

async function handleAddMediaBlock({ pageId, type, url }) {
  let block;
  const finalUrl = normalizeEmbedUrl(url);

  if (type === "video" || type === "embed") {
    block = {
      object: "block",
      type: "embed",
      embed: { url: finalUrl },
    };
  } else if (type === "image") {
    block = {
      object: "block",
      type: "image",
      image: { type: "external", external: { url: finalUrl } },
    };
  } else {
    return { success: false, error: "対応していないタイプです" };
  }

  const res = await fetch(
    `https://api.notion.com/v1/blocks/${pageId}/children`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({ children: [block] }),
    }
  );

  if (!res.ok)
    throw new Error(`Notion API エラー: ${res.status} ${await res.text()}`);
  return { success: true, data: await res.json() };
}

// ArrayBuffer -> Base64 変換
function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
}

// ブロック作成関数　ブロックタイプに応じたAPIリクエスト用オブジェクト
function createBlock(type) {
  switch (type) {
    case "paragraph":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [{ type: "text", text: { content: "\u200b" } }],
        },
      };
    case "heading_1":
      return {
        object: "block",
        type: "heading_1",
        heading_1: {
          rich_text: [{ type: "text", text: { content: "\u200b" } }],
        },
      };
    case "heading_2":
      return {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "\u200b" } }],
        },
      };
    case "heading_3":
      return {
        object: "block",
        type: "heading_3",
        heading_3: {
          rich_text: [{ type: "text", text: { content: "\u200b" } }],
        },
      };
    case "bulleted_list_item":
      return {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "\u200b" } }],
        },
      };
    case "numbered_list_item":
      return {
        object: "block",
        type: "numbered_list_item",
        numbered_list_item: {
          rich_text: [{ type: "text", text: { content: "\u200b" } }],
        },
      };
    case "to_do":
      return {
        object: "block",
        type: "to_do",
        to_do: {
          rich_text: [{ type: "text", text: { content: "\u200b" } }],
          checked: false,
        },
      };
    case "toggle":
      return {
        object: "block",
        type: "toggle",
        toggle: {
          rich_text: [{ type: "text", text: { content: "\u200b" } }],
          children: [],
        },
      };
    case "callout":
      return {
        object: "block",
        type: "callout",
        callout: { rich_text: [{ type: "text", text: { content: "\u200b" } }] },
      };
    case "quote":
      return {
        object: "block",
        type: "quote",
        quote: { rich_text: [{ type: "text", text: { content: "\u200b" } }] },
      };
    case "code":
      return {
        object: "block",
        type: "code",
        code: {
          rich_text: [{ type: "text", text: { content: "" } }],
          language: "javascript",
        },
      };
    case "divider":
      return { object: "block", type: "divider", divider: {} };
    default:
      return null;
  }
}
