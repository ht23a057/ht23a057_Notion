const tokenInput = document.getElementById("token");
const saveBtn = document.getElementById("saveBtn");

// 保存処理
saveBtn.addEventListener("click", () => {
  const token = tokenInput.value.trim();
  if (!token) return alert("Notionトークンを入力してください");

  // ローカルに保存
  chrome.storage.local.set({ NOTION_TOKEN: token }, () => {
    alert("保存しました！");
  });
});

// 初期値を読み込み
chrome.storage.local.get(["NOTION_TOKEN"], (data) => {
  if (data.NOTION_TOKEN) tokenInput.value = data.NOTION_TOKEN;
});
