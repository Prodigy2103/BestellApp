function getMenuItem(index, name, desc, formattedPrice, img) {
    return `
        <div class="menu-item" data-item-index="${index}">
            <div class="menuItems">
                <img src="${img}" alt="${name}"> <div class="itemsInfo">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <p>Preis: ${formattedPrice}</p>
                </div>
            <button class="add-to-cart-button">
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
                <span class="item-title">${name}</span>
                <span class="item-price">${formattedTotalPrice}</span>
            </div>
            <div class="cartItemActions">
                <button class="decrease-quantity-button">-</button>
                <span class="item-quantity">${quantity}x</span>
                <button class="increase-quantity-button">+</button>
                <button class="remove-from-cart-button">X</button>
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
                <div id="message">Ihre Bestellung ist eingegangen und wird bearbeitet</div>
                <button id="messageButton" class="button-style" onclick="showMessage()">Bestellung bestätigen</button>
                <div class="startBtn"><p><a href="index.html">Zurück zur Startseite</a></p></div>
        </div>
    `;
}
