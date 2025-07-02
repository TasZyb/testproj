window.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".header__burger");
  const nav = document.querySelector(".header__nav");
  const contactButton = document.querySelector(".header__contact-button");

  burger.addEventListener("click", () => {
    nav.classList.toggle("active");
    contactButton.classList.toggle("active");
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !burger.contains(event.target)) {
      nav.classList.remove("active");
      contactButton.classList.remove("active");
    }
  });

  function isInRanges(width, ranges) {
    return ranges.some(({ min, max }) => width >= min && width < max);
    }

function moveCounterOutOfGoodsText() {
  const width = window.innerWidth;
  
  // Діапазони, коли треба виносити назовні
  const moveOutRanges = [
    { min: 100, max: 520 },
    { min: 768, max: 1300 },
    // можна додати інші, наприклад { min: 400, max: 520 }
  ];

  const shouldMove = isInRanges(width, moveOutRanges);
  const goodsList = document.querySelectorAll(".checkout__goods");

  goodsList.forEach((goods) => {
    const goodsText = goods.querySelector(".checkout__goods-text");
    const counter = goods.querySelector(".checkout__counter");

    if (!goodsText || !counter) return;

    if (shouldMove) {
      // Виносимо .checkout__counter з .checkout__goods-text у .checkout__goods
      if (counter.parentNode === goodsText) {
        goodsText.removeChild(counter);
        goods.appendChild(counter);
      }
    } else {
      // Повертаємо .checkout__counter назад у .checkout__goods-text
      if (counter.parentNode === goods) {
        goods.removeChild(counter);
        goodsText.appendChild(counter);
      }
    }
  });
}




  function handleResize() {
    const isMobile = window.innerWidth < 768;
    const checkout__total = document.querySelector(".checkout__total");
    const checkout__info = document.querySelector(".checkout__info");
    const checkout__buttons = document.querySelector(".checkout__buttons");
    const checkout__result = document.querySelector(".checkout__result");

    if (isMobile) {
      if (!checkout__info.contains(checkout__total)) {
        checkout__info.appendChild(checkout__total);
      }
      if (!checkout__info.contains(checkout__buttons)) {
        checkout__info.appendChild(checkout__buttons);
      }
    } else {
      if (!checkout__result.contains(checkout__total)) {
        checkout__result.appendChild(checkout__total);
      }
      if (!checkout__result.contains(checkout__buttons)) {
        checkout__result.appendChild(checkout__buttons);
      }
    }

    moveCounterOutOfGoodsText();
  }

  handleResize();
  window.addEventListener("resize", handleResize);
});
