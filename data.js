let dict = [];

async function loadDictionary() {

  const url = "https://script.google.com/macros/s/AKfycbyXPD_rDUW_Lh0UeXAcKvtY2uoEbJl86m3JcKFkHE9Un8SlobNJMz0xqjbATw9-9dFg-w/exec";

  const response = await fetch(url);

  dict = await response.json();

  console.log("辞書読込完了：" + dict.length + "件");

}
