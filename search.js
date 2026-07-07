function searchWord(){

    const input=document.getElementById("search").value.trim();

    const count=document.getElementById("count");

    if(input===""){

        document.getElementById("result").innerHTML="";

        count.textContent="";

        return;

    }

    const results=dict.filter(item=>{

        const km=item.km_form||"";

        const jp=item.jp_gloss||"";

        return km.includes(input)||jp.includes(input);

    });

    results.sort((a,b)=>{

        const aKm=a.km_form||"";
        const bKm=b.km_form||"";

        const aJp=a.jp_gloss||"";
        const bJp=b.jp_gloss||"";

        if(aKm===input||aJp===input){
            if(!(bKm===input||bJp===input)) return -1;
        }

        if(bKm===input||bJp===input){
            if(!(aKm===input||aJp===input)) return 1;
        }

        return 0;

    });

    count.textContent=`検索結果：${results.length}件`;

    if(results.length===0){

        document.getElementById("result").innerHTML="見つかりません";

        return;

    }

    renderResults(results, input);

}
