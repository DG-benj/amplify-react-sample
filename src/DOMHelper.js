export function toggleButtonColor(ele) {
    if(isButtonClicked(ele)) {
        ele.classList.remove("btn-clicked");
    } else {
        ele.classList.add("btn-clicked");
    }
}

export function isButtonClicked(ele) {
    return ele.classList.contains("btn-clicked");
}