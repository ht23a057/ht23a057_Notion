//インストール時にモーダル表示
//初期化
let allowReload = false;
chrome.storage.local.get(["installModalReloaded"], (data) => {
  allowReload = !!data.installModalReloaded;

  chrome.storage.local.get(
    ["installModalShown", "needShowInstallModal"],
    (d2) => {
      if (!d2.installModalShown && d2.needShowInstallModal) {
        showInstallModal();
      }
    }
  );
  startUrlWatcher(); //URL監視
});

// モーダル表示
function showInstallModal() {
  const old = document.getElementById("install-modal");
  if (old) old.remove();

  const modal = document.createElement("div");
  modal.id = "install-modal";
  modal.className = "my-modal-overlay"; // エラーモーダルと同じクラス

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
      取得・接続方法がわからない方は、こちらの「Notion接続ガイド」をご覧ください：
    <a href="https://private-1215.github.io/homepage/" target="_blank">Notion接続ガイド</a>
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
    // 初回リロード許可
    chrome.storage.local.set(
      {
        installModalShown: true,
        needShowInstallModal: false,
        installModalReloaded: true,
      },
      () => location.reload()
    );
  };

  box.appendChild(title);
  box.appendChild(msg);
  box.appendChild(btn);
  modal.appendChild(box);
  document.body.appendChild(modal);
}

// URL監視（重要）
function startUrlWatcher() {
  let currentUrl = location.href;

  setInterval(() => {
    if (location.href !== currentUrl) {
      currentUrl = location.href;

      if (allowReload) location.reload();

      injectMenuBar();
    }
  }, 800);
}

const blockGroups = [
  {
    group: "基本",
    blocks: [
      { label: "テキスト", type: "paragraph", supported: true },
      { label: "見出し1", type: "heading_1", supported: true },
      { label: "見出し2", type: "heading_2", supported: true },
      { label: "見出し3", type: "heading_3", supported: true },
      { label: "箇条書きリスト", type: "bulleted_list_item", supported: true },
      { label: "番号付きリスト", type: "numbered_list_item", supported: true },
      { label: "ToDoリスト", type: "to_do", supported: true },
      { label: "トグルリスト", type: "toggle", supported: true },
      { label: "コールアウト", type: "callout", supported: true },
      { label: "引用", type: "quote", supported: true },
      { label: "区切り線", type: "divider", supported: true },
    ],
  },
  {
    group: "メディア",
    blocks: [
      { label: "画像", type: "embed", supported: true },
      { label: "動画", type: "embed", supported: true },
      { label: "オーディオ", type: "embed", supported: true },
      { label: "コード", type: "code", supported: true },
      { label: "ファイル", type: "embed", supported: true },
      { label: "Webブックマーク", type: "bookmark", supported: true },
    ],
  },
  {
    group: "応用",
    blocks: [
      { label: "目次", type: "table_of_contents", supported: true },
      { label: "式ブロック", type: "equation", supported: true },
      { label: "階層リンク", type: "breadcrumb", supported: true },
      { label: "同期ブロック", type: "synced_block", supported: true },
      { label: "トグル見出し1", type: "heading_1_toggle", supported: true },
      { label: "トグル見出し2", type: "heading_2_toggle", supported: true },
      { label: "トグル見出し3", type: "heading_3_toggle", supported: true },
      { label: "2列", type: "column_list_2", supported: true },
      { label: "3列", type: "column_list_3", supported: true },
      { label: "4列", type: "column_list_4", supported: true },
      { label: "5列", type: "column_list_5", supported: true },
      { label: "コード：Mermaid", type: "code_Mermaid", supported: true },
    ],
  },
  {
    group: "埋め込み",
    blocks: [
      { label: "埋め込み", type: "embed", supported: true },
      { label: "Google Drive", type: "embed", supported: true },
      { label: "ツイート", type: "embed", supported: true },
      { label: "GitHub Gist", type: "embed", supported: true },
      { label: "Googleマップ", type: "embed", supported: true },
      { label: "Figma", type: "embed", supported: true },
      { label: "Abstract", type: "embed", supported: true },
      { label: "Invision", type: "embed", supported: true },
      { label: "Mixpanel", type: "embed", supported: true },
      { label: "Framer", type: "embed", supported: true },
      { label: "Whimsical", type: "embed", supported: true },
      { label: "Miro", type: "embed", supported: true },
      { label: "Sketch", type: "embed", supported: true },
      { label: "Excalidraw", type: "embed", supported: true },
      { label: "PDF", type: "embed", supported: true },
      { label: "Loom", type: "embed", supported: true },
      { label: "Typeform", type: "embed", supported: true },
      { label: "Codepen", type: "embed", supported: true },
      { label: "Replit", type: "embed", supported: true },
      { label: "Hex", type: "embed", supported: true },
      { label: "Deepnote", type: "embed", supported: true },
      { label: "GitLab", type: "embed", supported: true },
      { label: "Jira", type: "embed", supported: true },
      { label: "Trello", type: "embed", supported: true },
      { label: "GitHub", type: "embed", supported: true },
      { label: "Asana", type: "embed", supported: true },
      { label: "Slack", type: "embed", supported: true },
      { label: "Pitch", type: "embed", supported: true },
      { label: "Dropbox", type: "embed", supported: true },
      { label: "Zoom", type: "embed", supported: true },
      { label: "OneDrive", type: "embed", supported: true },
      { label: "Amplitude", type: "embed", supported: true },
      { label: "Claap", type: "embed", supported: true },
      { label: "Box", type: "embed", supported: true },
      { label: "Linear", type: "embed", supported: true },
      { label: "Lucidchart", type: "embed", supported: true },
      { label: "Lucidspark", type: "embed", supported: true },
      { label: "Eraser", type: "embed", supported: true },
      { label: "PagerDuty", type: "embed", supported: true },
      { label: "ClickUp", type: "embed", supported: true },
      { label: "Adobe XD", type: "embed", supported: true },
      { label: "Plus", type: "embed", supported: true },
      { label: "Dovetail", type: "embed", supported: true },
      { label: "Streak Share", type: "embed", supported: true },
      { label: "Shortcut", type: "embed", supported: true },
      { label: "SendOwl", type: "embed", supported: true },
      { label: "Amplitude-EU", type: "embed", supported: true },
      { label: "Zendesk", type: "embed", supported: true },
      { label: "Jira preview(Data center)", type: "embed", supported: true },
      { label: "Google Contacts", type: "embed", supported: true },
      { label: "Discord", type: "embed", supported: true },
      { label: "Microsoft Contacts", type: "embed", supported: true },
    ],
  },
  {
    group: "ブロックタイプの変換",
    blocks: [
      { label: "テキスト", type: "paragraph", supported: true },
      { label: "見出し1", type: "heading_1", supported: true },
      { label: "見出し2", type: "heading_2", supported: true },
      { label: "見出し3", type: "heading_3", supported: true },
      { label: "箇条書きリスト", type: "bulleted_list_item", supported: true },
      { label: "番号付きリスト", type: "numbered_list_item", supported: true },
      { label: "ToDoリスト", type: "to_do", supported: true },
      { label: "トグルリスト", type: "toggle", supported: true },
      { label: "コード", type: "code", supported: true },
      { label: "引用", type: "quote", supported: true },
      { label: "コールアウト", type: "callout", supported: true },
      { label: "式ブロック", type: "equation", supported: true },
      { label: "同期ブロック", type: "synced_block", supported: true },
      { label: "トグル見出し1", type: "heading_1_toggle", supported: true },
      { label: "トグル見出し2", type: "heading_2_toggle", supported: true },
      { label: "トグル見出し3", type: "heading_3_toggle", supported: true },
      { label: "2列", type: "column_list_2", supported: true },
      { label: "3列", type: "column_list_3", supported: true },
      { label: "4列", type: "column_list_4", supported: true },
      { label: "5列", type: "column_list_5", supported: true },
    ],
  },

  {
    group: "テキストの色",
    blocks: [
      { label: "既定のテキスト", type: "normal_text", supported: true },
      { label: "灰色のテキスト", type: "gray_text", supported: true },
      { label: "茶色のテキスト", type: "brown_text", supported: true },
      { label: "オレンジ色のテキスト", type: "orange_text", supported: true },
      { label: "黄色のテキスト", type: "yellow_text", supported: true },
      { label: "緑色のテキスト", type: "green_text", supported: true },
      { label: "青色のテキスト", type: "blue_text", supported: true },
      { label: "紫色のテキスト", type: "purple_text", supported: true },
      { label: "ピンク色のテキスト", type: "pink_text", supported: true },
      { label: "赤色のテキスト", type: "red_text", supported: true },
    ],
  },
  {
    group: "背景色",
    blocks: [
      { label: "背景色なし", type: "normal", supported: true },
      { label: "背景色：グレー", type: "gray", supported: true },
      { label: "背景色：ブラウン", type: "brown", supported: true },
      { label: "背景色：オレンジ", type: "orange", supported: true },
      { label: "背景色：黄色", type: "yellow", supported: true },
      { label: "背景色：緑", type: "green", supported: true },
      { label: "背景色：青", type: "blue", supported: true },
      { label: "背景色：紫", type: "purple", supported: true },
      { label: "背景色：ピンク", type: "pink", supported: true },
      { label: "背景色：赤", type: "red", supported: true },
    ],
  },
];

// ページID抽出
function extractPageId(url) {
  const match = url.match(/[0-9a-f]{32}/);
  if (!match) return console.log("ページIDが見つかりません");
  const id = match[0];
  return (
    id.substr(0, 8) +
    "-" +
    id.substr(8, 4) +
    "-" +
    id.substr(12, 4) +
    "-" +
    id.substr(16, 4) +
    "-" +
    id.substr(20)
  );
}

//カーソル位置を取得
let SelectBlockId = null; //最後に選択されたブロックIDを保持
// data-block-id をたどって探す関数
function findBlockIdFromNode(node) {
  while (node && node !== document) {
    if (node.getAttribute && node.getAttribute("data-block-id")) {
      return node.getAttribute("data-block-id");
    }
    node = node.parentElement;
  }
  return null;
}
//カーソル位置のブロックIDを更新
function updateSelectBlockId() {
  const sel = window.getSelection();
  const node = sel?.anchorNode;
  const blockId = findBlockIdFromNode(node?.parentElement || node);
  if (blockId) SelectBlockId = blockId;
}
document.addEventListener("mouseup", updateSelectBlockId);
document.addEventListener("keyup", updateSelectBlockId);
document.addEventListener("focusin", updateSelectBlockId);
document.addEventListener("selectionchange", updateSelectBlockId);

//トークン接続のエラー
function showErrorModal(message) {
  // 既存のモーダルがあれば削除
  const old = document.getElementById("my-error-modal");
  if (old) old.remove();

  // モーダル外枠
  const modal = document.createElement("div");
  modal.id = "my-error-modal";
  modal.className = "my-modal-overlay";

  // 中のボックス
  const box = document.createElement("div");
  box.className = "my-modal-box";

  const title = document.createElement("div");
  title.className = "my-modal-title";
  title.textContent = "エラーが発生しました";

  const msg = document.createElement("div");
  msg.className = "my-modal-message";
  msg.innerHTML = message;

  const btn = document.createElement("button");
  btn.className = "my-modal-button";
  btn.textContent = "OK";
  btn.onclick = () => modal.remove();

  box.appendChild(title);
  box.appendChild(msg);
  box.appendChild(btn);

  modal.appendChild(box);
  document.body.appendChild(modal);
}

//色に関して
function createColorIcon(color) {
  const div = document.createElement("div");
  div.style.width = "18px";
  div.style.height = "18px";
  div.style.backgroundColor = color;
  div.style.border = "1px solid #ccc";
  div.style.marginRight = "8px";
  div.style.display = "inline-block";
  return div;
}

//メニューバー生成
function injectMenuBar() {
  if (document.getElementById("notion-menu-bar")) return;

  // URLを確認して、marketplace/にいる場合はボタン非表示
  if (location.href.includes("https://www.notion.so/marketplace")) return;

  //テキストの色のアイコン
  const textColorMap = {
    normal_text: "#000000",
    gray_text: " #787878",
    brown_text: "rgb(158, 110, 76)",
    orange_text: "#FFA500",
    yellow_text: "rgb(221, 192, 27)",
    green_text: "rgb(55, 141, 55)",
    blue_text: "	#4169E1",
    purple_text: "#a184db",
    pink_text: "#FF69B4",
    red_text: "#FF0000",
  };

  // 背景色のアイコン
  const bgColorMap = {
    normal: "#FFFFFF",
    gray: "#E0E0E0",
    brown: "#eee6e2",
    orange: "#FFDAB9",
    yellow: "#FFFF00",
    green: "#90EE90",
    blue: "#ADD8E6",
    purple: "#DDA0DD",
    pink: "#FFC0CB",
    red: "#FFB6C1",
  };

  //メニューバーの生成
  const menuBar = document.createElement("div");
  menuBar.id = "notion-menu-bar";
  document.body.appendChild(menuBar);

  blockGroups.forEach((group) => {
    const section = document.createElement("div");
    section.className = "menu-section";

    const title = document.createElement("div");
    title.className = "menu-title";
    title.innerText = group.group;
    section.appendChild(title);

    const list = document.createElement("div");
    list.className = "submenu";
    list.__anchor = title;

    group.blocks.forEach((b) => {
      const btn = document.createElement("button");
      btn.innerText = b.label;
      btn.className = "submenu-item";

      //アイコン　色
      if (textColorMap[b.type]) {
        btn.prepend(createColorIcon(textColorMap[b.type]));
      } else if (bgColorMap[b.type]) {
        btn.prepend(createColorIcon(bgColorMap[b.type]));
      }

      if (!b.supported) btn.classList.add("disabled"); //無効表示
      else {
        btn.onclick = () => {
          updateSelectBlockId(); //カーソル位置を再取得
          const pageId = extractPageId(window.location.href);

          // ブロック追加の確認
          chrome.runtime.sendMessage(
            {
              action: "appendBlock",
              type: b.type,
              pageId,
              afterBlockId: SelectBlockId,
            },
            (res) => {
              if (res.errorType === "token") {
                showErrorModal(`
                  <p>ページにインテグレーションが接続されていない、または拡張機能がインテグレーショントークンと正しく設定されていないため、ブロックを追加できませんでした。</p>
                  <p>設定内容を確認してください。<br>接続方法がわからない場合は、以下の「Notion接続ガイド」をご覧ください。</p>
                  <a href="https://private-1215.github.io/homepage/" target="_blank">Notion接続ガイド</a>
                `);
              } else if (res.errorType === "not_loaded") {
                showErrorModal(`
                  <p>ブロックを追加できませんでした。</p>
                  <p>原因として、ページの読み込みが完了していない、または追加したい行を選択していない可能性があります。</p>
                  <p>ページをリロードした直後は読み込みに数秒かかる場合があります。少し待ってから再度お試しください。</p>
                  <p>また、ブロックを追加したい位置の行を選択してから実行してください。</p>
                  <p>※列ブロックを選択している場合、Notion APIの仕様上ブロックを追加できません。</p>              
                `);
              }
            }
          );
        };
      }
      list.appendChild(btn);
    });

    title.onclick = (e) => {
      e.stopPropagation();
      toggleMenu(list);
    };

    section.appendChild(list);
    menuBar.appendChild(section);
  });

  document.addEventListener("click", closeAllMenus);
  window.addEventListener("resize", repositionOpenMenus);
  window.addEventListener("scroll", repositionOpenMenus, false);
}

function toggleMenu(list) {
  if (!document.body.contains(list)) document.body.appendChild(list);
  // サブメニュー表示/非表示
  document.querySelectorAll(".submenu.open").forEach((s) => {
    if (s !== list) closeMenu(s);
  });

  if (list.classList.contains("open")) closeMenu(list);
  else openMenu(list);
}

function closeMenu(list) {
  //他の場所をクリックしたらメニューを閉じる
  list.classList.remove("open");
  list.style.top = "";
  list.style.left = "";
  list.style.maxHeight = "";
  list.style.visibility = "";
}

function closeAllMenus() {
  document.querySelectorAll(".submenu.open").forEach(closeMenu);
}

//メニューの開閉・位置計算
function openMenu(list) {
  list.style.visibility = "hidden";
  list.classList.add("open");
  list.style.maxHeight = "none";

  const rect = list.__anchor.getBoundingClientRect();
  const menuW = list.offsetWidth;
  const menuH = list.offsetHeight;
  const padding = 8;
  const availBelow = window.innerHeight - rect.bottom - padding;
  const availAbove = rect.top - padding;

  let top,
    maxHeightValue = null;
  if (menuH <= availBelow) top = rect.bottom;
  else if (menuH <= availAbove) top = rect.top - menuH;
  else {
    if (availBelow >= availAbove) {
      top = rect.bottom;
      maxHeightValue = Math.max(40, availBelow);
    } else {
      maxHeightValue = Math.max(40, availAbove);
      top = rect.top - maxHeightValue;
    }
  }

  let left = rect.left;
  if (left + menuW + padding > window.innerWidth)
    left = Math.max(padding, window.innerWidth - menuW - padding);
  if (left < padding) left = padding;

  list.style.top = `${Math.round(top)}px`;
  list.style.left = `${Math.round(left)}px`;
  if (maxHeightValue) list.style.maxHeight = `${Math.round(maxHeightValue)}px`;
  list.style.visibility = "";
}

//開いている全メニューに対してopenMenuを呼んで位置を再計算
function repositionOpenMenus() {
  document.querySelectorAll(".submenu.open").forEach(openMenu); //画面外クリックで閉じる
}

injectMenuBar();
