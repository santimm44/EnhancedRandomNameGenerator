
const saveToStorage = (name) => {
    let namesList = getLocalStorage();

    namesList.push(name);

    localStorage.setItem("Names", JSON.stringify(namesList))
}
const removeFromFavorites = (indexLocation) => {
    let namesList = getLocalStorage();
    let nameIndex = namesList.find(names => names.id == indexLocation)

    namesList.splice(nameIndex, 1)
    localStorage.setItem("Names", JSON.stringify(namesList))
}
const getLocalStorage = () => {
    let localStorageData = localStorage.getItem("Names");

    if (localStorageData == null) {
        return []
    }
    return JSON.parse(localStorageData);
}

export {getLocalStorage, saveToStorage, removeFromFavorites}