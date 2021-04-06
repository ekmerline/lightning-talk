// ==UserScript==
// @name        Convert Hackbright Time
// @match       https://fellowship.hackbrightacademy.com/
// @match       https://fellowship.hackbrightacademy.com/lectures/
// @match       https://fellowship.hackbrightacademy.com/exercises/
// @grant       none
// @version     1.0
// @author      ekmerline
// @description Converts time to local time for Hackbright
// ==/UserScript==


let timeDiff = -1;

const retrieveTimeDiff = () => {
    //localStorage.removeItem('timeDiff');
    const data = localStorage.getItem('timeDiff');
    if(data !== null){
        timeDiff = Number(data);
    }
}

const promptNewUserTime = () => {
    const newTimeDiff = prompt("What's your time difference?", timeDiff);
    if(!isNaN(Number(newTimeDiff))){
        timeDiff = newTimeDiff;
        localStorage.setItem('timeDiff', timeDiff);
    }else {
        alert(`Not a valid time difference! The time difference will stay: ${timeDiff}`);
    }
}

const changeTimeButton = () => {
    const timeButton = document.createElement('button');
    timeButton.innerText = 'Time Diff';
    timeButton.addEventListener('click', promptNewUserTime);
    //timeButton.style.cssFloat = 'right';
    const navBar = document.querySelector('#bs-example-navbar-collapse-1');
    navBar.appendChild(timeButton);
}

const convertTime = str => {
    const regex1 = /(1:)|(2:)|(3:)|(4:)|(5:)|(6:)|(7:)|(8:)|(9:)|(10:)|(11:)|(12:)/g;
    const currentNum = parseInt(str.slice(str.search(regex1), str.indexOf(":")));
    let convertNum = currentNum;
    if(convertNum < 9){
        convertNum += 12;
    }
    let newNum = convertNum + timeDiff;
    if(newNum < 12){
        str = str.replace(currentNum, newNum);
        str = str.replace("p", "a");
    }else if(newNum === 12) {
        str = str.replace(currentNum, newNum);
        str = str.replace("a", "p");
    }else {
        newNum -= 12;
        str = str.replace(currentNum, newNum);
        str = str.replace("a", "p");
    }
    return str;
}

const checkPageTypeAndUpdate = () => {
    if(document.URL === 'https://fellowship.hackbrightacademy.com/'){
        updateTimeTextMainPage();
    }else {
        updateTimeTextOtherPages();
    }
}

const updateTimeTextMainPage = () => {
    for(const elem of document.querySelectorAll(".small")){
        const elemText = elem.textContent;
        const commaInd = elemText.indexOf(",");
        let endStr = elemText.slice(commaInd+2);
        const dashInd = endStr.indexOf("–");
        if(dashInd > -1){
            const endStr1 = endStr.slice(0, dashInd);
            const endStr2 = endStr.slice(dashInd);
            endStr = convertTime(endStr1) + convertTime(endStr2);
        }else {
            endStr = convertTime(endStr);
        }
        const timePara = document.createElement('p');
        timePara.appendChild(document.createTextNode(`(${endStr})`));
        elem.appendChild(timePara);
    } 
}

const updateTimeTextOtherPages = () => {
    for(const elem of document.querySelectorAll("td.hidden-xs.hidden-sm")){
        const elemText = elem.textContent;
        const endStr = convertTime(elemText);
        const timePara = document.createElement('p');
        timePara.appendChild(document.createTextNode(`(${endStr})`));
        elem.appendChild(timePara);
    } 
}

retrieveTimeDiff();
changeTimeButton();
checkPageTypeAndUpdate();