function createWordCard(r) {

  const div = document.createElement("div");

  div.className = "card";

  const examples = (r.example_km || "")
    .split("___")
    .map(x => x.trim())
    .filter(x => x)
    .map(x => `<div class="example">${x}</div>`)
    .join("");

  div.innerHTML = `
    <div class="km">${r.km_form}</div>

    <div class="jp">${r.jp_gloss}</div>

    <div><b>品詞：</b>${r.pos}</div>

    <div><b>IPA：</b>${r.ipa}</div>

    <div>${r.km_def}</div>

    ${examples}
  `;

  return div;

}

function renderResults(results){

    const area=document.getElementById("result");

    area.innerHTML="";

    results.forEach(r=>{

        area.appendChild(createWordCard(r));

    });

}
