window.addEventListener("DOMContentLoaded", () => {
  const path = document.getElementById("road");
  const svg = document.getElementById("scene");
  const wrapper = svg.parentElement; // .svg-wrapper
  const container = document.querySelector(".work__area");
  const circle = document.querySelector(".work__circle");
  const buttons = document.querySelectorAll(".work__area button");

  const duration = 13000;
  const pathLength = path.getTotalLength();

  const containerRect = container.getBoundingClientRect();
  const wrapperRect = wrapper.getBoundingClientRect();

  const offsetX = wrapperRect.left - containerRect.left;
  const offsetY = wrapperRect.top - containerRect.top;

  const positions = [0.01, 0.18, 0.28, 0.343, 0.48];

  // Розташування кнопок по шляху (статично)
  buttons.forEach((btn, i) => {
    const pos = Math.min(positions[i], 0.9999);
    const point = path.getPointAtLength(pathLength * pos);

    const rawX = point.x + offsetX;
    const rawY = point.y + offsetY;

    const buttonWidth = btn.offsetWidth || 100;
    const buttonHeight = btn.offsetHeight || 40;
    const clampedX = Math.max(buttonWidth * 0.5, Math.min(rawX, container.clientWidth - buttonWidth * 0.5));
    const clampedY = Math.max(buttonHeight * 0.5, Math.min(rawY, container.clientHeight - buttonHeight * 0.5));

    btn.style.left = `${clampedX}px`;
    btn.style.top = `${clampedY}px`;
  });

  function animateCircle(initialTime) {
  let startTime = initialTime;
  let isPaused = false;
  let pauseStart = 0;
  const pauseDuration = 2000; // 2 секунди пауза

  function step(currentTime) {
    if (isPaused) {
      // Чекаємо поки пауза завершиться
      if (currentTime - pauseStart >= pauseDuration) {
        // Закінчилась пауза — починаємо новий цикл
        isPaused = false;
        startTime = currentTime;
      } else {
        // Пауза триває — кружечок не рухається
        requestAnimationFrame(step);
        return;
      }
    }

    let elapsed = currentTime - startTime;
    const maxProgress = 0.48;
    const maxDuration = duration * maxProgress;

    if (elapsed > maxDuration) {
      // Починаємо паузу
      isPaused = true;
      pauseStart = currentTime;
      elapsed = maxDuration; // зафіксувати позицію в кінці шляху
    }

    const progress = elapsed / duration;
    const limitedProgress = Math.min(progress, maxProgress);
    const point = path.getPointAtLength(pathLength * limitedProgress);

    const rawX = point.x + offsetX;
    const rawY = point.y + offsetY;

    const circleSize = circle.offsetWidth || 20;

    const clampedX = Math.max(circleSize * 0.5, Math.min(rawX, container.clientWidth - circleSize * 0.5));
    const clampedY = Math.max(circleSize * 0.5, Math.min(rawY, container.clientHeight - circleSize * 0.5));

    circle.style.left = `${clampedX}px`;
    circle.style.top = `${clampedY}px`;
    circle.style.transform = "translate(-50%, -50%)";

    // Підсвічування кнопок
    const threshold = 0.03;
    buttons.forEach((btn, i) => {
      const btnPos = positions[i];
      if (Math.abs(limitedProgress - btnPos) < threshold) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
  }



  animateCircle(performance.now());
});
