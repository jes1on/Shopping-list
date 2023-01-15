const tobuyInput = document.querySelector(".tobuy-input");
const tobuyButton = document.querySelector(".tobuy-button");
const tobuyList = document.querySelector(".tobuy-list");
const filterOption = document.querySelector(".filter-tobuy");

document.addEventListener("DOMContentLoaded", getLocalTobuys);
tobuyButton.addEventListener("click", addTobuy);
tobuyList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTobuy);

function addTobuy(event) {
    event.preventDefault();
    const tobuyDiv = document.createElement("div");
    tobuyDiv.classList.add("tobuy");
    const newTobuy = document.createElement("li");
    newTobuy.innerText = tobuyInput.value;
    newTobuy.classList.add("tobuy-item");
    tobuyDiv.appendChild(newTobuy);
    
    //Adding to local storage
    saveLocalTobuys(tobuyInput.value);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
    completedButton.classList.add("completed-btn");
    tobuyDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    tobuyDiv.appendChild(trashButton);

    tobuyList.appendChild(tobuyDiv);
    tobuyInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;

    if (item.classList[0] === "trash-btn"){
        const tobuy = item.parentElement;
        tobuy.classList.add("slide");

        removeLocalTobuys(tobuy);
        tobuy.addEventListener("transitionend", function(){
            tobuy.remove();
        });
    }

    if(item.classList[0] === "completed-btn") {
        const tobuy = item.parentElement;
        tobuy.classList.toggle("bought");
    }
}

function filterTobuy(e) {
    const tobuys = tobuyList.childNodes;
    tobuys.forEach(function(tobuy){
        switch(e.target.value) {
            case "all":
                tobuy.style.display = "flex";
                break;
            case "bought":
                if(tobuy.classList.contains("bought")){
                    tobuy.style.display = "flex";
                } else {
                    tobuy.style.display = "none";
                }
                break;
            case "to buy":
                if(!tobuy.classList.contains("bought")){
                    tobuy.style.display = "flex";
                } else {
                    tobuy.style.display = "none";
                }
                break;                
        }
    });
}

function saveLocalTobuys(tobuy) {
    let tobuys;
    if(localStorage.getItem("tobuys") === null) {
        tobuys = [];
    } else {
        tobuys = JSON.parse(localStorage.getItem("tobuys"));
    }
    tobuys.push(tobuy);
    localStorage.setItem("tobuys", JSON.stringify(tobuys));
}

function getLocalTobuys() {
    let tobuys;
    if(localStorage.getItem("tobuys") === null) {
        tobuys = [];
    } else {
        tobuys = JSON.parse(localStorage.getItem("tobuys"))
    }
    tobuys.forEach(function(tobuy){
        const tobuyDiv = document.createElement("div");
        tobuyDiv.classList.add("tobuy");
        const newTobuy = document.createElement("li");
        newTobuy.innerText = tobuy;
        newTobuy.classList.add("tobuy-item");
        tobuyDiv.appendChild(newTobuy);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
        completedButton.classList.add("completed-btn");
        tobuyDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></li>';
        trashButton.classList.add("trash-btn");
        tobuyDiv.appendChild(trashButton);

        tobuyList.appendChild(tobuyDiv);
    });
}

function removeLocalTobuys(tobuy) {
    let tobuys;
    if(localStorage.getItem("tobuys") === null) {
        tobuys = [];
    } else {
        tobuys = JSON.parse(localStorage.getItem("tobuys"));
    }

    const tobuyIndex = tobuy.children[0].innerText;
    tobuys.splice(tobuys.indexOf(tobuyIndex), 1);
    localStorage.setItem("tobuys", JSON.stringify(tobuys));
}