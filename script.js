class CardItem {
    // #region attributes

    name;
    img;
    desc;
    price;
    formattedPrice;

    // #endregion

    constructor(cName, cImg, cDesc, cPrice) {
        this.name = cName;
        this.img = cImg;
        this.desc = cDesc;
        this.price = cPrice;
        this.formattedPrice = cPrice.toFixed(2) + "€";
    }
}

let orderArray = [];

function init() {
    renderMenu();
    renderCart();
    renderCartView();

    const menuItemsContainer = document.getElementById("cartDish");
    if (menuItemsContainer) {
        menuItemsContainer.addEventListener("click", function (event) {
            const button = event.target.closest(".addToCartButton");
            if (button) {
                const menuItemDiv = button.closest(".menuItem");
                if (menuItemDiv) {
                    addToCart(parseInt(menuItemDiv.dataset.itemIndex));
                }
            }
        });
    }
    setupCartInteractionListener("order");
    setupCartInteractionListener("cartContainer");
    const orderButton = document.getElementById("orderButton");
    if (orderButton) orderButton.addEventListener("click", handleOrderButtonClick);
}

function formatPrice(price) {
    let formattedPrice = price.toFixed(2);
    formattedPrice = formattedPrice.replace(".", ",");
    return formattedPrice + "€";
}

function renderMenu() {
    const itemRef = document.getElementById("cartDish"); // Holt das HTML-Element mit der ID "cartDish" und speichert es in der Konstante itemRef.
    if (itemRef) {
        // Überprüft, ob das Element itemRef (also das Element mit der ID "cartDish") gefunden wurde.
        itemRef.innerHTML = ""; // Leert den Inhalt des gefundenen HTML-Elements.

        if (typeof menuItemsArray !== "undefined" && menuItemsArray.length > 0
        ) {
        for (let i = 0; i < menuItemsArray.length; i++) {
            const item = menuItemsArray[i]; // Holt das aktuelle Element des Arrays in der Schleife und speichert es in item.
                itemRef.innerHTML += getMenuItem(i, item.title, item.desc, formatPrice(item.price), item.img
                ); // Fügt den HTML-Code, der von der Funktion getMenuItem generiert wird, zum itemRef-Element hinzu. Dabei werden Index, Titel, Beschreibung, formatierter Preis und Bild des Menüpunkts übergeben
            }
        }
    }
}

function renderCart() {
    const orderRef = document.getElementById("order");
    let subtotal = 0;
    const allOrderItemsHtml = (typeof orderArray !== "undefined" && orderArray.length > 0)
        ? orderArray.map((entry, j) => {
            const itemTotal = entry.item.price * entry.quantity;
            subtotal += itemTotal;
            return getOrderItemTemplate(j, entry.item.index, entry.item.title, formatPrice(itemTotal), entry.quantity);
        }).join("")
        : `<div class="emptyCartMessageInner"><p>Ihr Warenkorb ist leer.</p></div>`;

    const deliveryCost = 5.0;
    const total = subtotal + deliveryCost;
    if (orderRef) orderRef.innerHTML = getOrderContainerTemplate(allOrderItemsHtml, subtotal, total);
}

function renderCartView() {
    const orderRef = document.getElementById("cartOrder");
    let subtotal = 0;
    const allOrderItemsHtml = (typeof orderArray !== "undefined" && orderArray.length > 0)
        ? orderArray.map((entry, j) => {
            const itemTotal = entry.item.price * entry.quantity;
            subtotal += itemTotal;
            return getOrderItemTemplate(j, entry.item.index, entry.item.title, formatPrice(itemTotal), entry.quantity);
        }).join("")
        : `<div class="emptyCartMessageInner"><p>Ihr Warenkorb ist leer.</p></div>`;

    const deliveryCost = 5.0;
    const total = subtotal + deliveryCost;
    if (orderRef) orderRef.innerHTML = getCartContainerTemplate(allOrderItemsHtml, subtotal, total);
}

function addToCart(menuItemIndex) {
    if (!menuItemsArray?.[menuItemIndex]) {
        console.error("Menüelement nicht gefunden.");
        return;
    }
    orderArray = orderArray || [];
    const itemToAdd = menuItemsArray[menuItemIndex];
    const existingItem = orderArray.find(entry => entry.cartItem.index === menuItemIndex);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        orderArray.push({ item: { ...itemToAdd }, cartItem: { index: menuItemIndex }, quantity: 1 });
    }
    renderCart();
    renderCartView();
}

function addOneProduct(cartItemIndex) {
    if (
        //Beginnt eine Bedingungsprüfung, um sicherzustellen, dass die Operation sicher durchgeführt werden kann.
        typeof orderArray !== "undefined" && //Stellt sicher, dass das orderArray definiert ist, bevor darauf zugegriffen wird
        cartItemIndex > -1 && //Stellt sicher, dass der cartItemIndex nicht negativ ist, da Array-Indizes bei 0 beginnen.
        cartItemIndex < orderArray.length //Stellt sicher, dass der cartItemIndex innerhalb der Grenzen des orderArray liegt, um Zugriffe auf nicht existierende Elemente zu vermeiden.
    ) {
        orderArray[cartItemIndex].quantity++; //Erhöht die quantity (Menge) des Artikels an der durch cartItemIndex angegebenen Position im orderArray um eins.
        renderCart();
        renderCartView();
    }
}

function removeOneProduct(cartItemIndex) {
    if (
        typeof orderArray !== "undefined" && //Stellt sicher, dass das orderArray definiert ist.
        cartItemIndex > -1 && //Stellt sicher, dass der cartItemIndex nicht negativ ist.
        cartItemIndex < orderArray.length //Stellt sicher, dass der cartItemIndex innerhalb der Grenzen des orderArray liegt.
    ) {
        orderArray[cartItemIndex].quantity--; // Verringert die quantity (Menge) des Artikels an der durch cartItemIndex angegebenen Position im orderArray um eins.
        if (orderArray[cartItemIndex].quantity <= 0) {
            // Überprüft, ob die Menge des Artikels nach der Verringerung null oder kleiner ist.
            orderArray.splice(cartItemIndex, 1); //Wenn die Menge null oder kleiner ist, entfernt splice() den Artikel vollständig aus dem orderArray. cartItemIndex ist der Startpunkt und 1 ist die Anzahl der zu entfernenden Elemente.
        }
        renderCart();
        renderCartView();
    }
}

function deleteFromCart(cartItemIndex) {
    if (
        typeof orderArray !== "undefined" && //siehe removeOneProduct
        cartItemIndex > -1 &&
        cartItemIndex < orderArray.length
    ) {
        orderArray.splice(cartItemIndex, 1);
        renderCart();
        renderCartView();
    }
}

function setupCartInteractionListener(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.addEventListener("click", function (event) {
            const cartItemDiv = event.target.closest(".cartItem");
            if (cartItemDiv) {
                const index = parseInt(cartItemDiv.dataset.orderIndex);
                if (event.target.closest(".removeFromCartButton")) {
                    deleteFromCart(index);
                } else if (event.target.closest(".increaseQuantityButton")) {
                    addOneProduct(index);
                } else if (event.target.closest(".decreaseQuantityButton")) {
                    removeOneProduct(index);
                }
            }
        });
    }
}

function clearCart() {
    orderArray = []; // Setzt das orderArray auf ein leeres Array zurück
    renderCart(); // Aktualisiert die Bestellübersicht
    renderCartView();  // Aktualisiert die detaillierte Warenkorbansicht
}

function showMessageOne() {
    const msgDiv = document.getElementById("message");
    if (!msgDiv) return;

    msgDiv.style.display = "block";

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Schließen";
    closeBtn.className = "closeButton";
    msgDiv.appendChild(closeBtn);

    closeBtn.onclick = () => {
        msgDiv.style.display = "none";
        if (typeof window.menuOrder !== 'undefined') window.menuOrder = null;
        clearCart();
        closeBtn.remove();
    };
}

function showMessageTwo() {
    const msgDiv = document.getElementById("messageTwo");
    if (!msgDiv) return;

    msgDiv.style.display = "block";

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Schließen";
    closeBtn.className = "closeButton";
    msgDiv.appendChild(closeBtn);

    closeBtn.onclick = () => {
        msgDiv.style.display = "none";
        if (typeof window.menuOrder !== 'undefined') window.menuOrder = null;
    
        clearCart();
        closeBtn.remove(); 
    };
}

function closeCartOverlay() {
    const cartContainer = document.getElementById('cartContainer');
    if (cartContainer) {
        cartContainer.style.display = 'none';
    }
}

// Funktion zum Öffnen des Warenkorb-Overlays
function openCartOverlay() {
    const cartContainer = document.getElementById('cartContainer');
    if (cartContainer) {
        cartContainer.style.display = 'flex';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    init();
});