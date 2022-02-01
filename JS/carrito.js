const addToShoopingCartButtons = document.querySelectorAll('.addToCart');
addToShoopingCartButtons.forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', addToCartClicked);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoopingCartItemsContainer = document.querySelector('.shoopingCartItemsContainer');

let itemTitles = [];
let itemPrices = [];
let itemImages = [];

itemTitles = JSON.parse(localStorage.getItem('nomProductes'));
itemPrices = JSON.parse(localStorage.getItem('preuProductes'));
itemImages = JSON.parse(localStorage.getItem('imatgeProductes'));

var borrarTitle = itemTitles.shift();
var borrarPrices = itemPrices.shift();
var borrarImages = itemImages.shift();

addItemToShoopingCart(itemTitles, itemPrices, itemImages);

function addItemToShoopingCart(itemTitles, itemPrices, itemImages) {
    console.log(itemImages, itemPrices, itemTitles);
    const elementsTitle = shoopingCartItemsContainer.getElementsByClassName(
        'shoopingCartItemTitle'
    );

    for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === itemTitles) {
            let elementQuantity = elementsTitle[i].parentElement.
            querySelector(
                '.shoopingCartItemQuantity'
            );
            elementQuantity.value++;
            updateShoopingCartTotal();
            return;
        }
    }
    //if(itemTitles !== null) {   
    for (let i = 0; i < itemTitles.length; i++) {
        const shoopingCartRow = document.createElement('div');
        const shoopingCartContent = `
        <table style="margin: 0 auto;" id="">
            <tr>
                <div class="producto shoopingCartItem" data-category="BARRITAS">
                    <img src=${itemImages[i]} class="imatge imatgeCarrito">
                    <h4 class="h4 shoopingCartItemTitle">${itemTitles[i]}</h4>  
                    <p class="star"></p><p class="valoracions"></p><br>
                    <p class="pvp shoopingCartItemPrice">${itemPrices[i]}</p>
                    <pr class="pf"></p>   
                    <input class="shoopingCartItemQuantity" type="number" value="1">
                    <button class="buttonDelete"><img style="border-radius: 400px;" class="imatgeCreu" src="../IMAGENES/Creu Negra.png"/></button>
                    <hr class="lineaCarrito">
                </div>
            </tr>
        </table>`;
        shoopingCartRow.innerHTML = shoopingCartContent;
        shoopingCartItemsContainer.append(shoopingCartRow);

        shoopingCartRow
            .querySelector('.buttonDelete')
            .addEventListener('click', removeShoopingCartItem);

            shoopingCartRow.querySelector('.shoopingCartItemQuantity').
            addEventListener('change', quantityChanged);

        updateShoopingCartTotal();
    }
}

function updateShoopingCartTotal() {
    let total = 0;
    const shoopingCartTotal = document.querySelector('.shoopingCartTotal');
    
    const shoopingCartItems = document.querySelectorAll('.shoopingCartItem');

    shoopingCartItems.forEach(shoopingCartItem => {
        const shoopingCartItemPriceElement = shoopingCartItem.querySelector(
            '.shoopingCartItemPrice'
        );
        const shoopingCartItemPrice = Number(shoopingCartItemPriceElement.textContent.replace('P.V.P: ','').replace('€','')
        );
        const shoopingCartItemQuantityElement = shoopingCartItem.querySelector(
            '.shoopingCartItemQuantity'
        );
        const shoopingCartItemQuantity = Number(
            shoopingCartItemQuantityElement.value
            );
        total = total + shoopingCartItemPrice * shoopingCartItemQuantity;    
    });
    shoopingCartTotal.innerHTML = `${total.toFixed(2)}€`;
}

function removeShoopingCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('.shoopingCartItem').remove();
    updateShoopingCartTotal();
}

function quantityChanged(event) {
    const input = event.target;
    if (input.value <= 0) {
        input.value = 1;
    }
    updateShoopingCartTotal();
}

function comprarButtonClicked() {
    shoopingCartItemsContainer.innerHTML = '';
    updateShoopingCartTotal();
}