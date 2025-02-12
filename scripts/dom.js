import { getLocalStorage, removeFromFavorites } from "./storage.js"

const groupSection = document.createElement("section")
const bodyId = document.getElementById("bodyId")


const nameSection = document.createElement("section")
nameSection.className = "bg-[#5f8ca0] w-[75vw] p-4 rounded-2xl"
bodyId.appendChild(nameSection)



const generateNameList = () =>{
    nameSection.innerHTML = ""

    let namesList = getLocalStorage()

    if( namesList!=0){
        namesList.forEach((element,index) => {
            let parentDiv = document.createElement("div")
            parentDiv.id = index + "ParentDiv"
            parentDiv.className = "flex bg-[#000000a4] rounded-2xl mt-4 ps-8 pe-8 place-items-baseline justify-between"
            nameSection.appendChild(parentDiv)
    
            let nameText= document.createElement("p")
            nameText.innerText=element;
            parentDiv.appendChild(nameText)
    
            let deleteButton = document.createElement("button")
            deleteButton.type = "button"
            deleteButton.id = index+ "delete" + element
            deleteButton.className = "ms-2 p-2 border-1 text-black rounded-lg bg-red-300 hover:bg-red-600"
            deleteButton.innerText = "Delete"
    
            parentDiv.appendChild(deleteButton)
    
    
            deleteButton.addEventListener("click", () => {
                removeFromFavorites(index);
                generateNameList()
            })
    
        });
    }

}

export {generateNameList}