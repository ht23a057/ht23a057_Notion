import { getNotionToken } from "./token/tokenManager.js";

// メッセージ受信
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "appendBlock") {
    handleAppendBlock(msg)
      .then((blockRes) => {
        sendResponse(blockRes);
      })
      .catch((err) => {
        console.error("appendBlock error:", err);
        sendResponse({ success: false, error: err.message });
      });
    return true; // 非同期レスポンスを維持
  }

  if (msg.action === "toggleFavorite") {
    handleToggleFavorite(msg, sendResponse).catch((err) => {
      sendResponse({ success: false, error: err.message });
    });
    return true;
  }

  if (msg.action === "fetchFavorites") {
    handleFetchFavorites(sendResponse).catch((err) => {
      sendResponse({ success: false, error: err.message });
    });
    return true;
  }

  sendResponse({ success: false, error: "不明なアクションです" });
});

// 通常ブロック追加
async function handleAppendBlock({ pageId, type }) {
  const token = await getNotionToken();
  if (!token) throw new Error("Notion トークンが設定されていません");

  const block = createBlock(type);
  if (!block)
    return { success: false, error: "対応していないブロックタイプです" };

  const res = await fetch(
    `https://api.notion.com/v1/blocks/${pageId}/children`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
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
    case "divider":
      return { object: "block", type: "divider", divider: {} };

    //メディア
    case "code":
      return {
        object: "block",
        type: "code",
        code: {
          rich_text: [{ type: "text", text: { content: "" } }],
          language: "javascript",
        },
      };
    case "bookmark":
      return {
        object: "block",
        type: "bookmark",
        bookmark: {
          url: type.url || "",
          caption: [],
        },
      };

    //データベース

    //応用
    case "table_of_contents":
      return {
        object: "block",
        type: "table_of_contents",
        table_of_contents: {},
      };
    case "equation":
      return {
        object: "block",
        type: "equation",
        equation: { expression: "a=1" },
      };
    case "breadcrumb":
      return {
        object: "block",
        type: "breadcrumb",
        breadcrumb: {},
      };

    case "synced_block":
      return {
        object: "block",
        type: "synced_block",
        synced_block: { synced_from: null },
      };

    case "heading_1_toggle":
      return {
        object: "block",
        type: "heading_1",
        heading_1: {
          rich_text: [{ type: "text", text: { content: "\u200b" } }],
          is_toggleable: true,
          color: "default",
        },
      };

    case "heading_2_toggle":
      return {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "\u200b" } }],
          is_toggleable: true,
          color: "default",
        },
      };

    case "heading_3_toggle":
      return {
        object: "block",
        type: "heading_3",
        heading_3: {
          rich_text: [{ type: "text", text: { content: "\u200b" } }],
          is_toggleable: true,
          color: "default",
        },
      };

    case "code_Mermaid":
      return {
        object: "block",
        type: "code",
        code: {
          rich_text: [
            {
              type: "text",
              text: { content: "graph TD\n  Mermaid --> Diagram" },
            },
          ],
          language: "mermaid",
          caption: [],
        },
      };

    //インライン埋め込み
    //埋め込み
    case "embed":
      return {
        object: "block",
        type: "embed",
        embed: {
          url: type.url || "",
          caption: [],
        },
      };
    //インポート
    //ブロックタイプの変換
    //アクション
    //テキストの色
    case "normal_text":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: { content: "黒" },
              annotations: { color: "default" },
            },
          ],
        },
      };
    case "gray_text":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: { content: "灰色" },
              annotations: { color: "gray" },
            },
          ],
        },
      };
    case "brown_text":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: { content: "茶" },
              annotations: { color: "brown" },
            },
          ],
        },
      };
    case "orange_text":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: { content: "オレンジ" },
              annotations: { color: "orange" },
            },
          ],
        },
      };
    case "yellow_text":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: { content: "黄" },
              annotations: { color: "yellow" },
            },
          ],
        },
      };
    case "green_text":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: { content: "緑" },
              annotations: { color: "green" },
            },
          ],
        },
      };
    case "blue_text":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: { content: "青" },
              annotations: { color: "blue" },
            },
          ],
        },
      };
    case "purple_text":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: { content: "紫" },
              annotations: { color: "purple" },
            },
          ],
        },
      };
    case "pink_text":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: { content: "ピンク" },
              annotations: { color: "pink" },
            },
          ],
        },
      };
    case "red_text":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: { content: "赤" },
              annotations: { color: "red" },
            },
          ],
        },
      };

    //背景色
    case "normal":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          color: "default_background",
          rich_text: [
            {
              type: "text",
              text: { content: "\u200b" },
              annotations: { color: "default" },
            },
          ],
        },
      };
    case "gray":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          color: "gray_background",
          rich_text: [
            {
              type: "text",
              text: { content: "\u200b" },
              annotations: { color: "default" },
            },
          ],
        },
      };
    case "brown":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          color: "brown_background",
          rich_text: [
            {
              type: "text",
              text: { content: "\u200b" },
              annotations: { color: "default" },
            },
          ],
        },
      };
    case "orange":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          color: "orange_background",
          rich_text: [
            {
              type: "text",
              text: { content: "\u200b" },
              annotations: { color: "default" },
            },
          ],
        },
      };
    case "yellow":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          color: "yellow_background",
          rich_text: [
            {
              type: "text",
              text: { content: "\u200b" },
              annotations: { color: "default" },
            },
          ],
        },
      };
    case "green":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          color: "green_background",
          rich_text: [
            {
              type: "text",
              text: { content: "\u200b" },
              annotations: { color: "default" },
            },
          ],
        },
      };
    case "blue":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          color: "blue_background",
          rich_text: [
            {
              type: "text",
              text: { content: "\u200b" },
              annotations: { color: "default" },
            },
          ],
        },
      };
    case "purple":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          color: "purple_background",
          rich_text: [
            {
              type: "text",
              text: { content: "\u200b" },
              annotations: { color: "default" },
            },
          ],
        },
      };
    case "pink":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          color: "pink_background",
          rich_text: [
            {
              type: "text",
              text: { content: "\u200b" },
              annotations: { color: "default" },
            },
          ],
        },
      };
    case "red":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          color: "red_background",
          rich_text: [
            {
              type: "text",
              text: { content: "\u200b" },
              annotations: { color: "default" },
            },
          ],
        },
      };
    default:
      return null;
  }
}

// お気に入りの追加・削除
async function handleToggleFavorite(msg, sendResponse) {
  const { templateId, templateTitle, templateUrl } = msg;

  const cleanTitle = templateTitle
    .replace(/Notionテンプレート/g, "") // 全角｜で区切られたパターン
    .replace(/\s*\|\s*Notion.*/g, "") // 半角| や " | Notion" 対策
    .replace(/\s*–\s*Notion.*/g, "") // "– Notion" のようなパターンにも対応
    .trim();

  // 現在のデータを取得
  chrome.storage.local.get(["FAVORITE_TEMPLATES"], (data) => {
    let favorites = data.FAVORITE_TEMPLATES || [];

    // すでに登録済みなら削除、未登録なら追加
    const index = favorites.findIndex((item) => item.id === templateId);

    if (index !== -1) {
      favorites.splice(index, 1); // 削除
    } else {
      favorites.push({
        id: templateTitle,
        title: cleanTitle,
        url: templateTitle,
        thumbnail: `https://www.google.com/s2/favicons?sz=64&domain_url=${templateUrl}`,
        addedAt: new Date().toISOString(),
      });
    }

    // 更新を保存
    chrome.storage.local.set({ FAVORITE_TEMPLATES: favorites }, () => {
      sendResponse({
        success: true,
        favorites,
      });
    });
  });
}

// お気に入り一覧を取得
async function handleFetchFavorites(sendResponse) {
  chrome.storage.local.get(["FAVORITE_TEMPLATES"], (data) => {
    const favorites = data.FAVORITE_TEMPLATES || [];
    sendResponse({ success: true, favorites });
  });
}
