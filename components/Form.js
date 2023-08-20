export default class Form {
  constructor(inputSelector) {
    this._inputs = document.querySelectorAll(inputSelector);
  }

  _togglePlaceholderToLabel(evt) {
    const label = evt.target
      .closest(".recipient__label")
      .querySelector(".recipient__text");
    if (
      evt.target.value !== "" &&
      !label.classList.contains("recipient__text_visible")
    ) {
      label.classList.add("recipient__text_visible");
    } else if (evt.target.value === "") {
      label.classList.remove("recipient__text_visible");
    }
  }

  setEventListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener(
        "input",
        this._togglePlaceholderToLabel.bind(this)
      );
    });
  }
}
