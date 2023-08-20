import {
  editPayButton,
  sideBarEditPayButton,
  editDeliveryButton,
  sideBarEditDeliveryButton,
} from "./utils/constants.js";
import { userProducts } from "./utils/userProducts.js";
import CardContainer from "./components/CardContainer.js";
import ProductsHeaderActive from "./components/ProductsHeaderActive.js";
import ProductsHeaderNotAvailable from "./components/ProductsHeaderNotAvailable.js";
import Popup from "./components/Popup.js";
import Counter from "./components/Counter.js";
import ProductCard from "./components/ProductCard.js";
import ProductCardActive from "./components/ProductCardActive.js";
import SideBar from "./components/SideBar.js";
import Form from "./components/Form.js";
import FormValidator from "./components/FormValidator.js";

const products = [];
const notAvailableProducts = [];

userProducts.forEach((product) => {
  product.countInStock > 0
    ? products.push(product)
    : notAvailableProducts.push(product);
});

const createCounter = (card, cardElement, value, maxValue) => {
  const cardCounter = new Counter(
    "#card-counter",
    ".counter__button_type_plus",
    ".counter__button_type_minus",
    ".counter__input",
    cardElement,
    handleCounterChange,
    value,
    maxValue
  );
  cardCounter.renderCounter();
  cardCounter.setEventListeners();
  cardCounter.getInfoAboutCard(card);
};

const updateBill = () => {
  const count = sumUpCountCheckedProducts(products);
  const price = sumUpPriceCheckedProducts(products);
  const oldPrice = sumUpOldPriceCheckedProducts(products);
  return { count, price, oldPrice };
};

const handleCounterChange = (card, newCount) => {
  card.updatePrice(newCount);
  products.filter((product) => product._id === card.getId())[0].count =
    newCount;
  const { count, price, oldPrice } = updateBill();

  productsHeaderActive.update(count, price);
  productsHeaderActive.render();

  sideBar.update(count, price, oldPrice);
  sideBar.render();
};

const handleCheckboxChange = (card, isChecked) => {
  products.filter((product) => product._id === card.getId())[0].checked =
    isChecked;
  const { count, price, oldPrice } = updateBill();

  productsHeaderActive.update(count, price);
  productsHeaderActive.updateCheckbox(
    products.every((product) => product.checked)
  );
  productsHeaderActive.render();

  sideBar.update(count, price, oldPrice);
  sideBar.render();
};

const handleCheckboxAllChange = (isChecked) => {
  products.forEach((product) => (product.checked = isChecked));
  const { count, price, oldPrice } = updateBill();

  productsHeaderActive.update(count, price);
  productsHeaderActive.updateCheckbox(isChecked);
  productsHeaderActive.render();

  sideBar.update(count, price, oldPrice);
  sideBar.render();
};

const sumUpCountCheckedProducts = (cards) => {
  return cards.reduce(
    (prev, cur) => (cur.checked ? prev + cur.count : prev + 0),
    0
  );
};

const sumUpPriceCheckedProducts = (cards) => {
  return cards.reduce(
    (prev, cur) => (cur.checked ? prev + cur.count * cur.price : prev + 0),
    0
  );
};

const sumUpOldPriceCheckedProducts = (cards) => {
  return cards.reduce(
    (prev, cur) => (cur.checked ? prev + cur.count * cur.oldPrice : prev + 0),
    0
  );
};

const renderCard = (item) => {
  const card = new ProductCardActive(
    item,
    "#card-template",
    createCounter,
    handleCheckboxChange,
    handleCheckboxAllChange
  );
  cardContainer.addCard(card.getCard());
};

const renderNotAvailableCard = (item) => {
  const card = new ProductCard(item, "#card-not-available-template");
  cardNotAvailableContainer.addCard(card.getCard());
};

const cardContainer = new CardContainer("#cards", products, renderCard);
const cardNotAvailableContainer = new CardContainer(
  "#not-available-cards",
  notAvailableProducts,
  renderNotAvailableCard
);

const productsHeaderNotAvailable = new ProductsHeaderNotAvailable(
  ".products__header_not-available",
  ".products__button",
  "#not-available-cards",
  ".products__info",
  notAvailableProducts.length
);
const productsHeaderActive = new ProductsHeaderActive(
  ".products__header",
  ".products__button",
  "#cards",
  ".products__info",
  sumUpCountCheckedProducts(products),
  sumUpPriceCheckedProducts(products),
  true,
  ".checkbox"
);

const nameInputValidator = new FormValidator(
  "#name",
  "#name-error",
  ".side-bar__submit-button"
);

const lastNameInputValidator = new FormValidator(
  "#lastname",
  "#lastname-error",
  ".side-bar__submit-button"
);

const emailInputValidator = new FormValidator(
  "#email",
  "#email-error",
  ".side-bar__submit-button"
);

const telInputValidator = new FormValidator(
  "#tel",
  "#tel-error",
  ".side-bar__submit-button"
);

const innInputValidator = new FormValidator(
  "#inn",
  "#inn-error",
  ".side-bar__submit-button"
);

nameInputValidator.validateRequired("Укажите имя");
lastNameInputValidator.validateRequired("Введите фамилию");
emailInputValidator.validateRequired("Укажите электронную почту");
emailInputValidator.validateInputByType("Проверьте адрес электронной почты");
telInputValidator.validateRequired("Укажите номер телефона");
telInputValidator.validateInputByType("Формат: +9 999 999 99 99");
innInputValidator.validateRequired("Укажите ИНН");
innInputValidator.validateInn("Проверьте ИНН");

cardContainer.renderCards();
cardNotAvailableContainer.renderCards();

productsHeaderNotAvailable.render();
productsHeaderNotAvailable.setEventListeners();

productsHeaderActive.render();
productsHeaderActive.setEventListeners();

const sideBar = new SideBar(
  sumUpCountCheckedProducts(products),
  sumUpPriceCheckedProducts(products),
  sumUpOldPriceCheckedProducts(products)
);
sideBar.render();
sideBar.setEventListeners();

const payPopup = new Popup("#pay-popup", ".popup__close-button");
const deliveryPopup = new Popup("#delivery-popup", ".popup__close-button");

const form = new Form(".recipient__input", "");

form.setEventListeners();

payPopup.setEventListeners();
deliveryPopup.setEventListeners();

editPayButton.addEventListener("click", () => payPopup.open());
sideBarEditPayButton.addEventListener("click", () => payPopup.open());
editDeliveryButton.addEventListener("click", () => deliveryPopup.open());
sideBarEditDeliveryButton.addEventListener("click", () => deliveryPopup.open());
