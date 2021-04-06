//Very basic bookmarklet
javascript:alert('Hello World!');

//basic template
javascript:(()=>{  
    //code goes here
})();
//or
javascript:(function(){  
    //code goes here
})();


//version one

javascript:(()=>{  
    document.querySelectorAll('a').forEach(link => {
        link.style.color = 'purple';
    })
})();


//after correcting for CSS, which has color marked as important

javascript:(()=>{  
    document.querySelectorAll('a').forEach(link => {
        link.style.setProperty("color", "purple", "important");
    })
})();
