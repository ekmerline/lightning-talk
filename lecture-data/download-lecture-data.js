javascript:(()=>{    
    const tables = document.querySelectorAll("div.content-well tbody");
    const lectures = [];
    let i = 1;
    function Lecture(week, date, title, link, description, lecturers, resources){
        this.week = week;
        this.date = date;
        this.title = title;
        this.link = link;
        this.description = description;
        this.lecturers = lecturers;
        this.resources = resources;
    }
    for(const table of tables){
        const rows = table.querySelectorAll("tr");
        const week = i;
        let date = new Date();
        for(const row of rows){
            const cols = row.querySelectorAll("td");
            const dateText = cols[0].innerText;
            if(dateText !== ''){
                const dateSplitOne = dateText.split(", ");
                console.log(dateSplitOne[1]);
                const dateArr = dateSplitOne[1].split("/");
                date = new Date(2021, dateArr[0], dateArr[1]);
            }
            const titleElem = cols[2].querySelector("b a");
            const title = titleElem.textContent;
            const link = titleElem.href;
            const description = cols[2].querySelector("div").textContent;
            const lecturersElems = cols[3].querySelectorAll("a img");
            let lecturers = null;
            if(lecturersElems !== null){
                lecturers = [];
                for(const elem of lecturersElems){
                    lecturers.push(elem.title);
                }
            }
            let resources = null;
            const resourceElems = row.querySelectorAll("td.CurriculumTable-resources a");
            if(resourceElems !== null){
                resources = {};
                for(const resource of resourceElems){
                    const resourceType = resource.textContent.trim().toLowerCase();
                    const resourceLink = resource.href;
                    resources[resourceType] = resourceLink;
                }
            }
            const lecture = new Lecture(week, date, title, link, description, lecturers, resources);
            lectures.push(lecture);
        }
        i += 1;
    }
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(lectures))}`;
    const dlAnchorElem = document.createElement("a");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "hackbright-lectures.json");
    dlAnchorElem.click();
    })();