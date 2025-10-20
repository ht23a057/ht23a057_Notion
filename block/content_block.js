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
      { label: "ページ", type: "child_page", supported: false },
      { label: "コールアウト", type: "callout", supported: true },
      { label: "引用", type: "quote", supported: true },
      { label: "テーブル", type: "table", supported: false },
      { label: "区切り線", type: "divider", supported: true },
      { label: "ページリンク", type: "unsupported", supported: false },
    ],
  },
  {
    group: "Notion AI",
    blocks: [
      { label: "続きを書く", type: "unsupported", supported: false },
      { label: "翻訳言語", type: "unsupported", supported: false },
      { label: "質問する", type: "unsupported", supported: false },
      {
        label: "このページについて質問する",
        type: "unsupported",
        supported: false,
      },
      { label: "短くする", type: "unsupported", supported: false },
      { label: "その他", type: "unsupported", supported: false },
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
    group: "データベース",
    blocks: [
      { label: "テーブルビュー", type: "child_database", supported: false },
      { label: "ボードビュー", type: "child_database", supported: false },
      { label: "ギャラリービュー", type: "child_database", supported: false },
      { label: "リストビュー", type: "child_database", supported: false },
      { label: "フィードビュー", type: "child_database", supported: false },
      { label: "カレンダービュー", type: "child_database", supported: false },
      { label: "タイムラインビュー", type: "child_database", supported: false },
      { label: "縦棒グラフ", type: "child_database", supported: false },
      { label: "横棒グラフ", type: "child_database", supported: false },
      { label: "線グラフ", type: "child_database", supported: false },
      { label: "ドーナツグラフ", type: "child_database", supported: false },
      { label: "フォーム", type: "child_database", supported: false },
      {
        label: "データベース：インライン",
        type: "child_database",
        supported: false,
      },
      {
        label: "データベース：フルページ",
        type: "child_database",
        supported: false,
      },
      {
        label: "データベースのリンクドビュー",
        type: "child_database",
        supported: false,
      },
    ],
  },
  {
    group: "応用",
    blocks: [
      { label: "目次", type: "table_of_contents", supported: true },
      { label: "式ブロック", type: "equation", supported: true },
      { label: "ボタン", type: "unsupported", supported: false },
      { label: "階層リンク", type: "breadcrumb", supported: true },
      { label: "同期ブロック", type: "synced_block", supported: true },
      { label: "トグル見出し1", type: "heading_1_toggle", supported: true },
      { label: "トグル見出し2", type: "heading_2_toggle", supported: true },
      { label: "トグル見出し3", type: "heading_3_toggle", supported: true },
      { label: "2列", type: "column_list", supported: false },
      { label: "3列", type: "column_list", supported: false },
      { label: "4列", type: "column_list", supported: false },
      { label: "5列", type: "column_list", supported: false },
      { label: "コード：Mermaid", type: "code_Mermaid", supported: true },
      { label: "AIブロック", type: "unsupported", supported: false },
      { label: "AIミーティングノート", type: "unsupported", supported: false },
    ],
  },
  {
    group: "インライン埋め込み",
    blocks: [
      { label: "ユーザーをメンション", type: "unsupported", supported: false },
      { label: "ページをメンション", type: "unsupported", supported: false },
      {
        label: "日付またはリマインダー",
        type: "unsupported",
        supported: false,
      },
      { label: "絵文字", type: "unsupported", supported: false },
      { label: "インライン式", type: "unsupported", supported: false },
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
    group: "インポート",
    blocks: [
      { label: "CSV", type: "unsupported", supported: false },
      { label: "HTML", type: "unsupported", supported: false },
      {
        label: "テキストとマークダウン",
        type: "unsupported",
        supported: false,
      },
      { label: "Asana", type: "unsupported", supported: false },
      { label: "Confluence", type: "unsupported", supported: false },
      { label: "Googleドキュメント", type: "unsupported", supported: false },
      { label: "Trello", type: "unsupported", supported: false },
      { label: "Dropbox Paper", type: "unsupported", supported: false },
      { label: "Evernote", type: "unsupported", supported: false },
      { label: "Workflowy", type: "unsupported", supported: false },
      { label: "Word", type: "unsupported", supported: false },
      { label: "Monday", type: "unsupported", supported: false },
      { label: "Quip", type: "unsupported", supported: false },
      { label: "Zip", type: "unsupported", supported: false },
      { label: "PDF", type: "unsupported", supported: false },
    ],
  },
  {
    group: "ブロックタイプの変換",
    blocks: [
      { label: "テキスト", type: "paragraph", supported: true },
      { label: "見出し1", type: "heading_1", supported: true },
      { label: "見出し2", type: "heading_2", supported: true },
      { label: "見出し3", type: "heading_3", supported: true },
      { label: "ページ", type: "child_page", supported: false },
      { label: "ページとして移動", type: "unsupported", supported: false },
      { label: "箇条書きリスト", type: "bulleted_list_item", supported: true },
      { label: "番号付きリスト", type: "numbered_list_item", supported: true },
      { label: "ToDoリスト", type: "to_do", supported: true },
      { label: "トグルリスト", type: "toggle", supported: true },
      { label: "コード", type: "code", supported: true },
      { label: "引用", type: "quote", supported: true },
      { label: "コールアウト", type: "callout", supported: true },
      { label: "式ブロック", type: "equation", supported: true },
      { label: "同期ブロック", type: "synced_block", supported: true },
      { label: "トグル見出し1", type: "heading_1", supported: true },
      { label: "トグル見出し2", type: "heading_2", supported: true },
      { label: "トグル見出し3", type: "heading_3", supported: true },
      { label: "2列", type: "column_list", supported: false },
      { label: "3列", type: "column_list", supported: false },
      { label: "4列", type: "column_list", supported: false },
      { label: "5列", type: "column_list", supported: false },
    ],
  },
  {
    group: "アクション",
    blocks: [
      {
        label: "ブロックへのリンクをコピー",
        type: "unsupported",
        supported: false,
      },
      { label: "複製", type: "unsupported", supported: false },
      { label: "別ページへ移動", type: "unsupported", supported: false },
      { label: "削除", type: "unsupported", supported: false },
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

//メニューバー生成
function injectMenuBar() {
  if (document.getElementById("notion-menu-bar")) return;

  //DOMの生成
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

      if (!b.supported) btn.classList.add("disabled"); //無効表示
      else {
        btn.onclick = () => {
          const pageId = extractPageId(window.location.href);
          if (!pageId) return console.error("ページIDを取得できませんでした");

          // ブロック追加の確認
          chrome.runtime.sendMessage(
            { action: "appendBlock", type: b.type, pageId },
            (res) => {
              if (!res) return console.error("backgroundからのレスポンスなし");
              if (!res.success) console.error(res.error);
              else console.log("ブロック追加成功", res.data);
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
