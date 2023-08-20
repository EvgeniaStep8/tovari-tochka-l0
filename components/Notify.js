export default class Notify {
  constructor(notifySelector, count) {
    this._notify = document.querySelector(notifySelector);
    this._count = count;
  }

  updateNotify(count) {
    this._count = count;
    this._notify.textContent = this._count;
  }

  render() {
    this._notify.textContent = this._count;
  }
}
