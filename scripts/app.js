import { generateNameList } from "./dom.js";
import { getLocalStorage, saveToStorage } from "./storage.js";


generateNameList()


const addNameBtn = document.getElementById("addNameBtn")
const addNameInputField = document.getElementById("addNameInputField")
const randomPersonBtn = document.getElementById("randomPersonBtn")
const amoutOfGroupsInputField = document.getElementById("amoutOfGroupsInputField")
const groupSizeInputField = document.getElementById("groupSizeInputField")
const getRandmonGroupBtn = document.getElementById("getRandmonGroupBtn")
const bodyId = document.getElementById("bodyId")
const nameSection = document.createElement("section")
nameSection.className = "bg-[#5f8ca0] w-[75vw] p-4 rounded-2xl"
bodyId.appendChild(nameSection)

addNameBtn.addEventListener("click", () => {
    let newName = addNameInputField.value
    if (newName != "") {
        saveToStorage(newName)
        generateNameList()
    }
    addNameInputField.value = ""

    nameSection.innerHTML=""
})

randomPersonBtn.addEventListener("click", () => {
    let nameList = getLocalStorage()

    if (nameList != 0) {
        alert("Totally Random Person: " + nameList[Math.floor(Math.random() * nameList.length)])
    }
})

getRandmonGroupBtn.addEventListener("click", () => {
    let nameList = getLocalStorage()
    //making the array equal to itself, but for it to be sorted.
    // The sort will use the random method to assign the elements a value and shuffle them based on it
    nameList = [...nameList].sort(() => Math.random() - .5)

    let groupAmount = amoutOfGroupsInputField.value
    let groupSize = groupSizeInputField.value
    let lengthOfNames = nameList.length
    groupSize = parseInt(groupSize)
    groupAmount = parseInt(groupAmount)


    let groups = []
    let index = 0
    nameSection.innerHTML = ""


    if (!isNaN(groupSize) && !isNaN(groupAmount)) {
        alert("Choose one or the other. Amount of Groups or Group Size")
    }
    if (isNaN(groupSize) && isNaN(groupAmount)) {
        alert("Please enter a value for amount of groups and group size")
    }


    if (groupSize > 0 && isNaN(groupAmount)) {
        groupSizeInputField.value = ""
        let remainder = lengthOfNames % groupSize
        let limit = lengthOfNames / groupSize
        console.log(remainder)

        for (let i = 0; i < limit; i++) {
            if (i == limit - 1 || nameList.slice(index, index + groupSize).length == 1) {

                groups[i - 1].push(nameList[nameList.length - 1])

            }
            else {
                groups.push(nameList.slice(index, index + groupSize))
                index += groupSize
            }

        }
        groups.forEach((element, index) => {
            let parentDiv = document.createElement("div")
            parentDiv.className = "flex bg-[#000000a4] rounded-2xl mt-4 ps-8 pe-8 place-items-baseline justify-between"
            nameSection.appendChild(parentDiv)


            let nameText = document.createElement("p")
            nameText.innerText = "Group#" + (index + 1) + " " + element.join(" | ");
            parentDiv.appendChild(nameText)
        });
    }
    else if (groupAmount > 0 && isNaN(groupSize)) {
        amoutOfGroupsInputField.value = ""
        for (let i = 0; i < groupAmount; i++) {
            groups[i] = []
        }
        nameList.forEach((element, index) => {
            groups[index % groupAmount].push(element)
        });
        groups.forEach((element, index) => {
            let parentDiv = document.createElement("div")
            parentDiv.className = "flex bg-[#000000a4] rounded-2xl mt-4 ps-8 pe-8 place-items-baseline justify-between"
            nameSection.appendChild(parentDiv)


            let nameText = document.createElement("p")
            nameText.innerText = "Group#" + (index + 1) + " " + element.join(" | ");
            parentDiv.appendChild(nameText)
        });
    }
    console.log(groups)

    /*
    
    If condition (Remainder ===1)

    variable is equal to the spread last group

    */
})