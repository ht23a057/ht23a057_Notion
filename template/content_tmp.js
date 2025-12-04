(async () => {
  // お気に入りデータ取得/保存
  async function getFavorites() {
    return new Promise((resolve) => {
      chrome.storage.local.get("favorites", (data) => {
        resolve(data.favorites || []);
      });
    });
  }
  //テンプレートが重複しないように
  async function saveFavorites(favorites) {
    const uniqueFavorites = favorites.filter(
      (fav, i, arr) => i === arr.findIndex((f) => f.url === fav.url)
    );
    return new Promise((resolve) => {
      chrome.storage.local.set({ favorites: uniqueFavorites }, resolve);
    });
  }

  //サムネ画像取得
  async function getTemplateThumbnail(maxRetry = 5) {
    for (let attempt = 0; attempt < maxRetry; attempt++) {
      const imgs = [...document.querySelectorAll("img")].filter((img) =>
        img.src.includes("notion-static.com/template/")
      );

      if (imgs.length > 0) return imgs[0].src;

      await new Promise((r) => setTimeout(r, 1000));
    }
    return "";
  }

  //お気に入りに登録用ボタンの作成
  async function injectFavoriteButton() {
    if (!location.href.includes("/marketplace/templates/")) return; // /templates/ を含むURLのみでボタン生成
    if (document.getElementById("single-fav-btn")) return; // 重複防止

    const coverUrl = await getTemplateThumbnail();

    const favorites = await getFavorites();
    const currentUrl = location.href;
    const isFav = favorites.some((f) => f.url === currentUrl);

    const favBtn = document.createElement("button");
    favBtn.id = "single-fav-btn";
    favBtn.innerText = isFav ? "お気に入りから削除" : "お気に入りに登録";
    document.body.appendChild(favBtn);

    favBtn.onclick = async () => {
      let updatedFavorites = await getFavorites();
      const index = updatedFavorites.findIndex((f) => f.url === currentUrl);

      if (index >= 0) {
        updatedFavorites.splice(index, 1);
        favBtn.innerText = "お気に入りに登録";
      } else {
        const cleanTitle = document.title
          .replace(/\|?Notion\s*テンプレート/g, "") // 日本語版
          .replace(/\|\s*Notion\s*Template/g, "") // 英語版
          .replace(/‐\s*Notion.*/g, "") // "– Notion" パターン対応
          .trim();
        updatedFavorites.push({
          url: currentUrl,
          name: cleanTitle,
          coverUrl: coverUrl,
        });
        favBtn.innerText = "お気に入りから削除";
      }

      await saveFavorites(updatedFavorites);
    };

    document.body.appendChild(favBtn);
  }

  // モーダル作成
  function createModal(titleText) {
    const modalOverlay = document.createElement("div");
    modalOverlay.id = "notion-template-modal-overlay";

    const modal = document.createElement("div");
    modal.id = "notion-template-modal";

    const title = document.createElement("h3");
    title.innerText = titleText;
    modal.appendChild(title);

    const closeBtn = document.createElement("button");
    closeBtn.id = "template-close-btn";
    closeBtn.innerText = "閉じる";
    closeBtn.onclick = () => {
      document.body.removeChild(modalOverlay);
      document.body.style.overflow = "";
    };
    modal.appendChild(closeBtn);

    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);
    document.body.style.overflow = "hidden";

    return modal;
  }

  // モーダルでお気に入り一覧を表示
  async function openTemplateModal() {
    const modal = createModal("お気に入りテンプレート");
    const favorites = await getFavorites();

    const container = document.createElement("div");
    container.className = "template-scroll-container";

    favorites.forEach((tmpl) => {
      const card = document.createElement("div");
      card.className = "template-card";

      if (tmpl.coverUrl) {
        const img = document.createElement("img");
        img.src = tmpl.coverUrl;
        card.appendChild(img);
      }

      const label = document.createElement("p");
      label.innerText = tmpl.name;
      card.appendChild(label);
      //削除ボタン　追加
      const removeBtn = document.createElement("button");
      removeBtn.innerText = "削除";
      removeBtn.style.backgroundColor = "#dbb8b9";
      removeBtn.style.marginTop = "5px";
      removeBtn.style.fontSize = "12px";
      removeBtn.onclick = async (e) => {
        e.stopPropagation(); // カードクリックでページ遷移させない
        const updatedFavorites = (await getFavorites()).filter(
          (f) => f.url !== tmpl.url
        );
        await saveFavorites(updatedFavorites);
        container.removeChild(card); // モーダルから削除
      };
      card.appendChild(removeBtn);

      card.onclick = () => {
        if (tmpl.url) window.location.href = tmpl.url;
      };
      container.appendChild(card);
    });
    modal.appendChild(container);
  }

  // テンプレート挿入ボタン
  function injectTemplateButton() {
    if (document.getElementById("notion-template-btn")) return;
    if (location.href.includes("/marketplace/templates/")) return;

    const btn = document.createElement("button");
    btn.id = "notion-template-btn";
    btn.innerText = "お気に入り一覧";
    btn.onclick = openTemplateModal;

    document.body.appendChild(btn);
  }

  // 初期化
  injectFavoriteButton();
  injectTemplateButton();

  const observer = new MutationObserver(() => {
    injectFavoriteButton();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
