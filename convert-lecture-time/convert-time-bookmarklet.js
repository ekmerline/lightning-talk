javascript:(()=>{    
    function replaceStr(str){
        const regex1 = /(1:)|(2:)|(3:)|(4:)|(5:)|(6:)|(7:)|(8:)|(9:)|(10:)|(11:)|(12:)/g;
        const currentNum = str.slice(str.search(regex1), str.indexOf(":"));
        if(currentNum === "12"){
            str = str.replace(currentNum, "11");
            str = str.replace("p", "a");
        }else if(currentNum === "1"){
            str = str.replace(currentNum, "12");
        }else{
            const newNum = parseInt(currentNum) - 1;
            str = str.replace(currentNum, newNum);
        }
        return str;
    }
    for(let elem of document.querySelectorAll(".small")){
        const elemText = elem.textContent;
        const commaInd = elemText.indexOf(",");
        let endStr = elemText.slice(commaInd+2);
        const dashInd = endStr.indexOf("–");
        if(dashInd > -1){
            const endStr1 = endStr.slice(0, dashInd);
            const endStr2 = endStr.slice(dashInd);
            endStr = replaceStr(endStr1) + replaceStr(endStr2);
        }else {
            endStr = replaceStr(endStr);
        }
        elem.appendChild(document.createTextNode(`(${endStr})`));
    } 
})();