window.onload = async function(){

    await loadDictionary();

    document
      .getElementById("search")
      .addEventListener("input",searchWord);

};
