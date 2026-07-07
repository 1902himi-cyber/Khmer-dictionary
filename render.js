function highlight(text, keyword) {

  if (!text || !keyword) return text;

  return text.replaceAll(
    keyword,
    `<mark>${keyword}</mark>`
  );

}

function createWordCard(r, keyword) {

  const div = document.createElement("div");

  div.className = "card";

  const examples = (r.example_km || "")
    .split("___")
    .map(x => x.trim())
    .filter(x => x)
    .map(x => `<div class="example">${x}</div>`)
    .join("");

  div.innerHTML = `
    <div class="km">
      ${highlight(r.km_form || "", keyword)}
    </div>

    <div class="jp">
      ${highlight(r.jp_gloss || "", keyword)}
    </div>

    <div><b>品詞：</b>${r.pos}</div>

    <div><b>IPA：</b>${r.ipa}</div>

    <div>${r.km_def}</div>

    ${examples}
  `;

  return div;

}

function renderResults(results, keyword){

    const area=document.getElementById("result");

    area.innerHTML="";

    results.forEach(r=>{

        area.appendChild(createWordCard(r, keyword));

    });

}
