let dict = [];

fetch("https://script.google.com/macros/s/AKfycbyXPD_rDUW_Lh0UeXAcKvtY2uoEbJl86m3JcKFkHE9Un8SlobNJMz0xqjbATw9-9dFg-w/exec")
  .then(res => res.json())
  .then(data => {
    dict = data;
    console.log("loaded:", dict);
  });

document.getElementById("search").addEventListener("input", searchWord);

function searchWord() {
  const input = document.getElementById("search").value.trim();
  const area = document.getElementById("result");

  if (!input) {
    area.innerHTML = "";
    return;
  }

  const results = dict.filter(x => {
    const km = x.km_form || "";
    const jp = x.jp_gloss || "";
    return km.includes(input) || jp.includes(input);
  });

  area.innerHTML = "";

  if (results.length === 0) {
    area.innerHTML = "見つかりません";
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
