let dict = [];

// ===== 辞書データを取得 =====
fetch("https://script.google.com/macros/s/AKfycbyXPD_rDUW_Lh0UeXAcKvtY2uoEbJl86m3JcKFkHE9Un8SlobNJMz0xqjbATw9-9dFg-w/exec")
  .then(res => res.json())
  .then(data => {
    dict = data;
    console.log("辞書読込完了", dict.length);
  })
  .catch(err => {
    console.error(err);
  });

// ===== 検索イベント =====
document.getElementById("search").addEventListener("input", searchWord);

// =========================
// 単語カードを作る
// =========================
function createWordCard(r) {

  const div = document.createElement("div");
  div.className = "card";

  const examples = (r.example_km || "")
    .split("___")
    .map(x => x.trim())
    .filter(x => x !== "")
    .map(x => `<div class="example">${x}</div>`)
    .join("");

  div.innerHTML = `
    <div class="km">${r.km_form || ""}</div>

    <div class="jp">${r.jp_gloss || ""}</div>

    <div><b>品詞：</b>${r.pos || ""}</div>

    <div><b>IPA：</b>${r.ipa || ""}</div>

    <div style="margin-top:8px;">
      ${r.km_def || ""}
    </div>

    <div style="margin-top:10px;">
      ${examples}
    </div>
  `;

  return div;
}

// =========================
// 検索結果を表示
// =========================
function renderResults(results) {

  const area = document.getElementById("result");

  area.innerHTML = "";

  results.forEach(r => {
    area.appendChild(createWordCard(r));
  });

}

// =========================
// 検索
// =========================
function searchWord() {

  const input = document.getElementById("search").value.trim();

  const count = document.getElementById("count");

  if (input === "") {

    document.getElementById("result").innerHTML = "";

    count.textContent = "";

    return;

  }

  const results = dict.filter(item => {

    const km = item.km_form || "";
    const jp = item.jp_gloss || "";

    return km.includes(input) || jp.includes(input);

  });

  // 完全一致 → 前方一致 → 部分一致
  results.sort((a, b) => {

    const aKm = a.km_form || "";
    const bKm = b.km_form || "";

    const aJp = a.jp_gloss || "";
    const bJp = b.jp_gloss || "";

    const aExact =
      aKm === input || aJp === input;

    const bExact =
      bKm === input || bJp === input;

    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;

    const aStart =
      aKm.startsWith(input) ||
      aJp.startsWith(input);

    const bStart =
      bKm.startsWith(input) ||
      bJp.startsWith(input);

    if (aStart && !bStart) return -1;
    if (!aStart && bStart) return 1;

    return 0;

  });

  count.textContent = `検索結果：${results.length}件`;

  if (results.length === 0) {

    document.getElementById("result").innerHTML = "見つかりません";

    return;

  }

  renderResults(results);

}
