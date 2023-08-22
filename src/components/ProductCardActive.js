import ProductCard from "./ProductCard.js";

export default class ProductCardActive extends ProductCard {
  constructor(
    {
      name,
      image,
      color,
      size,
      _id,
      count,
      countInStock,
      stock,
      provider,
      price,
      oldPrice,
      checked,
    },
    templateSelector,
    handleCardDelite,
    createCounter,
    handleCheckboxChange,
    handleCheckboxAllChange
  ) {
    super(
      { name, image, color, size, _id },
      templateSelector,
      handleCardDelite
    );
    this._count = count;
    this._countInStock = countInStock;
    this._stock = stock;
    this._provider = provider;
    this._price = price;
    this._oldPrice = oldPrice;
    this._checked = checked;
    this._createCounter = createCounter;
    this._handleCheckboxChange = handleCheckboxChange;
    this._handleCheckboxAllChange = handleCheckboxAllChange;
  }

  _calculateProductsPrice() {
    return Math.floor(this._price * this._count);
  }

  _calculateProductsOldPrice() {
    return Math.floor(this._oldPrice * this._count);
  }

  _renderRemainder() {
    this._remainder = this._countInStock - this._count;
    if (this._remainder < 10 && this._remainder > 0) {
      this._cardRemainder.textContent = `Осталось ${this._remainder} шт.`;
    } else {
      this._cardRemainder.textContent = "";
    }
  }

  _handleInformerHover(modal) {
    modal.classList.toggle("info-modal_opened");
  }

  _handleCheckboxClick(evt) {
    this._checked = this._checkbox.checked;
    this._handleCheckboxChange(this, this._checked);
  }

  _handleCheckboxAllClick() {
    this._checked = this._checkboxAll.checked;
    this._checkbox.checked = this._checked;
    this._handleCheckboxAllChange(this._checked);
  }

  _addEventListeners() {
    super._addEventListeners();

    this._checkboxAll = document.querySelector("#checkbox-all");
    this._checkboxAll.addEventListener(
      "click",
      this._handleCheckboxAllClick.bind(this)
    );

    this._checkbox.addEventListener(
      "click",
      this._handleCheckboxClick.bind(this)
    );

    this._infoIcon = this._card.querySelector(".card__informer-icon");

    this._infoIcon.addEventListener("mouseover", () => {
      this._handleInformerHover(this._providerModal);
    });
    this._infoIcon.addEventListener("mouseout", () => {
      this._handleInformerHover(this._providerModal);
    });

    this._oldCardPrice.addEventListener("mouseover", () => {
      this._handleInformerHover(this._priceModal);
    });
    this._oldCardPrice.addEventListener("mouseout", () => {
      this._handleInformerHover(this._priceModal);
    });
  }

  _createCard() {
    super._createCard();

    this._checkbox = this._card.querySelector(".checkbox__input");
    this._checkbox.checked = this._checked;

    this._card.querySelector(".card__stock").textContent = this._stock;
    this._card.querySelector(".card__provider").textContent =
      this._provider.name;

    this._providerModal = this._card.querySelector(
      ".card__provider-info-modal"
    );
    this._card.querySelector(".info-modal__title").textContent =
      this._provider.name;
    this._providerModal.querySelector(
      ".info-modal__ogrn"
    ).textContent = `ОГРН: ${this._provider.ogrn}`;
    this._providerModal.querySelector(".info-modal__adres").textContent =
      this._provider.adres;

    this._cardRemainder = this._card.querySelector(".card__remainder");
    this._renderRemainder();

    this._newCardPrice = this._card.querySelector("#card-price");
    this._oldCardPrice = this._card.querySelector("#card-old-price");
    this._newCardPriceMob = this._card.querySelector("#card-price-mobile");
    this._oldCardPriceMob = this._card.querySelector("#card-old-price-mobile");

    this._newCardPrice.textContent =
      this._calculateProductsPrice().toLocaleString();
    if (this._newCardPrice.textContent.length > 6) {
      this._newCardPrice.classList.add("card__new-price_size_small");
    }
    this._oldCardPrice.textContent = `${this._calculateProductsOldPrice().toLocaleString()} сом`;

    this._newCardPriceMob.textContent =
      this._calculateProductsPrice().toLocaleString();
    if (this._newCardPrice.textContent.length > 6) {
      this._newCardPrice.classList.add("card__new-price_size_small");
    }
    this._oldCardPriceMob.textContent = `${this._calculateProductsOldPrice().toLocaleString()} сом`;

    this._priceModal = this._card.querySelector(".card__price-info-modal");

    this._priceModal.querySelector(
      ".info-modal__discount-percent"
    ).textContent = "Скидка 55%";
    this._priceModal.querySelector(".info-modal__discount").textContent =
      "−300 сом";
    this._priceModal.querySelector(
      ".info-modal__client-discount-percent"
    ).textContent = "Скидка покупателя 10%";
    this._priceModal.querySelector(".info-modal__client-discount").textContent =
      "−30 сом";

    this._createCounter(this, this._card, this._count, this._countInStock);
  }

  updatePrice(count) {
    this._count = count;

    this._newCardPrice.textContent =
      this._calculateProductsPrice().toLocaleString();
    if (this._newCardPrice.textContent.length > 6) {
      this._newCardPrice.classList.add("card__new-price_size_small");
    }
    this._oldCardPrice.textContent = `${this._calculateProductsOldPrice().toLocaleString()} сом`;

    this._newCardPriceMob.textContent =
      this._calculateProductsPrice().toLocaleString();
    if (this._newCardPrice.textContent.length > 6) {
      this._newCardPrice.classList.add("card__new-price_size_small");
    }
    this._oldCardPriceMob.textContent = `${this._calculateProductsOldPrice().toLocaleString()} сом`;

    this._renderRemainder();
  }
}
