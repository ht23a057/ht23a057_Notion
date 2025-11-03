export function getNotionToken() {
    return new Promise((resolve) => {
      chrome.storage.local.get("NOTION_TOKEN", (data) => {
        resolve(data.NOTION_TOKEN);
      });
    });
  }
  