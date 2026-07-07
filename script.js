window.onload = async function () {

    alert("① script.js 開始");

    await loadDictionary();

    alert("② 辞書件数：" + dict.length);

    document
      .getElementById("search")
      .addEventListener("input", searchWord);

    alert("③ 準備完了");
};
