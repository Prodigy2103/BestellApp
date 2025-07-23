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

let menuItemsArray = [
    {
        title: "Döner",
        img: "img/CartImg/food-photo-8683717_640.jpg",
        desc: "Schmeckt lecker mit viel Soße!",
        price: 6.5,
    },
    {
        title: "Döner Vegetarisch",
        img: "img/CartImg/vegetarisch.jpg",
        desc: "Lecker, fleischlos, frisch, sättigend, vielfältig.",
        price: 5.0,
    },
    {
        title: "Dürüm",
        img: "img/CartImg/Dürüm.jpg",
        desc: "Fladenbrot, gerollt, gefüllt, praktisch, lecker..",
        price: 7.0,
    },
    {
        title: "Lahmacun",
        img: "img/CartImg/lahmacun_selbstgemacht-7591.jpg",
        desc: "Knusprig, dünn, würzig, orientalisch, Fladenbrot.",
        price: 7.0,
    },
    {
        title: "Kumpir",
        img: "img/CartImg/Kumpir-1.jpg",
        desc: "Große Ofenkartoffel, vielfältig, cremig, sättigend, Beläge.",
        price: 7.0,
    },
    {
        title: "Falafel Teller",
        img: "img/CartImg/5460-bunter-falafel-teller.jpg",
        desc: "Knusprige Bällchen, Salat, Soßen, vegetarisch, komplett.",
        price: 9.5,
    },
    {
        title: "Pide",
        img: "img/CartImg/pide-adobe-stock-bbvirys-277534955.jpg",
        desc: "Türkisches Fladenbrot, gefüllt, herzhaft, ofenfrisch.",
        price: 8.0,
    },
    {
        title: "Taco (groß)",
        img: "img/CartImg/db9c492e-8cf9-40f6-8318-3326244e9f4c.webp",
        desc: "Fusion, würziges Fleisch, Tortilla, innovativ, lecker.",
        price: 8.5,
    },
];

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

        if (
            typeof menuItemsArray !== "undefined" &&
            menuItemsArray.length > 0
        ) {
            // Prüft, ob das menuItemsArray Elemente enthält nicht leer ist.
            for (let i = 0; i < menuItemsArray.length; i++) {
                // Startet eine Schleife, die durch jedes Element im menuItemsArray läuft.
                const item = menuItemsArray[i]; // Holt das aktuelle Element des Arrays in der Schleife und speichert es in item.
                itemRef.innerHTML += getMenuItem(
                    i,
                    item.title,
                    item.desc,
                    formatPrice(item.price),
                    item.img
                ); // Fügt den HTML-Code, der von der Funktion getMenuItem generiert wird, zum itemRef-Element hinzu. Dabei werden Index, Titel, Beschreibung, formatierter Preis und Bild des Menüpunkts übergeben
            }
        }
    }
}

function renderCart() {
    const orderRef = document.getElementById("order"); //Holt das HTML-Element mit der ID "order" und speichert es in orderRef.
    let subtotal = 0; // Initialisiert eine Variable subtotal (Zwischensumme) mit dem Wert 0.
    const allOrderItemsHtml =
        typeof orderArray !== "undefined" && orderArray.length > 0 //Beginnt eine Operation, die prüft, ob orderArray definiert ist und Elemente enthält.
            ? orderArray
                .map((entry, j) => {
                      //Wenn orderArray existiert und nicht leer ist, wird es durchlaufen und jedes Element wird einer Funktion übergeben.
                      const itemTotal = entry.item.price * entry.quantity; //Berechnet den Gesamtpreis für das aktuelle Bestellelement (Preis mal Menge).
                      subtotal += itemTotal; // hier wird addiert
                    return getOrderItemTemplate(
                          j, entry.item.index, entry.item.title, formatPrice(itemTotal), entry.quantity); // Gibt den HTML-Code für ein Bestellelement zurück, der von getOrderItemTemplate generiert wird.
                })
                  .join("") //Verbindet alle generierten HTML-Strings zu einem einzigen String.
            : `<div class="emptyCartMessageInner"><p>Ihr Warenkorb ist leer.</p></div>`; // Verbindet alle generierten HTML-Strings zu einem einzigen String.

    const deliveryCost = 5.0;
    const total = subtotal + deliveryCost; //Berechnet den Gesamtpreis, indem die Versandkosten zur Zwischensumme addiert werden.
    if (orderRef) {
        // Prüft, ob das HTML-Element orderRef (also das Element mit der ID "order") gefunden wurde
        orderRef.innerHTML = getOrderContainerTemplate(
            allOrderItemsHtml,
            subtotal,
            total
        ); //Setzt den inneren HTML-Inhalt des orderRef-Elements auf den von getOrderContainerTemplate generierten HTML-Code, der die Bestellelemente, die Zwischensumme und den Gesamtbetrag enthält.
    }
}
// siehe renderCart zwecks erklärung
function renderCartView() {
    const orderRef = document.getElementById("cartContainer");
    let subtotal = 0;
    const allOrderItemsHtml =
        typeof orderArray !== "undefined" && orderArray.length > 0
            ? orderArray
                .map((entry, j) => {
                      const itemTotal = entry.item.price * entry.quantity;
                    subtotal += itemTotal;
                    return getOrderItemTemplate(j, entry.item.index, entry.item.title, formatPrice(itemTotal), entry.quantity);
                })
                .join("")
            : `<div class="emptyCartMessageInner"><p>Ihr Warenkorb ist leer.</p></div>`;

    const deliveryCost = 5.0;
    const total = subtotal + deliveryCost;
    if (orderRef) {
        orderRef.innerHTML = getCartContainerTemplate(
            allOrderItemsHtml,
            subtotal,
            total
        );
    }
}

function addToCart(menuItemIndex) {
    if (!menuItemsArray?.[menuItemIndex]) {
        console.error("Menüelement nicht gefunden oder menuItemsArray nicht initialisiert.");
        return;
    }

    orderArray = orderArray || []; // Stellt sicher, dass orderArray initialisiert ist.

    const itemToAdd = menuItemsArray[menuItemIndex];
    // Suche im orderArray, ob der Artikel bereits existiert, basierend auf seinem ursprünglichen Index
    const existingItem = orderArray.find(
        (entry) => entry.item.index === itemToAdd.index
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        orderArray.push({
            item: { ...itemToAdd, index: menuItemIndex }, // Füge den originalen Index hinzu
            quantity: 1,
        });
    }



    // Nach dem Aktualisieren des orderArray, den Warenkorb neu rendern
    renderCart();
    renderCartView(); // Aufruf beibehalten, falls es spezifische UI-Updates gibt
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
    const container = document.getElementById(containerId); //Sucht das HTML-Element mit der übergebenen containerId und speichert es in der Konstante container.
    if (container) {
        // Prüft, ob das container-Element tatsächlich im Dokument gefunden wurde.
        container.addEventListener("click", function (event) {
            //Fügt dem container-Element einen Event-Listener hinzu. Dieser Listener wartet auf click-Ereignisse. Wenn ein Klick innerhalb des Containers stattfindet, wird die anonyme Funktion ausgeführt, wobei das event-Objekt übergeben wird.
            const cartItemDiv = event.target.closest(".cartItem"); //Beim Klick findet event.target.closest(".cartItem") das nächstgelegene .cartItem-Element. Das ist wichtig, um zu wissen, welches Warenkorb-Element geklickt wurde, selbst wenn ein Button innerhalb dieses Elements betroffen war.
            if (cartItemDiv) {
                //Prüft, ob ein übergeordnetes .cartItem-Element gefunden wurde. Das bedeutet, der Klick erfolgte innerhalb eines relevanten Warenkorb-Elements.
                const index = parseInt(cartItemDiv.dataset.orderIndex); //Wenn ein .cartItem-Element gefunden wurde, wird sein data-order-index-Attribut ausgelesen. Dieses Attribut enthält wahrscheinlich den Index des Artikels im orderArray. parseInt() konvertiert den String-Wert in eine Ganzzahl.

                if (event.target.closest(".removeFromCartButton")) {
                    //Prüft, ob das geklickte Element oder eines seiner übergeordneten Elemente die Klasse .remove-from-cart-button hat.
                    deleteFromCart(index); //Wenn der "Entfernen"-Button geklickt wurde, wird die Funktion deleteFromCart() mit dem ausgelesenen index aufgerufen, um den Artikel vollständig aus dem Warenkorb zu entfernen.
                } else if (event.target.closest(".increaseQuantityButton")) {
                    //Wenn nicht der "Entfernen"-Button geklickt wurde, prüft es, ob der Klick auf ein Element mit der Klasse .increase-quantity-button erfolgte.
                    addOneProduct(index); //Wenn der "Menge erhöhen"-Button geklickt wurde, wird die Funktion addOneProduct() mit dem index aufgerufen, um die Menge des Artikels um eins zu erhöhen
                } else if (event.target.closest(".decreaseQuantityButton")) {
                    //Wenn keine der vorherigen Bedingungen zutraf, prüft es, ob der Klick auf ein Element mit der Klasse .decrease-quantity-button erfolgte.
                    removeOneProduct(index); //Wenn der "Menge verringern"-Button geklickt wurde, wird die Funktion removeOneProduct() mit dem index aufgerufen, um die Menge des Artikels um eins zu verringern (und ihn ggf. zu entfernen, wenn die Menge null erreicht).
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

function showMessage() {
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

function init() {
    renderMenu();
    renderCart();
    renderCartView();

    const menuItemsContainer = document.getElementById("cartDish"); //Holt das HTML-Element mit der ID "cartDish"
    if (menuItemsContainer) {
        //Überprüft, ob der menuItemsContainer im DOM gefunden wurde.
        menuItemsContainer.addEventListener("click", function (event) {
            //Fügt dem menuItemsContainer einen Event-Listener für click-Ereignisse hinzu.
            const button = event.target.closest(".addToCartButton"); //Wenn ein Klick im Menü-Container erfolgt, sucht es das nächstgelegene übergeordnete Element (oder das Element selbst) mit der Klasse .add-to-cart-button.
            if (button) {
                //Prüft, ob ein .add-to-cart-button gefunden wurde.
                const menuItemDiv = button.closest(".menuItem"); //Sucht vom gefundenen Button aus das nächstgegelegene übergeordnete Element mit der Klasse .menu-item.
                if (menuItemDiv) {
                    //Prüft, ob ein .menu-item-Element gefunden wurde.
                    const index = parseInt(menuItemDiv.dataset.itemIndex); //Liest den data-item-index aus dem menuItemDiv aus und konvertiert ihn in eine Ganzzahl. Dieser Index identifiziert das spezifische Menüelement.
                    addToCart(index); //Ruft die Funktion addToCart() mit dem gefundenen index auf, um den Artikel dem Warenkorb hinzuzufügen.
                }
            }
        });
    }

    setupCartInteractionListener("order"); //Ruft die Funktion setupCartInteractionListener() auf, um Klick-Ereignisse innerhalb des HTML-Elements mit der ID "order" zu überwachen
    setupCartInteractionListener("cartContainer"); //Ruft die setupCartInteractionListener()-Funktion erneut auf, um Klick-Ereignisse innerhalb des HTML-Elements mit der ID "cartContainer" zu überwachen.

    const orderButton = document.getElementById("orderButton"); //Sucht das HTML-Element mit der ID "orderButton" (den "Bestellen"-Button) im Dokument und speichert es in der Konstante orderButton.
    if (orderButton) {
        //Überprüft, ob das orderButton-Element im HTML gefunden wurde.
        orderButton.addEventListener("click", handleOrderButtonClick); //Fügt dem orderButton einen Klick-Event-Listener hinzu. Wenn der Button angeklickt wird, wird die Funktion handleOrderButtonClick() ausgeführt.
    }
}

document.addEventListener("DOMContentLoaded", () => {
    init();

    const cartToggleButton = document.getElementById("cartToggle"); //Sucht das HTML-Element mit der ID "cartToggle" (vermutlich ein Button oder Icon zum Öffnen/Schließen des Warenkorbs) und speichert es in der Konstante cartToggleButton.
    const cartContainer = document.getElementById("cartContainer"); //Sucht das HTML-Element mit der ID "cartContainer" (den Hauptcontainer, der den gesamten Warenkorbinhalt anzeigt) und speichert es in der Konstante cartContainer.

    if (cartToggleButton && cartContainer) {
        //Überprüft, ob beide Elemente – der Umschalter und der Container – erfolgreich im Dokument gefunden wurden. Dies verhindert Fehler, falls eines der Elemente fehlt.
        cartToggleButton.addEventListener("click", () => {
            //Fügt dem cartToggleButton einen Event-Listener hinzu. Bei jedem Klick auf diesen Button wird die anonyme Pfeilfunktion (() => { ... }) ausgeführt.
            cartContainer.classList.remove("d_none"); // Entfernt die Klasse, um den Warenkorb anzuzeigen
            renderCartView(); // Warenkorb immer neu rendern, wenn er geöffnet wird
        });
    }
});
