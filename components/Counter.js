export default class Counter {
  constructor(
    counterSelector,
    plusButtonSelector,
    minusButtonSelector,
    inputSelector,
    parent,
    handleCounterChange,
    initialValue,
    maxCount
  ) {
    this._counter = parent.querySelector(counterSelector);
    this._plusButton = this._counter.querySelector(plusButtonSelector);
    this._minusButton = this._counter.querySelector(minusButtonSelector);
    this._input = this._counter.querySelector(inputSelector);
    this._initialValue = initialValue;
    this._maxCount = maxCount;
    this._handleCounterChange = handleCounterChange;
  }

  _checkMinusButtonState() {
    if (+this._input.value === 1) {
      this._minusButton.disabled = true;
    } else {
      this._minusButton.disabled = false;
    }
  }

  _checkPlusButtonState() {
    if (+this._input.value === this._maxCount) {
      this._plusButton.disabled = true;
    } else {
      this._plusButton.disabled = false;
    }
  }

  _renderButtonState() {
    this._checkPlusButtonState();
    this._checkMinusButtonState();
  }

  _plus() {
    this._input.value = +this._input.value + 1;
  }

  _minus() {
    this._input.value = +this._input.value - 1;
  }

  renderCounter() {
    this._input.value = this._initialValue;
    this._renderButtonState();
  }

  setEventListeners() {
    this._plusButton.addEventListener("click", () => {
      this._plus();
      this._renderButtonState();
      this._handleCounterChange(this._card, +this._input.value);
    });

    this._minusButton.addEventListener("click", () => {
      this._minus();
      this._renderButtonState();
      this._handleCounterChange(this._card, +this._input.value);
    });

    this._input.addEventListener("change", () => {
      if (+this._input.value > this._maxCount || +this._input.value < 1) {
        this._input.value = 1;
      }
      this._renderButtonState();
      this._handleCounterChange(this._card, +this._input.value);
    });
  }

  getInfoAboutCard(card) {
    this._card = card;
  }
}
