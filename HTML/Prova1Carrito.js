const addToShoopingCartButtons = document.querySelectorAll('.addToCart');
addToShoopingCartButtons.forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', addToCartClicked);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoopingCartItemsContainer = document.querySelector('.shoopingCartItemsContainer');

function addToCartClicked(event) {
    const button = event.target;
    const item = button.closest('.producto');
    

    
    const itemTitle = item.querySelector('.h4').textContent;
    const itemPrice = item.querySelector('.pvp').textContent;
    const itemImage = item.querySelector('.imatge').src;

    addItemToShoopingCart(itemTitle, itemPrice, itemImage);
}

function addItemToShoopingCart(itemTitle, itemPrice, itemImage) {
    const elementsTitle = shoopingCartItemsContainer.getElementsByClassName(
        'shoopingCartItemTitle'
    );

    for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === itemTitle) {
            let elementQuantity = elementsTitle[i].parentElement.
            querySelector(
                '.shoopingCartItemQuantity'
            );
            elementQuantity.value++;
            //$('.toast').toast('show');
            updateShoopingCartTotal();
            return;
        }
    }

    const shoopingCartRow = document.createElement('div');
    const shoopingCartContent = `
    <table style="margin: 0 auto;" id="">
        <tr>
            <div class="producto shoopingCartItem" data-category="BARRITAS">
                <img src=${itemImage} class="imatge">
                <h4 class="h4 shoopingCartItemTitle">${itemTitle}</h4>  
                <p class="star">✬✬✬✬☆</p><p class="valoracions">(9)</p><br>
                <p class="pvp shoopingCartItemPrice">${itemPrice}</p>
                <pr class="pf">16,99€</p>   
                <input class="shoopingCartItemQuantity" type="number" value="1">
                <button class="buttonDelete">Borrar Prodcuto</button>
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

    updateShoopingCartTotal()
    
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



