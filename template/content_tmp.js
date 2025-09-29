function injectTemplateButton() {
    if (document.getElementById("notion-template-btn")) return;
  
    const btn = document.createElement("button");
    btn.id = "notion-template-btn";
    btn.innerText = "テンプレート挿入";
    document.body.appendChild(btn);
  
    btn.onclick = () => {
      const modal = document.createElement("div");
      modal.id = "notion-template-modal";
  
      const templates = [
        {
          label: "よく利用しているテンプレート",
          type: "paragraph",
          extra: { text: "よく使う内容" },
        },
        {
          label: "シンプルなテンプレート",
          type: "paragraph",
          extra: { text: "シンプル内容" },
        },
      ];
  
      templates.forEach((t) => {
        const tbtn = document.createElement("button");
        tbtn.innerText = t.label;
        tbtn.onclick = () => {
          chrome.runtime.sendMessage({
            action: "addTemplate",
            pageId: extractPageId(window.location.href),
            blockType: t.type,
            extra: t.extra,
          });
          document.body.removeChild(modal);
        };
        modal.appendChild(tbtn);
      });
  
      const close = document.createElement("button");
      close.innerText = "閉じる";
      close.onclick = () => document.body.removeChild(modal);
      modal.appendChild(close);
  
      document.body.appendChild(modal);
    };
  }
  
  injectTemplateButton();
  