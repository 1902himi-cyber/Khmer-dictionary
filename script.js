let dict = [];

fetch("https://script.google.com/macros/s/AKfycbyXPD_rDUW_Lh0UeXAcKvtY2uoEbJl86m3JcKFkHE9Un8SlobNJMz0xqjbATw9-9dFg-w/exec")
  .then(res => res.json())
.then(data => {
    dict = data;
    console.log(dict[0]);
});

document.getElementById("search").addEventListener("input", searchWord);

function searchWord() {
  const input = document.getElementById("search").value.trim();
  const area = document.getElementById("result");

  if (!input) {
  document.getElementById("count").textContent = "";
  area.innerHTML = "";
  return;
  }

  const results = dict.filter(x => {
    const km = x.km_form || "";
    const jp = x.jp_gloss || "";
    return km.includes(input) || jp.includes(input);
  });

results.sort((a, b) => {
  const aKm = a.km_form || "";
  const bKm = b.km_form || "";
  const aJp = a.jp_gloss || "";
  const bJp = b.jp_gloss || "";

  // 完全一致
  const aExact =
    aKm === input || aJp === input;
  const bExact =
    bKm === input || bJp === input;

  if (aExact && !bExact) return -1;
  if (!aExact && bExact) return 1;

  // 前方一致
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
  
  area.innerHTML = "";

  if (results.length === 0) {
  document.getElementById("count").textContent = "0件";
  area.innerHTML = "見つかりません";
  document.getElementById("count").textContent =
  `検索結果：${results.length}件`;
  return;
  }

  results.forEach(r => {
    const div = document.createElement("div");
    div.style.border = "1px solid #ccc";
    div.style.margin = "10px";
    div.style.padding = "10px";

    const examples = (r.example_km || "")
      .split("___")
      .map(x => `<div>${x}</div>`)
      .join("");

    div.innerHTML = `
<div style="font-size:20px;font-weight:bold;">${r.km_form || ""}</div>
<div>${r.jp_gloss || ""}</div>
<div>${r.ipa || ""}</div>
<div>${r.pos || ""}</div>
<div>${r.km_def || ""}</div>
<div>${examples}</div>
    `;

    area.appendChild(div);
  });
}
