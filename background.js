import { getNotionToken } from "./token/tokenManager.js";

//インストール時にモーダル表示
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.storage.local.set({ needShowInstallModal: true });

    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.url.includes("notion.so")) {
          chrome.scripting
            .insertCSS({
              target: { tabId: tab.id },
              files: ["styles.css"],
            })
            .then(() => {
              chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                  chrome.storage.local.get(
                    ["installModalShown", "needShowInstallModal"],
                    (data) => {
                      if (
                        !data.installModalShown &&
                        data.needShowInstallModal
                      ) {
                        if (document.getElementById("install-modal")) return;

                        const modal = document.createElement("div");
                        modal.id = "install-modal";
                        modal.className = "my-modal-overlay";

                        const box = document.createElement("div");
                        box.className = "my-modal-box";

                        const title = document.createElement("div");
                        title.className = "my-modal-title";
                        title.textContent = "拡張機能のインストール完了";

                        const msg = document.createElement("div");
                        msg.className = "my-modal-message";
                        msg.innerHTML = `
                        拡張機能のインストールが完了しました。<br>
                        利用するには、まずインテグレーションを取得して接続する必要があります。<br>
                        取得・接続方法がわからない方は、こちらの操作ガイドをご覧ください：
                        <a href="https://private-1215.github.io/homepage/" target="_blank">操作ガイド</a>
                        </p>
                        <p>
                        手順をご存じの方は「OK」を押して、インテグレーションの取得・接続を行ってください。<br>
                        その後、拡張アイコンをクリックしてトークンを入力すると拡張機能が使用可能になります。  
                        `;

                        const btn = document.createElement("button");
                        btn.className = "my-modal-button";
                        btn.textContent = "OK";
                        btn.onclick = () => {
                          modal.remove();
                          chrome.storage.local.set(
                            {
                              installModalShown: true,
                              needShowInstallModal: false,
                              installModalReloaded: true,
                            },
                            () => location.reload() // リロード
                          );
                        };

                        box.appendChild(title);
                        box.appendChild(msg);
                        box.appendChild(btn);
                        modal.appendChild(box);
                        document.body.appendChild(modal);
                      }
                    }
                  );
                },
              });
            });
        }
      });
    });
  }
});

// メッセージ受信
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "appendBlock") {
    handleAppendBlock(msg).then((blockRes) => {
      sendResponse(blockRes);
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
async function handleAppendBlock({ pageId, type, afterBlockId }) {
  const token = await getNotionToken();
  if (!token) {
    return {
      success: false,
      errorType: "token",
      message: "Notion トークンが設定されていません",
    };
  }
  const block = createBlock(type);
  if (!block) {
    return {
      success: false,
      errorType: "unsupported",
      message: "対応していないブロックタイプです",
    };
  }
  // カーソル位置にブロック追加 指定されていない時はページ末尾
  let bodyObj;
  if (afterBlockId && afterBlockId !== pageId) {
    bodyObj = {
      children: [block],
      after: afterBlockId,
    };
  } else {
    bodyObj = {
      children: [block],
    };
  }
  const res = await fetch(
    `https://api.notion.com/v1/blocks/${pageId}/children`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify(bodyObj),
    }
  );
  if (!res.ok) {
    const errText = await res.text();
    // トークンの問題
    if (res.status === 401 || res.status === 404)
      return { success: false, errorType: "token", message: errText };
    // Notion ページロードが終わっていないときの有名なエラー
    if (errText.includes("is not parented"))
      return { success: false, errorType: "not_loaded", message: errText };

    return { success: false, errorType: "unsupported", message: errText };
  }
  const data = await res.json();
  return { success: true, data };
}

//列ブロック
function makeColumnBlock(columnCount) {
  // 列リストブロックを作成
  const columnList = {
    object: "block",
    type: "column_list",
    column_list: {
      children: [],
    },
  };

  // 各列を追加
  for (let i = 0; i < columnCount; i++) {
    columnList.column_list.children.push({
      object: "block",
      type: "column",
      column: {
        children: [
          {
            object: "block",
            type: "paragraph",
            paragraph: {
              rich_text: [{ type: "text", text: { content: "" } }],
            },
          },
        ],
      },
    });
  }

  return columnList;
}

// ブロック作成関数　ブロックタイプに応じたAPIリクエスト用オブジェクト
function createBlock(type) {
  switch (type) {
    case "paragraph":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          color: "default",
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
    case "column_list_2":
      return makeColumnBlock(2);
    case "column_list_3":
      return makeColumnBlock(3);
    case "column_list_4":
      return makeColumnBlock(4);
    case "column_list_5":
      return makeColumnBlock(5);

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

    //テキストの色
    case "normal_text":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          color: "default",
          rich_text: [
            {
              type: "text",
              text: { content: "黒" },
            },
          ],
        },
      };
    case "gray_text":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          color: "gray",
          rich_text: [
            {
              type: "text",
              text: { content: "灰色" },
            },
          ],
        },
      };
    case "brown_text":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          color: "brown",
          rich_text: [
            {
              type: "text",
              text: { content: "茶" },
            },
          ],
        },
      };
    case "orange_text":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          color: "orange",
          rich_text: [
            {
              type: "text",
              text: { content: "オレンジ" },
            },
          ],
        },
      };
    case "yellow_text":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          color: "yellow",
          rich_text: [
            {
              type: "text",
              text: { content: "黄" },
            },
          ],
        },
      };
    case "green_text":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          color: "green",
          rich_text: [
            {
              type: "text",
              text: { content: "緑" },
            },
          ],
        },
      };
    case "blue_text":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          color: "blue",
          rich_text: [
            {
              type: "text",
              text: { content: "青" },
            },
          ],
        },
      };
    case "purple_text":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          color: "purple",
          rich_text: [
            {
              type: "text",
              text: { content: "紫" },
            },
          ],
        },
      };
    case "pink_text":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          color: "pink",
          rich_text: [
            {
              type: "text",
              text: { content: "ピンク" },
            },
          ],
        },
      };
    case "red_text":
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          color: "red",
          rich_text: [
            {
              type: "text",
              text: { content: "赤" },
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
        url: templateUrl,
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
