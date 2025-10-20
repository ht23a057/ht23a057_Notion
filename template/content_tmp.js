(async () => {
  // 仮テンプレートデータ（画像追加）
  const template1 = [
    {
      type: "paragraph",
      paragraph: {
        rich_text: [{ text: { content: "シンプルテンプレート1" } }],
      },
    },
    { image: "https://via.placeholder.com/100?text=Simple1" },
  ];
  const template2 = [
    {
      type: "paragraph",
      paragraph: {
        rich_text: [{ text: { content: "よく利用テンプレート1" } }],
      },
    },
    { image: "https://via.placeholder.com/100?text=Frequent1" },
  ];

  const templates = {
    simple: [template1, template1, template1, template1, template1],
    frequent: [template2, template2, template2, template2, template2],
  };

  // ボタン注入
  const observer = new MutationObserver(() => {
    if (!document.getElementById("notion-template-btn") && document.body) {
      injectTemplateButton();
    }
  });
  observer.observe(document.body || document.documentElement, {
    childList: true,
    subtree: true,
  });

  function injectTemplateButton() {
    const btn = document.createElement("button");
    btn.id = "notion-template-btn";
    btn.innerText = "テンプレート挿入";
    document.body.appendChild(btn);
    btn.onclick = () => openTemplateModal();
  }

  // テンプレート一覧モーダル
  function openTemplateModal() {
    const modal = createModal("テンプレート一覧");

    Object.entries(templates).forEach(([category, list]) => {
      const catTitle = document.createElement("h4");
      catTitle.innerText =
        category === "simple"
          ? "シンプルなテンプレート"
          : "よく利用しているテンプレート";
      modal.appendChild(catTitle);

      const container = document.createElement("div");
      container.className = "template-scroll-container";

      let currentIndex = 0;
      const render = () => {
        container.innerHTML = "";

        const leftBtn = document.createElement("button");
        leftBtn.className = "scroll-btn";
        leftBtn.innerText = "←";
        leftBtn.onclick = () => {
          currentIndex = (currentIndex - 1 + list.length) % list.length;
          render();
        };
        container.appendChild(leftBtn);

        const tmpl = list[currentIndex];
        const tbtn = document.createElement("div");
        tbtn.className = "template-card";
        tbtn.onclick = () => openTemplatePreviewModal(tmpl, catTitle.innerText);

        // 画像
        if (tmpl[1]?.image) {
          const img = document.createElement("img");
          img.src = tmpl[1].image;
          img.alt = `テンプレート${currentIndex + 1}`;
          img.className = "template-thumb";
          tbtn.appendChild(img);
        }

        // ラベル
        const label = document.createElement("p");
        label.innerText = `テンプレート ${currentIndex + 1}`;
        tbtn.appendChild(label);

        container.appendChild(tbtn);

        const rightBtn = document.createElement("button");
        rightBtn.className = "scroll-btn";
        rightBtn.innerText = "→";
        rightBtn.onclick = () => {
          currentIndex = (currentIndex + 1) % list.length;
          render();
        };
        container.appendChild(rightBtn);
      };
      render();
      modal.appendChild(container);
    });

    const closeBtn = document.createElement("button");
    closeBtn.id = "template-close-btn";
    closeBtn.innerText = "閉じる";
    closeBtn.onclick = () => document.body.removeChild(modal);
    modal.appendChild(closeBtn);

    document.body.appendChild(modal);
  }

  // プレビューモーダル
  function openTemplatePreviewModal(template, categoryLabel) {
    const modal = createModal(`${categoryLabel} プレビュー`);

    template.forEach((block) => {
      if (block.type === "paragraph") {
        const p = document.createElement("p");
        p.innerText = block.paragraph.rich_text[0].text.content;
        modal.appendChild(p);
      }
      if (block.image) {
        const img = document.createElement("img");
        img.src = block.image;
        img.className = "template-thumb-large";
        modal.appendChild(img);
      }
    });

    const insertBtn = document.createElement("button");
    insertBtn.className = "template-insert-btn";
    insertBtn.innerText = "このテンプレートを挿入";
    insertBtn.onclick = () => {
      console.log("テンプレート挿入", template);
      document.body.removeChild(modal);
    };
    modal.appendChild(insertBtn);

    const backBtn = document.createElement("button");
    backBtn.className = "template-option-btn";
    backBtn.innerText = "戻る";
    backBtn.onclick = () => {
      document.body.removeChild(modal);
      openTemplateModal();
    };
    modal.appendChild(backBtn);

    document.body.appendChild(modal);
  }

  function createModal(titleText) {
    const modal = document.createElement("div");
    modal.id = "notion-template-modal";
    const title = document.createElement("h3");
    title.innerText = titleText;
    modal.appendChild(title);
    return modal;
  }
})();
