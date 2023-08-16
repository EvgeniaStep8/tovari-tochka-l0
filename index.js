import {
  editPayButton,
  sideBarEditPayButton,
  editDeliveryButton,
  sideBarEditDeliveryButton,
} from "./utils/constants.js";
import { userProducts } from "./utils/userProducts.js";
import Popup from "./components/Popup.js";
import Counter from "./components/Counter.js";
import Card from "./components/Card.js";

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

const payPopup = new Popup("#pay-popup", ".popup__close-button");
const deliveryPopup = new Popup("#delivery-popup", ".popup__close-button");

payPopup.setEventListeners();
deliveryPopup.setEventListeners();

editPayButton.addEventListener("click", () => payPopup.open());
sideBarEditPayButton.addEventListener("click", () => payPopup.open());
editDeliveryButton.addEventListener("click", () => deliveryPopup.open());
sideBarEditDeliveryButton.addEventListener("click", () => deliveryPopup.open());

const cardList = document.querySelector(".card-list");
userProducts.forEach((product) => {
  const card = new Card(product, "#card-template", createCounter);
  cardList.append(card.createCard());
});
