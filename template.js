function getMenuItem(index, name, desc, formattedPrice, img) {
    return `
        <div class="menuItem" data-item-index="${index}">
            <div class="menuItems">
                <img src="${img}" alt="${name}"> <div class="itemsInfo">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <p>Preis: ${formattedPrice}</p>
                </div>
            <button class="addToCartButton">
                <img src="img/Material/Logo/icons8-plus-128.png" alt="In den Warenkorb legen">
            </button>
        </div>
    `;
}

function getOrderItemTemplate(
    orderArrayIndex,
    menuItemOriginalIndex,
    name,
    formattedTotalPrice,
    quantity
) {
    return `
        <div class="cartItem" data-order-index="${orderArrayIndex}" data-menu-item-original-index="${menuItemOriginalIndex}">
            <div class="cartItemInfo">
                <span class="itemTitle">${name}</span>
                <span class="itemPrice">${formattedTotalPrice}</span>
            </div>
            <div class="cartItemActions">
                <button class="decreaseQuantityButton">-</button>
                <span class="itemQuantity">${quantity}x</span>
                <button class="increaseQuantityButton">+</button>
                <button class="removeFromCartButton">X</button>
            </div>
            
        </div>
    `;
}

function getOrderContainerTemplate(itemsHtml, subtotal, total) {
    return `
            <div class="orderItems">
            <h2>Ihr Warenkorb</h2>

            <div class="menuOrder">
                ${itemsHtml}
            </div>
            <div class="rows">
            <div class="summaryRow">
                <p>Zwischensumme:</p>
                <p id="subtotal">${formatPrice(subtotal)}</p> </div>
            <div class="summaryRow">
                <p>Lieferkosten:</p>
                <p>5,00€</p>
            </div>
            <div class="summaryRow">
                <p>Gesamt:</p>
                <p id="total">${formatPrice(total)}</p> </div>
                </div>
                <div id="message">
                Ihre Bestellung ist eingegangen und wird bearbeitet<br><br>
                </div>
                <button id="messageButton" class="button-style" class="d_none" onclick="showMessageOne()">Bestellung bestätigen</button>
                </div>

                
    `;
}


function getCartContainerTemplate(itemsHtml, subtotal, total) {
    return `
        <div class="orderItems">
        <div class="shopping-cart-container">
            <h2>Ihr Warenkorb</h2>
        <div class="startBtn">
        <p><a href="#" onclick="closeCartOverlay(); return false;">Close</a></p>
    </div>
</div>
            <div class="menuOrder">
                ${itemsHtml}
            </div>
            <div class="summaryRow">
                <p>Zwischensumme:</p>
                <p id="subtotal">${formatPrice(subtotal)}</p> </div>
            <div class="summaryRow">
                <p>Lieferkosten:</p>
                <p>5,00€</p>
            </div>
            <div class="summaryRow">
                <p>Gesamt:</p>
                <p id="total">${formatPrice(total)}</p> </div>
                </div>
                <div id="messageTwo">
                Ihre Bestellung ist eingegangen und wird bearbeitet<br><br>
                </div>
                <button id="messageCartButton" class="button-style" class="d_none" onclick="showMessageTwo()">Bestellung bestätigen</button>
                
                `;
}