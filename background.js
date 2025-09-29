import { TOKEN } from "./token.js";

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.action === "appendBlock") {
    try {
      const pageId = getPageIdFromUrl(sender.tab.url);
      if (!pageId) throw new Error("ページIDを取得できません");

      const block = msg.block;

      const res = await fetch(
        `https://api.notion.com/v1/blocks/${pageId}/children`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ children: [block] }),
        }
      );

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }

      const data = await res.json();
      sendResponse({ success: true, data });
    } catch (e) {
      console.error(e);
      sendResponse({ success: false, error: e.message });
    }

    return true; // async sendResponse 用
  }
});

// URL からページIDを抽出して UUID 形式に
function getPageIdFromUrl(url) {
  const match = url.match(/([a-f0-9]{32})/);
  if (!match) return null;
  return match[1].replace(
    /^(.{8})(.{4})(.{4})(.{4})(.{12})$/,
    "$1-$2-$3-$4-$5"
  );
}
