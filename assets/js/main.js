const contentContainer = document.querySelector('#content-container');
const cartCounterLabel = document.querySelector('#cart-counter-label');
const CartBtn = document.querySelector('.page-header__cart-btn')

let cartCounter = 0;
let cartPrice = 0;
let amout= 0;


  const container = document.querySelector('#container');

  const basket = document.createElement('div');
  basket.setAttribute('class', 'basket');

  const title = document.createElement('p');
  

  const listBasket = document.createElement('ul');
  listBasket.setAttribute('class', 'basket__list');

  const outcome = document.createElement('p');

  const btnBasket = document.createElement('div');
  btnBasket.setAttribute('class', 'basket__btn');
  btnBasket.innerHTML = `
                <button type="button" class="btn btn-primary btn-sm continue">Продолжить покупку</button>
                <button type="button" class="btn btn-primary btn-sm clear">Очистить корзину</button>
                <button type="button" class="btn btn-primary btn-sm buy">Оформить заказ</button>
  `;

  container.appendChild(basket);
  basket.appendChild(title);
  basket.appendChild(listBasket);
  basket.appendChild(outcome);
  basket.appendChild(btnBasket);


const incrementCounter = () => {
  cartCounterLabel.innerHTML = `${++cartCounter}`;
  title.innerHTML = `В корзине ${cartCounter} товаров`;
  if (cartCounter === 1 ) cartCounterLabel.style.display = 'block';
};

const disableControls = (target, btnClick) => {
  target.disabled = true;
  contentContainer.removeEventListener('click', btnClick)
};

const enableControls = (target, btnClick) => {
  target.disabled = false;
  contentContainer.addEventListener('click', btnClick)
};

const getMockData = (target) => +target.parentElement
  .previousElementSibling
  .innerHTML
  .replace(/^\$(\d+)\s\D+(\d+).*$/g, '$1.$2');

const getPrice = (t, price) => Math.round((price + getMockData(t)) * 100) / 100 ;

const basketItem = (target) =>{
  let itemTitle = target.parentElement
  .parentNode
  .firstChild
  .nextElementSibling
  .innerHTML;
   
  let price = target.parentElement
  .previousElementSibling
  .innerHTML
  .replace(/^\$(\d+)\s\D+(\d+).*$/g, '$1.$2');

  const listBasketItem = document.createElement('li');
  let element = document.getElementById(`baket_${itemTitle}`);
  if(element === null)
    {
      listBasketItem.setAttribute('id', `baket_${itemTitle}`);
      listBasketItem.setAttribute('price', price);
      listBasketItem.setAttribute('count', 1);

      let countList = listBasketItem.getAttribute('count')
      let sum = (price * countList).toFixed(2);

      listBasketItem.innerHTML = `${itemTitle}  - ${countList} шт    цена ${price}$     сумма: ${sum} $`;
    
      listBasket.appendChild(listBasketItem);
    }
      else
    {
      let c = element.getAttribute('count');
      ++c;
      let sum = (price * c ).toFixed(2);    
      element.setAttribute('count', c);
      let countList = element.getAttribute('count');

      element.innerHTML = `${itemTitle}  - ${countList} шт    цена ${price}$     сумма: ${sum} $`;

      listBasket.appendChild(element);
    };

    function clearHandler(){
      cartCounterLabel.innerHTML = 0;
      cartCounterLabel.style.display = 'none';
  
      outcome.innerHTML = ``;
      title.innerHTML = ``;
      listBasket.innerHTML = ``;  
       
      cartPrice = 0;
      cartCounter = 0;  
      restoreHTML = null;
    };

    clearBtn.addEventListener('click', clearHandler);

}

const btnClick = (ev) => {
  const target = ev.target
  const interval = 2000;
  let restoreHTML = null;

  if(target && target.matches('.item-actions__cart')){
    incrementCounter();

    restoreHTML = target.innerHTML;  
    cartPrice = getPrice(target, cartPrice);
    target.innerHTML = `Added ${cartPrice.toFixed(2)} $`;
    outcome.innerHTML = `Всего в корзине товаров на сумму ${cartPrice.toFixed(2)} $`;

    basketItem(target);
     
    disableControls(target, btnClick);
    setTimeout (() => {
      enableControls(target, btnClick);
      target.innerHTML = `${restoreHTML}`;
     }, interval)

  }
};

contentContainer.addEventListener('click', btnClick);

const continueBtn = document.querySelector('.continue');
const clearBtn = document.querySelector('.clear');

function basketHandler() {
  basket.classList.toggle('show')
};

CartBtn.addEventListener('click', basketHandler);
continueBtn.addEventListener('click', basketHandler);
