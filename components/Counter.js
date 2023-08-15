export default class Counter {
  constructor(
    counterSelector,
    plusButtonSelector,
    minusButtonSelector,
    inputSelector,
    initialValue,
    maxCount
  ) {
    this._counter = document.querySelector(counterSelector);
    this._plusButton = this._counter.querySelector(plusButtonSelector);
    this._minusButton = this._counter.querySelector(minusButtonSelector);
    this._input = this._counter.querySelector(inputSelector);
    this._initialValue = initialValue;
    this._maxCount = maxCount;
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
    this._renderButtonState();
  }

  _minus() {
    this._input.value = +this._input.value - 1;
    this._renderButtonState();
  }

  renderCounter() {
    this._input.value = this._initialValue;
    this._renderButtonState();
  }

  setEventListeners() {
    this._plusButton.addEventListener("click", this._plus.bind(this));
    this._minusButton.addEventListener("click", this._minus.bind(this));
  }
}
