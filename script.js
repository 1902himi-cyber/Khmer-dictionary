let dict = [];

fetch("＜https://script.google.com/macros/s/AKfycbyj9zZcXfIOaIm8wqiUdH9H1NjJfHsuWWFQjqq6e8C98dX1yh91Zz0TIm6W9rN61D3Ncg/exec＞")
  .then(res => res.json())
  .then(data => dict = data);

document.getElementById("search").addEventListener("input", searchWord);

function searchWord() {
  const input = document.getElementById("search").value.trim();
  const area = document.getElementById("result");

  if (!input) {
    area.innerHTML = "";
    return;
  }

  const results = dict.filter(x =>
    (x.km_form && x.km_form.includes(input)) ||
    (x.jp_gloss && x.jp_gloss.includes(input))
  );

  area.innerHTML = "";

  if (results.length === 0) {
    area.innerHTML = "見つかりません";
    return;
  }

  results.forEach(r => {
    const div = document.createElement("div");
    div.className = "card";

    const examples = (r.example_km || "")
      .split("___")
      .map(x => `<div>${x}</div>`)
      .join("");

    div.innerHTML = `
<div class="km">${r.km_form || ""}</div>
<div>${r.jp_gloss || ""}</div>
<div>${r.ipa || ""}</div>
<div>${r.pos || ""}</div>
<div>${r.km_def || ""}</div>
<div>${examples}</div>
    `;

    area.appendChild(div);
  });
}
