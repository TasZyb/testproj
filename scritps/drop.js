

window.addEventListener("DOMContentLoaded", () => {


    const dropDown = document.querySelector(".ware");
    const dropDownButton = document.querySelector(".header__button");
    dropDownButton.addEventListener("click", () => {
        dropDown.classList.toggle("active");
    });

    document.addEventListener("click", (event) => {
        if (!dropDown.contains(event.target) && !dropDownButton.contains(event.target)) {
            dropDown.classList.remove("active");
        }
    });
})