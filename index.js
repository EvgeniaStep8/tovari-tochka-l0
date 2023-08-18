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

const handleCounterChange = (card, count) => {
  card.updatePrice(count);
};

const sumUp = (field) => {
  return products.reduce((prev, cur) => prev + cur[field], 0);
};

const renderCard = (item) => {
  const card = new ProductCardActive(item, "#card-template", createCounter);
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
  sumUp("count"),
  sumUp("price"),
  true,
  ".checkbox"
);

cardContainer.renderCards();
cardNotAvailableContainer.renderCards();

productsHeaderNotAvailable.render();
productsHeaderNotAvailable.setEventListeners();

productsHeaderActive.render();
productsHeaderActive.setEventListeners();

const sideBar = new SideBar(sumUp("price"), sumUp("count"), sumUp("oldPrice"));
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
