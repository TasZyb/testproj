document.addEventListener("DOMContentLoaded", () => {
  const formBlocks = document.querySelectorAll(".checkout__island form");
  const phoneInput = document.querySelector("#email");

  const validateText = (input) =>
    /^[А-Яа-яЁёІіЇїЄєҐґ\s'-]{2,}$/.test(input.value.trim());

  const validatePhone = (input) =>
    /^\+380\d{9}$/.test(input.value.trim());

  const showError = (input, message) => {
    clearError(input);
    const error = document.createElement("span");
    error.className = "form-error";
    error.style.color = "red";
    error.style.fontSize = "12px";
    error.textContent = message;
    input.parentNode.appendChild(error);
    input.style.borderColor = "red";
  };

  const clearError = (input) => {
    const existingError = input.parentNode.querySelector(".form-error");
    if (existingError) existingError.remove();
    input.style.borderColor = "#D0D0D0";
  };

  const validateForm = () => {
    let valid = true;

    formBlocks.forEach((form) => {
      const inputs = form.querySelectorAll("input[type='text'], input[type='number']");
      inputs.forEach((input) => {
        clearError(input);
        if (input.id === "email") return;
        if (!validateText(input)) {
          showError(input, "Введіть коректне значення");
          valid = false;
        }
      });
    });

    clearError(phoneInput);
    if (!validatePhone(phoneInput)) {
      showError(phoneInput, "Номер має бути у форматі +380XXXXXXXXX");
      valid = false;
    }

    return valid;
  };

  const collectData = () => {
    const data = {};
    const inputs = document.querySelectorAll(".checkout__island input[type='text'], input[type='number']");
    inputs.forEach((input) => {
      const label = input.closest("label");
      const fieldName = label ? label.textContent.trim().split("\n")[0] : input.id;
      data[fieldName] = input.value.trim();
    });

    // Додаємо метод зв’язку (radio)
    const checkedRadio = document.querySelector('input[name="contact-method"]:checked');
    if (checkedRadio) {
      const methodLabel = checkedRadio.nextElementSibling?.textContent.trim();
      data["Метод зв’язку"] = methodLabel;
    }

    return data;
  };

  const simulateSend = (data) => {
    console.log("📦 Відправка даних...");
    console.log(data);
    setTimeout(() => {
      alert("✅ Дані успішно надіслані!");
      console.log("✅ Дані надіслані успішно:");
      console.table(data);
    }, 1000);
  };

  const confirmButtons = document.querySelectorAll(".checkout__buttons button");
  confirmButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (validateForm()) {
        const data = collectData();
        simulateSend(data);
      }
    });
  });
});
