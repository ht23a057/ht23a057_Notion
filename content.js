(function () {
    if (document.getElementById("menu-bar")) return;
  
    // コンテナ作成
    const container = document.createElement("div");
    container.id = "menu-container";
  
    // 左右スクロールボタン作成
    const btnLeft = document.createElement("button");
    btnLeft.id = "btn-left";
    btnLeft.textContent = "◀";
  
    const btnRight = document.createElement("button");
    btnRight.id = "btn-right";
    btnRight.textContent = "▶";
  
    // メニューバー作成
    const menuBar = document.createElement("div");
    menuBar.id = "menu-bar";
    document.body.appendChild(menuBar);
  
    //基本
    const Menu1 = document.createElement("div");
    Menu1.className = "menu";
    Menu1.textContent = "基本";
    //サブメニュー
    const Sub1 = document.createElement("div");
    Sub1.className = "sub";
    Sub1.innerHTML = `
      <div class="text">テキスト</div>
      <div class="heading1">見出し1</div>
      <div class="heading2">見出し2</div>
      <div class="heading3">見出し3</div>
      <div class="list1">箇条書きリスト</div>
      <div class="list2">番号付きリスト</div>
      <div class="list3">ToDoリスト</div>
      <div class="list4">トグルリスト</div>
      <div class="page">ページ</div>
      <div class="out">コールアウト</div>
      <div class="quotation">引用</div>
      <div id="table">テーブル</div>
      <div id="line">区切り線</div>
      <div id="link1">ページリンク</div>
    `;
    Menu1.appendChild(Sub1);
    menuBar.appendChild(Menu1);
  
    //Notion AI
    const Menu2 = document.createElement("div");
    Menu2.className = "menu";
    Menu2.textContent = "Notion AI";
    //サブメニュー
    const Sub2 = document.createElement("div");
    Sub2.className = "sub";
    Sub2.innerHTML = `
      <div id="write">続きを書く</div>
      <div id="language">翻訳言語</div>
      <div id="question1">質問する</div>
      <div id="question2">このページについて質問する</div>
      <div id="short">短くする</div>
      <div id="others">その他</div>
    `;
    Menu2.appendChild(Sub2);
    menuBar.appendChild(Menu2);
  
    //メディア
    const Menu3 = document.createElement("div");
    Menu3.className = "menu";
    Menu3.textContent = "メディア";
    //サブメニュー
    const Sub3 = document.createElement("div");
    Sub3.className = "sub";
    Sub3.innerHTML = `
      <div id="image">画像</div>
      <div id="movie">動画</div>
      <div id="audio">オーディオ</div>
      <div class="code1">コード</div>
      <div id="file">ファイル</div>
      <div id="mark">Webブックマーク</div>
    `;
    Menu3.appendChild(Sub3);
    menuBar.appendChild(Menu3);
  
    //データベース
    const Menu4 = document.createElement("div");
    Menu4.className = "menu";
    Menu4.textContent = "データベース";
    //サブメニュー
    const Sub4 = document.createElement("div");
    Sub4.className = "sub";
    Sub4.innerHTML = `
      <div id="view1">テーブルビュー</div>
      <div id="view2">ボードビュー</div>
      <div id="view3">ギャラリービュー</div>
      <div id="view4">リストビュー</div>
      <div id="view5">フィードビュー</div>
      <div id="view6">カレンダービュー</div>
      <div id="view7">タイムラインビュー</div>
      <div id="graph1">縦棒グラフ</div>
      <div id="graph2">横棒グラフ</div>
      <div id="graph3">線グラフ</div>
      <div id="graph4">ドーナツグラフ</div>
      <div id="form">フォーム</div>
      <div id="database1">データベース：インライン</div>
      <div id="database2">データベース：フルページ</div>
      <div id="database3">データベースのリンクドビュー</div>
    `;
    Menu4.appendChild(Sub4);
    menuBar.appendChild(Menu4);
  
    //応用
    const Menu5 = document.createElement("div");
    Menu5.className = "menu";
    Menu5.textContent = "応用";
    //サブメニュー
    const Sub5 = document.createElement("div");
    Sub5.className = "sub";
    Sub5.innerHTML = `
      <div id="table">目次</div>
      <div class="block1">式ブロック</div>
      <div id="button">ボタン</div>
      <div id="link2">階層リンク</div>
      <div class="block2">同期ブロック</div>
      <div class="toggle1">トグル見出し1</div>
      <div class="toggle2">トグル見出し2</div>
      <div class="toggle3">トグル見出し3</div>
      <div class="column2">2列</div>
      <div class="column3">3列</div>
      <div class="column4">4列</div>
      <div class="column5">5列</div>
      <div id="code2">コード：Mermaid</div>
      <div id="block3">AIブロック</div>
      <div id="note">AIミーティングノート</div>
    `;
    Menu5.appendChild(Sub5);
    menuBar.appendChild(Menu5);
  
    //埋め込み
    const Menu6 = document.createElement("div");
    Menu6.className = "menu";
    Menu6.textContent = "埋め込み";
    //サブメニュー
    const Sub6 = document.createElement("div");
    Sub6.className = "sub";
    Sub6.innerHTML = `
      <div id="embedded">埋め込み</div>
      <div id="Google Drive">Google Drive</div>
      <div id="tweet">ツイート</div>
      <div id="GitHub Gist">GitHub Gist</div>
      <div id="map">Googleマップ</div>
      <div id="Figma">Figma</div>
      <div id="Abstract">Abstract</div>
      <div id="Invision">Invision</div>
          <div id="Mixpanel">Mixpanel</div>
          <div id="Framer">Framer</div>
          <div id="Whimsical">Whimsical</div>
          <div id="Miro">Miro</div>
          <div id="Sketch">Sketch</div>
          <div id="Excalidraw">Excalidraw</div>
          <div id="PDF">PDF</div>
          <div id="Loom">Loom</div>
          <div id="Typeform">Typeform</div>
          <div id="Codepen">Codepen</div>
          <div id="Replit">Replit</div>
          <div id="Hex">Hex</div>
          <div id="Deepnote">Deepnote</div>
          <div id="GitLab">GitLab</div>
          <div id="Jira">Jira</div>
          <div id="Trello">Trello</div>
          <div id="GitHub">GitHub</div>
          <div id="Asana">Asana</div>
          <div id="Slack">Slack</div>
          <div id="Pitch">Pitch</div>
          <div id="Dropbox">Dropbox</div>
          <div id="Zoom">Zoom</div>
          <div id="OneDrive">OneDrive</div>
          <div id="Amplitude">Amplitude</div>
          <div id="Claap">Claap</div>
          <div id="Box">Box</div>
          <div id="Linear">Linear</div>
          <div id="Lucidchart">Lucidchart</div>
          <div id="Lucidspark">Lucidspark</div>
          <div id="Eraser">Eraser</div>
          <div id="PagerDuty">PagerDuty</div>
          <div id="ClickUp">ClickUp</div>
          <div id="Adobe XD">Adobe XD</div>
          <div id="Plus">Plus</div>
          <div id="Dovetail">Dovetail</div>
          <div id="Streak Share">Streak Share</div>
          <div id="Shortcut">Shortcut</div>
          <div id="SendOwl">SendOwl</div>
          <div id="Amplitude">Amplitude-EU</div>
          <div id="Zendesk">Zendesk</div>
          <div id="Jira">Jira preview(Data center)</div>
          <div id="Google Contacts">Google Contacts</div>
          <div id="Discord">Discord</div>
          <div id="Microsoft Contacts">Microsoft Contacts</div>
    `;
    Menu6.appendChild(Sub6);
    menuBar.appendChild(Menu6);
  
    // //同期データベース
    // const Menu7 = document.createElement("div");
    // Menu7.className = "menu";
    // Menu7.textContent = "同期データベース";
    // //サブメニュー
    // const Sub7 = document.createElement("div");
    // Sub7.className = "sub";
    // Sub7.innerHTML = `
    //   <div id="GitLab">GitLab</div>
    //   <div id="Jira">Jira</div>
    //   <div id="GitHub"><GitHub</div>
    //   <div id="Asana">Asana</div>
    //   <div id="Jira Sync"><Jira Sync</div>
    // `;
    // Menu7.appendChild(Sub7);
    // menuBar.appendChild(Menu7);
  
    //インポート
    const Menu8 = document.createElement("div");
    Menu8.className = "menu";
    Menu8.textContent = "インポート";
    //サブメニュー
    const Sub8 = document.createElement("div");
    Sub8.className = "sub";
    Sub8.innerHTML = `
      <div id="CSV">CSV</div>
          <div id="HTML">HTML</div>
          <div id="text mark">テキストとマークダウン</div>
          <div id="Asana">Asana</div>
          <div id="Confluence">Confluence</div>
          <div id="Googledocument">Googleドキュメント</div>
          <div id="Trello">Trello</div>
          <div id="Dropbox Paper">Dropbox Paper</div>
          <div id="Evernote">Evernote</div>
          <div id="Workfkowy">Workfkowy</div>
          <div id="Word">Word</div>
          <div id="Monday">Monday</div>
          <div id="Quip">Quip</div>
          <div id="Zip">Zip</div>
          <div id="PDF">PDF</div>
    `;
    Menu8.appendChild(Sub8);
    menuBar.appendChild(Menu8);
  
    //ブロックタイプの変換
    const Menu9 = document.createElement("div");
    Menu9.className = "menu";
    Menu9.textContent = "ブロックタイプの変換";
    //サブメニュー
    const Sub9 = document.createElement("div");
    Sub9.className = "sub";
    Sub9.innerHTML = `
      <div class="text">テキスト</div>
      <div class="heading1">見出し1</div>
      <div class="heading2">見出し2</div>
      <div class="heading3">見出し3</div>
      <div class="page1">ページ</div>
      <div id="page2">ページとして移動</div>
      <div class="list1">箇条書きリスト</div>
      <div class="list2">番号付きリスト</div>
      <div class="list3">ToDoリスト</div>
      <div class="list4">トグルリスト</div>
      <div class="code1">コード</div>
      <div class="quotation">引用</div>
      <div class="out">コールアウト</div>
      <div class="block1">式ブロック</div>
      <div class="block2">同期ブロック</div>
      <div class="toggle1">トグル見出し1</div>
      <div class="toggle2">トグル見出し2</div>
      <div class="toggle3">トグル見出し3</div>
      <div class="column2">2列</div>
      <div class="column3">3列</div>
      <div class="column4">4列</div>
      <div class="column5">5列</div>
    `;
    Menu9.appendChild(Sub9);
    menuBar.appendChild(Menu9);
  
    //アクション
    const Menu10 = document.createElement("div");
    Menu10.className = "menu";
    Menu10.textContent = "アクション";
    //サブメニュー
    const Sub10 = document.createElement("div");
    Sub10.className = "sub";
    Sub10.innerHTML = `
      <div id="copy">ブロックへのリンクをコピー</div>
      <div id="reproduction">複製</div>
      <div id="move">別ページへ移動</div>
      <div id="delete">削除</div>
    `;
    Menu10.appendChild(Sub10);
    menuBar.appendChild(Menu10);
  
    //テキストの色
    const Menu11 = document.createElement("div");
    Menu11.className = "menu";
    Menu11.textContent = "テキストの色";
    //サブメニュー
    const Sub11 = document.createElement("div");
    Sub11.className = "sub";
    Sub11.innerHTML = `
          <div id="text1">既定のテキスト</div>
          <div id="text2">灰色のテキスト</div>
          <div id="text3">茶色のテキスト</div>
          <div id="text4">オレンジ色のテキスト</div>
          <div id="text5">黄色のテキスト</div>
          <div id="text6">緑色のテキスト</div>
          <div id="text7">青色のテキスト</div>
          <div id="text8">紫色のテキスト</div>
          <div id="text9">ピンク色のテキスト</div>
          <div id="text10">赤色のテキスト</div>
    `;
    Menu11.appendChild(Sub11);
    menuBar.appendChild(Menu11);
  
    //背景色
    const Menu12 = document.createElement("div");
    Menu12.className = "menu";
    Menu12.textContent = "背景色";
    //サブメニュー
    const Sub12 = document.createElement("div");
    Sub12.className = "sub";
    Sub12.innerHTML = `
          <div id="color1">背景色なし</div>
          <div id="color2">背景色：グレー</div>
          <div id="color3">背景色：ブラウン</div>
          <div id="color4">背景色：オレンジ</div>
          <div id="color5">背景色：黄色</div>
          <div id="color6">背景色：緑</div>
          <div id="color7">背景色：青</div>
          <div id="color8">背景色：紫</div>
          <div id="color9">背景色：ピンク</div>
          <div id="color10">背景色：赤</div>
    `;
    Menu12.appendChild(Sub12);
    menuBar.appendChild(Menu12);
  
    //基本
    // テキスト(text)のイベント
    document.querySelectorAll(".text").forEach((el) => {
      el.addEventListener("click", () => {
        alert("テキストを選びました");
      });
    });
    //見出し1(heading1)のイベント
    document.querySelectorAll(".heading1").forEach((el) => {
      el.addEventListener("click", () => {
        alert("見出し1を選びました");
      });
    });
    //見出し2(heading2)のイベント
    //見出し3(heading3)のイベント
    // 箇条書きリスト(list1)のイベント
    // 番号付きリスト(list2)のイベント
    // ToDoリスト(list3)のイベント
    // トグルリスト(list4)のイベント
    // ページ(page)のイベント
    // コールアウト(out)のイベント
    //引用(quotation)のイベント
    //テーブル(table)のイベント
    //区切り線(line)
    //ページリンク(link1)のイベント
  
    //Notion AI
    //続きを書く(write)のイベント
    //翻訳言語(language)のイベント
    //質問する(question1)のイベント
    //このページについて質問する(question2)
    //短くする(short)のイベント
    //その他(others)のイベント
  
    //メディア
    //画像(image)のイベント
    //動画(movie)のイベント
    //オーディオ(audio)のイベント
    //コード(code1)のイベント
    //ファイル(file)のイベント
    //Webブックマーク(mark)のイベント
  
    //データベース
    //テーブルビュー(view1)
    //ボードビュー(view2)
    //ギャラリービュー(view3)
    //リストビュー(view4)
    //フィードビュー(view5)
    //カレンダービュー(view6)
    //タイムラインビュー(view7)
    //縦棒グラフ(graph1)
    //横棒グラフ(graph2)
    //線グラフ(graph3)
    //ドーナツグラフ(graph4)
    //フォーム(form)
    //データベース：インライン(database1)
    //データベース：フルページ(database2)
    //データベースのリンクドビュー(database3)
  
    //応用
    //目次(table)のイベント
    //式ブロックのイベント
    //ボタン(button)のイベント
    //階層リンク(link2)のイベント
    //同期ブロック(block2)のイベント
    //トグル見出し1(toggle1)のイベント
    //トグル見出し2(toggle2)のイベント
    //トグル見出し3(toggle3)のイベント
    //2列(column2)のイベント
    //3列(column3)のイベント
    //4列(column4)のイベント
    //5列(column5)のイベント
    //コード：Mermaid(code2)のイベント
    //AIブロック(block3)のイベント
    //AIミーティングノート(note)のイベント
  
    // コンテナに追加
    container.appendChild(btnLeft);
    container.appendChild(menuBar);
    container.appendChild(btnRight);
    document.body.appendChild(container);
  
    btnLeft.addEventListener("click", () => {
      menuBar.scrollBy({ left: -150, behavior: "smooth" });
    });
    btnRight.addEventListener("click", () => {
      menuBar.scrollBy({ left: 150, behavior: "smooth" });
    });
  })();
  