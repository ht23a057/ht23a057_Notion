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
        { label: "ページ", type: "child_page", supported: true },
        { label: "コールアウト", type: "callout", supported: true },
        { label: "引用", type: "quote", supported: true },
        { label: "テーブル", type: "table", supported: true },
        { label: "区切り線", type: "divider", supported: true },
        { label: "ページリンク", type: "unsupported", supported: true },
      ],
    },
    {
      group: "Notion AI",
      blocks: [
        { label: "続きを書く", type: "unsupported", supported: true },
        { label: "翻訳言語", type: "unsupported", supported: true },
        { label: "質問する", type: "unsupported", supported: true },
        {
          label: "このページについて質問する",
          type: "unsupported",
          supported: true,
        },
        { label: "短くする", type: "unsupported", supported: true },
        { label: "その他", type: "unsupported", supported: true },
      ],
    },
    {
      group: "メディア",
      blocks: [
        { label: "画像", type: "image", supported: true },
        { label: "動画", type: "video", supported: true },
        { label: "オーディオ", type: "audio", supported: true },
        { label: "コード", type: "code", supported: true },
        { label: "ファイル", type: "file", supported: true },
        { label: "Webブックマーク", type: "bookmark", supported: true },
      ],
    },
    {
      group: "データベース",
      blocks: [
        { label: "テーブルビュー", type: "child_database", supported: true },
        { label: "ボードビュー", type: "child_database", supported: true },
        { label: "ギャラリービュー", type: "child_database", supported: true },
        { label: "リストビュー", type: "child_database", supported: true },
        { label: "フィードビュー", type: "child_database", supported: true },
        { label: "カレンダービュー", type: "child_database", supported: true },
        { label: "タイムラインビュー", type: "child_database", supported: true },
        { label: "縦棒グラフ", type: "child_database", supported: true },
        { label: "横棒グラフ", type: "child_database", supported: true },
        { label: "線グラフ", type: "child_database", supported: true },
        { label: "ドーナツグラフ", type: "child_database", supported: true },
        { label: "フォーム", type: "child_database", supported: true },
        {
          label: "データベース：インライン",
          type: "child_database",
          supported: true,
        },
        {
          label: "データベース：フルページ",
          type: "child_database",
          supported: true,
        },
        {
          label: "データベースのリンクドビュー",
          type: "child_database",
          supported: true,
        },
      ],
    },
    {
      group: "応用",
      blocks: [
        { label: "目次", type: "table_of_contents", supported: true },
        { label: "式ブロック", type: "equation", supported: true },
        { label: "ボタン", type: "unsupported", supported: true },
        { label: "階層リンク", type: "breadcrumb", supported: true },
        { label: "同期ブロック", type: "synced_block", supported: true },
        { label: "トグル見出し1", type: "heading_1", supported: true },
        { label: "トグル見出し2", type: "heading_2", supported: true },
        { label: "トグル見出し3", type: "heading_3", supported: true },
        { label: "2列", type: "column_list", supported: true },
        { label: "3列", type: "column_list", supported: true },
        { label: "4列", type: "column_list", supported: true },
        { label: "5列", type: "column_list", supported: true },
        { label: "コード：Mermaid", type: "code", supported: true },
        { label: "AIブロック", type: "unsupported", supported: true },
        { label: "AIミーティングノート", type: "unsupported", supported: true },
      ],
    },
    {
      group: "インライン埋め込み",
      blocks: [
        { label: "ユーザーをメンション", type: "unsupported", supported: true },
        { label: "ページをメンション", type: "unsupported", supported: true },
        {
          label: "日付またはリマインダー",
          type: "unsupported",
          supported: true,
        },
        { label: "絵文字", type: "unsupported", supported: true },
        { label: "インライン式", type: "unsupported", supported: true },
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
        { label: "PDF", type: "pdf", supported: true },
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
      group: "同期データベース",
      blocks: [
        { label: "GitLab", type: "unsupported", supported: true },
        { label: "Jira", type: "unsupported", supported: true },
        { label: "GitHub", type: "unsupported", supported: true },
        { label: "Asana", type: "unsupported", supported: true },
        { label: "Jira Sync", type: "unsupported", supported: true },
      ],
    },
    {
      group: "インポート",
      blocks: [
        { label: "CSV", type: "unsupported", supported: true },
        { label: "HTML", type: "unsupported", supported: true },
        {
          label: "テキストとマークダウン",
          type: "unsupported",
          supported: true,
        },
        { label: "Asana", type: "unsupported", supported: true },
        { label: "Confluence", type: "unsupported", supported: true },
        { label: "Googleドキュメント", type: "unsupported", supported: true },
        { label: "Trello", type: "unsupported", supported: true },
        { label: "Dropbox Paper", type: "unsupported", supported: true },
        { label: "Evernote", type: "unsupported", supported: true },
        { label: "Workflowy", type: "unsupported", supported: true },
        { label: "Word", type: "unsupported", supported: true },
        { label: "Monday", type: "unsupported", supported: true },
        { label: "Quip", type: "unsupported", supported: true },
        { label: "Zip", type: "unsupported", supported: true },
        { label: "PDF", type: "unsupported", supported: true },
      ],
    },
    {
      group: "ブロックタイプの変換",
      blocks: [
        { label: "テキスト", type: "paragraph", supported: true },
        { label: "見出し1", type: "heading_1", supported: true },
        { label: "見出し2", type: "heading_2", supported: true },
        { label: "見出し3", type: "heading_3", supported: true },
        { label: "ページ", type: "child_page", supported: true },
        { label: "ページとして移動", type: "unsupported", supported: true },
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
        { label: "2列", type: "column_list", supported: true },
        { label: "3列", type: "column_list", supported: true },
        { label: "4列", type: "column_list", supported: true },
        { label: "5列", type: "column_list", supported: true },
      ],
    },
    {
      group: "アクション",
      blocks: [
        {
          label: "ブロックへのリンクをコピー",
          type: "unsupported",
          supported: true,
        },
        { label: "複製", type: "unsupported", supported: true },
        { label: "別ページへ移動", type: "unsupported", supported: true },
        { label: "削除", type: "unsupported", supported: true },
      ],
    },
    {
      group: "テキストの色",
      blocks: [
        { label: "既定のテキスト", type: "unsupported", supported: true },
        { label: "灰色のテキスト", type: "unsupported", supported: true },
        { label: "茶色のテキスト", type: "unsupported", supported: true },
        { label: "オレンジ色のテキスト", type: "unsupported", supported: true },
        { label: "黄色のテキスト", type: "unsupported", supported: true },
        { label: "緑色のテキスト", type: "unsupported", supported: true },
        { label: "青色のテキスト", type: "unsupported", supported: true },
        { label: "紫色のテキスト", type: "unsupported", supported: true },
        { label: "ピンク色のテキスト", type: "unsupported", supported: true },
        { label: "赤色のテキスト", type: "unsupported", supported: true },
      ],
    },
    {
      group: "背景色",
      blocks: [
        { label: "背景色なし", type: "unsupported", supported: true },
        { label: "背景色：グレー", type: "unsupported", supported: true },
        { label: "背景色：ブラウン", type: "unsupported", supported: true },
        { label: "背景色：オレンジ", type: "unsupported", supported: true },
        { label: "背景色：黄色", type: "unsupported", supported: true },
        { label: "背景色：緑", type: "unsupported", supported: true },
        { label: "背景色：青", type: "unsupported", supported: true },
        { label: "背景色：紫", type: "unsupported", supported: true },
        { label: "背景色：ピンク", type: "unsupported", supported: true },
        { label: "背景色：赤", type: "unsupported", supported: true },
      ],
    },
  ];
  
  function injectMenuBar() {
    if (document.getElementById("notion-menu-bar")) return;
  
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
  
      // anchor を保持（後で再配置するときに使う）
      list.__anchor = title;
  
      group.blocks.forEach((b) => {
        const btn = document.createElement("button");
        btn.innerText = b.label;
        btn.className = "submenu-item";
        if (!b.supported) {
          btn.disabled = true;
          btn.classList.add("disabled");
        } else {
          btn.onclick = () => {
            const block = createBlock(b.type);
            if (!block) return;
            chrome.runtime.sendMessage(
              { action: "appendBlock", block },
              (res) => {
                if (!res.success) console.error(res.error);
              }
            );
          };
        }
        list.appendChild(btn);
      });
  
      // クリックで開閉（位置調整付き）
      title.onclick = (e) => {
        e.stopPropagation();
  
        // body に移動して fixed ベースで配置する（既にあればOK）
        if (!document.body.contains(list)) {
          document.body.appendChild(list);
        }
  
        // 他を閉じる
        document.querySelectorAll(".submenu.open").forEach((s) => {
          if (s !== list) {
            s.classList.remove("open");
            s.style.top = "";
            s.style.left = "";
            s.style.maxHeight = "";
            s.style.visibility = "";
          }
        });
  
        // 既に open なら閉じる
        if (list.classList.contains("open")) {
          list.classList.remove("open");
          list.style.top = "";
          list.style.left = "";
          list.style.maxHeight = "";
          list.style.visibility = "";
          return;
        }
  
        // 一旦非表示で開いてサイズを測る
        list.style.visibility = "hidden";
        list.classList.add("open");
        list.style.maxHeight = "none"; // まずフルサイズを取得
  
        // 強制レンダリングしてサイズ取得
        const menuW = list.offsetWidth;
        const menuH = list.offsetHeight;
        const rect = title.getBoundingClientRect();
        const padding = 8; // 端ギリギリを避ける余白
  
        const availBelow = window.innerHeight - rect.bottom - padding;
        const availAbove = rect.top - padding;
  
        // 縦位置（優先は下）。全部入らなければ max-height を設定。
        let top;
        let maxHeightValue = null;
  
        if (menuH <= availBelow) {
          // 下に全部入る
          top = rect.bottom;
        } else if (menuH <= availAbove) {
          // 上に全部入る
          top = rect.top - menuH;
        } else {
          // どちらにも全部は入らない -> スペースが多い方に寄せて max-height を設定
          if (availBelow >= availAbove) {
            top = rect.bottom;
            maxHeightValue = Math.max(40, availBelow);
          } else {
            maxHeightValue = Math.max(40, availAbove);
            top = rect.top - maxHeightValue;
          }
        }
  
        // 横位置（右にはみ出す場合は左に寄せる）
        let left = rect.left;
        if (left + menuW + padding > window.innerWidth) {
          left = Math.max(padding, window.innerWidth - menuW - padding);
        }
        if (left < padding) left = padding;
  
        // 適用
        list.style.top = `${Math.round(top)}px`;
        list.style.left = `${Math.round(left)}px`;
        if (maxHeightValue)
          list.style.maxHeight = `${Math.round(maxHeightValue)}px`;
        else list.style.maxHeight = "";
  
        // 表示
        list.style.visibility = "";
      };
  
      section.appendChild(list);
      menuBar.appendChild(section);
    });
  
    // 画面クリックで閉じる
    document.addEventListener("click", () => {
      document.querySelectorAll(".submenu.open").forEach((s) => {
        s.classList.remove("open");
        s.style.top = "";
        s.style.left = "";
        s.style.maxHeight = "";
        s.style.visibility = "";
      });
    });
  
    // 開いているメニューをリサイズ・スクロール時に再配置する
    function repositionOpenMenus() {
      document.querySelectorAll(".submenu.open").forEach((list) => {
        const title = list.__anchor;
        if (!title) return;
  
        // 非表示でサイズ測定（表示済みなので offsetWidth/Height は実寸）
        list.style.visibility = "hidden";
        list.style.maxHeight = "none";
        const menuW = list.offsetWidth;
        const menuH = list.offsetHeight;
        const rect = title.getBoundingClientRect();
        const padding = 8;
        const availBelow = window.innerHeight - rect.bottom - padding;
        const availAbove = rect.top - padding;
  
        let top;
        let maxHeightValue = null;
  
        if (menuH <= availBelow) {
          top = rect.bottom;
        } else if (menuH <= availAbove) {
          top = rect.top - menuH;
        } else {
          if (availBelow >= availAbove) {
            top = rect.bottom;
            maxHeightValue = Math.max(40, availBelow);
          } else {
            maxHeightValue = Math.max(40, availAbove);
            top = rect.top - maxHeightValue;
          }
        }
  
        let left = rect.left;
        if (left + menuW + padding > window.innerWidth) {
          left = Math.max(padding, window.innerWidth - menuW - padding);
        }
        if (left < padding) left = padding;
  
        list.style.top = `${Math.round(top)}px`;
        list.style.left = `${Math.round(left)}px`;
        if (maxHeightValue)
          list.style.maxHeight = `${Math.round(maxHeightValue)}px`;
        else list.style.maxHeight = "";
        list.style.visibility = "";
      });
    }
  
    window.addEventListener("resize", repositionOpenMenus);
    window.addEventListener("scroll", repositionOpenMenus, true); // true でキャプチャ、内包スクロールにも反応
  }
  
  function createBlock(type) {
    return { type };
  }
  
  injectMenuBar();
  