/* =====================================
   SRI HOTEL BILLING SYSTEM
   APP.JS - PART 1/2
===================================== */


/* =====================================
   DEFAULT FOOD ITEMS
===================================== */

const defaultProducts = [

  {
    id: 1,
    name: "Idly",
    price: 10
  },

  {
    id: 2,
    name: "Vada",
    price: 10
  },

  {
    id: 3,
    name: "Dosa",
    price: 40
  },

  {
    id: 4,
    name: "Poori",
    price: 30
  },

  {
    id: 5,
    name: "Pongal",
    price: 40
  },

  {
    id: 6,
    name: "Chapati",
    price: 20
  },

  {
    id: 7,
    name: "Parotta",
    price: 20
  },

  {
    id: 8,
    name: "Meals",
    price: 70
  },

  {
    id: 9,
    name: "Tea",
    price: 10
  },

  {
    id: 10,
    name: "Coffee",
    price: 15
  },

  {
    id: 11,
    name: "Lemon Juice",
    price: 20
  },

  {
    id: 12,
    name: "Water",
    price: 10
  },

  {
    id: 13,
    name: "Biryani",
    price: 120
  },

  {
    id: 14,
    name: "Fried Rice",
    price: 100
  },

  {
    id: 15,
    name: "Noodles",
    price: 100
  }

];


/* =====================================
   LOAD PRODUCTS
===================================== */

let products = [];


try {

  const savedProducts =
    localStorage.getItem(
      "hotelProducts"
    );


  if (savedProducts) {

    products =
      JSON.parse(
        savedProducts
      );

  } else {

    products =
      [...defaultProducts];

    saveProducts();

  }

} catch (error) {

  console.error(
    "Product loading error:",
    error
  );

  products =
    [...defaultProducts];

}


/* =====================================
   SAVE PRODUCTS
===================================== */

function saveProducts() {

  localStorage.setItem(
    "hotelProducts",
    JSON.stringify(products)
  );

}


/* =====================================
   VARIABLES
===================================== */

let cart = [];

let selectedPayment =
  "None";

let selectedProductId =
  null;

let editingProductId =
  null;


/* =====================================
   DISPLAY FOOD LIST
===================================== */

function displayProducts(
  list = products
) {

  const container =
    document.getElementById(
      "productList"
    );


  if (!container) return;


  container.innerHTML = "";


  if (
    !list ||
    list.length === 0
  ) {

    container.innerHTML = `
      <div class="empty-food">
        No food items found.
      </div>
    `;

    return;

  }


  list.forEach(
    function(product) {

      const row =
        document.createElement(
          "div"
        );


      row.className =
        "food-row";


      row.innerHTML = `

        <div class="food-name">
  ${escapeHTML(
    product.name
  )}

  ${
    product.tamilName
      ? `(${escapeHTML(
          product.tamilName
        )})`
      : ""
  }
</div>


        <div class="food-price">
          ₹${Number(
            product.price
          ).toFixed(0)}
        </div>


        <button
          class="food-add"
          onclick="
            addToCart(${product.id})
          "
        >
          +
        </button>


        <button
          class="more-btn"
          onclick="
            openItemMenu(
              event,
              ${product.id}
            )
          "
        >
          ⋮
        </button>

      `;


      container.appendChild(
        row
      );

    }
  );

}


/* =====================================
   ESCAPE TEXT
===================================== */

function escapeHTML(value) {

  return String(value)

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}


/* =====================================
   SEARCH
===================================== */

function searchProducts() {

  const input =
    document.getElementById(
      "searchInput"
    );


  if (!input) return;


  const search =
    input.value
      .toLowerCase()
      .trim();


  const clearButton =
    document.getElementById(
      "clearSearch"
    );


  if (clearButton) {

    clearButton.style.display =
      search
        ? "block"
        : "none";

  }


  const filtered =
  products.filter(
    function(product) {

      return (
        product.name
          .toLowerCase()
          .includes(search)

        ||

        (product.tamilName || "")
          .toLowerCase()
          .includes(search)
      );

    }
  );


  displayProducts(
    filtered
  );

}


/* =====================================
   CLEAR SEARCH
===================================== */

function clearSearch() {

  const input =
    document.getElementById(
      "searchInput"
    );


  if (!input) return;


  input.value = "";


  const clearButton =
    document.getElementById(
      "clearSearch"
    );


  if (clearButton) {

    clearButton.style.display =
      "none";

  }


  displayProducts(
    products
  );

}


/* =====================================
   ADD TO CART
===================================== */

function addToCart(id) {

  const product =
    products.find(
      function(item) {

        return item.id === id;

      }
    );


  if (!product) return;


  const existing =
    cart.find(
      function(item) {

        return item.id === id;

      }
    );


  if (existing) {

    existing.quantity++;

  } else {

    cart.push({
  id: product.id,
  name: product.name,
  tamilName: product.tamilName || "",
  price: Number(product.price),
  quantity: 1
});

  }


  updateCartBar();

}


/* =====================================
   UPDATE CART BAR
===================================== */

function updateCartBar() {

  const count =
    cart.reduce(
      function(total, item) {

        return total +
          item.quantity;

      },
      0
    );


  const total =
    cart.reduce(
      function(sum, item) {

        return sum +
          (
            item.price *
            item.quantity
          );

      },
      0
    );


  const countElement =
    document.getElementById(
      "cartCount"
    );


  const itemsText =
    document.getElementById(
      "cartItemsText"
    );


  const totalText =
    document.getElementById(
      "cartTotalText"
    );


  if (countElement) {

    countElement.textContent =
      count;

  }


  if (itemsText) {

    itemsText.textContent =
      count === 1
        ? "1 Item"
        : `${count} Items`;

  }


  if (totalText) {

    totalText.textContent =
      `₹${total.toFixed(0)}`;

  }

}


/* =====================================
   THREE DOT MENU
===================================== */

function openItemMenu(
  event,
  id
) {

  event.stopPropagation();


  selectedProductId =
    id;


  const menu =
    document.getElementById(
      "itemMenu"
    );


  if (!menu) return;


  const button =
    event.currentTarget;


  const rect =
    button.getBoundingClientRect();


  menu.classList.remove(
    "hidden"
  );


  let left =
    rect.right - 135;


  let top =
    rect.bottom + 5;


  if (
    left < 8
  ) {

    left = 8;

  }


  if (
    left + 135 >
    window.innerWidth - 8
  ) {

    left =
      window.innerWidth -
      143;

  }


  if (
    top + 95 >
    window.innerHeight - 8
  ) {

    top =
      rect.top - 100;

  }


  menu.style.left =
    `${left}px`;


  menu.style.top =
    `${top}px`;

}


/* =====================================
   CLOSE THREE DOT MENU
===================================== */

function closeItemMenu() {

  const menu =
    document.getElementById(
      "itemMenu"
    );


  if (menu) {

    menu.classList.add(
      "hidden"
    );

  }

}


/* =====================================
   EDIT SELECTED PRODUCT
===================================== */

function editSelectedProduct() {

  const id =
    selectedProductId;


  closeItemMenu();


  const product =
    products.find(
      function(item) {

        return item.id === id;

      }
    );


  if (!product) return;


  editingProductId =
    id;


  const title =
    document.getElementById(
      "modalTitle"
    );


  const nameInput =
    document.getElementById(
      "foodName"
    );


  const priceInput =
    document.getElementById(
      "foodPrice"
    );
  const tamilInput =
  document.getElementById(
    "foodNameTamil"
  );


  const saveButton =
    document.getElementById(
      "saveItemBtn"
    );


  title.textContent =
    "Edit Food Item";


  nameInput.value =
    product.name;
  

tamilInput.value =
  product.tamilName || "";


  priceInput.value =
    product.price;


  saveButton.textContent =
    "Update";


  document
    .getElementById(
      "itemModal"
    )
    .classList.remove(
      "hidden"
    );

}


/* =====================================
   ADD NEW ITEM MODAL
===================================== */

function openAddModal() {

  editingProductId =
    null;


  const title =
    document.getElementById(
      "modalTitle"
    );


  const nameInput =
    document.getElementById(
      "foodName"
    );


  const priceInput =
    document.getElementById(
      "foodPrice"
    );


  const saveButton =
    document.getElementById(
      "saveItemBtn"
    );


  title.textContent =
    "Add New Food Item";


  nameInput.value = "";
  const tamilInput =
  document.getElementById(
    "foodNameTamil"
  );

tamilInput.value = "";


  priceInput.value = "";


  saveButton.textContent =
    "Save";


  document
    .getElementById(
      "itemModal"
    )
    .classList.remove(
      "hidden"
    );


  setTimeout(
    function() {

      nameInput.focus();

    },
    100
  );

}


/* =====================================
   CLOSE ITEM MODAL
===================================== */

function closeItemModal() {

  document
    .getElementById(
      "itemModal"
    )
    .classList.add(
      "hidden"
    );


  editingProductId =
    null;

}


/* =====================================
   SAVE / UPDATE ITEM
===================================== */

function saveItem() {

  const nameInput =
    document.getElementById(
      "foodName"
    );


  const priceInput =
    document.getElementById(
      "foodPrice"
    );
  const tamilInput =
  document.getElementById(
    "foodNameTamil"
  );


  const name =
  nameInput.value.trim();

const tamilName =
  tamilInput.value.trim();

const price =
  Number(
    priceInput.value
  );


  if (!name) {

    alert(
      "Please enter food name."
    );

    nameInput.focus();

    return;

  }


  if (
    !Number.isFinite(price) ||
    price <= 0
  ) {

    alert(
      "Please enter a valid price."
    );

    priceInput.focus();

    return;

  }


  /* ==============================
     UPDATE
  =============================== */

  if (
    editingProductId !== null
  ) {

    const product =
      products.find(
        function(item) {

          return item.id ===
            editingProductId;

        }
      );


    if (product) {

      product.name =
  name;

product.tamilName =
  tamilName;

product.price =
  price;

    }


  }

  /* ==============================
     ADD
  =============================== */

  else {

    const newId =
      products.length > 0

        ? Math.max(
            ...products.map(
              function(item) {

                return item.id;

              }
            )
          ) + 1

        : 1;


    products.push({

  id:
    newId,

  name:
    name,

  tamilName:
    tamilName,

  price:
    price

});

  }


  saveProducts();


  displayProducts(
    products
  );


  closeItemModal();

}


/* =====================================
   DELETE SELECTED PRODUCT
===================================== */

function deleteSelectedProduct() {

  const product =
    products.find(
      function(item) {

        return item.id ===
          selectedProductId;

      }
    );


  closeItemMenu();


  if (!product) return;


  document.getElementById(
    "deleteFoodName"
  ).textContent =
    `"${product.name}"`;


  document
    .getElementById(
      "deleteModal"
    )
    .classList.remove(
      "hidden"
    );

}


/* =====================================
   CLOSE DELETE MODAL
===================================== */

function closeDeleteModal() {

  document
    .getElementById(
      "deleteModal"
    )
    .classList.add(
      "hidden"
    );

}


/* =====================================
   CONFIRM DELETE
===================================== */

function confirmDelete() {

  if (
    selectedProductId === null
  ) {

    closeDeleteModal();

    return;

  }


  products =
    products.filter(
      function(product) {

        return product.id !==
          selectedProductId;

      }
    );


  /*
   * Also remove deleted
   * product from current cart.
   */

  cart =
    cart.filter(
      function(item) {

        return item.id !==
          selectedProductId;

      }
    );


  saveProducts();


  displayProducts(
    products
  );


  updateCartBar();


  selectedProductId =
    null;


  closeDeleteModal();

}


/* =====================================
   CLOSE MENU WHEN CLICK OUTSIDE
===================================== */

document.addEventListener(
  "click",
  function(event) {

    const menu =
      document.getElementById(
        "itemMenu"
      );


    if (!menu) return;


    if (
      !menu.contains(
        event.target
      ) &&
      !event.target.closest(
        ".more-btn"
      )
    ) {

      closeItemMenu();

    }

  }
);


/* =====================================
   PREVENT MODAL BACKGROUND SCROLL
===================================== */

function toggleMenu() {

  alert(
    "Menu will be added here."
  );

}
/* =====================================
   SRI HOTEL BILLING SYSTEM
   APP.JS - PART 2/2
===================================== */


/* =====================================
   OPEN BILL
===================================== */

function openBill() {

  const billPage =
    document.getElementById(
      "billPage"
    );


  if (!billPage) return;


  displayBill();


  billPage.classList.remove(
    "hidden"
  );


  document.body.style.overflow =
    "hidden";

}


/* =====================================
   CLOSE BILL
===================================== */

function closeBill() {

  const billPage =
    document.getElementById(
      "billPage"
    );


  if (!billPage) return;


  billPage.classList.add(
    "hidden"
  );


  document.body.style.overflow =
    "";

}


/* =====================================
   DISPLAY BILL
===================================== */

function displayBill() {

  const container =
    document.getElementById(
      "billItems"
    );


  if (!container) return;


  container.innerHTML = "";


  if (
    cart.length === 0
  ) {

    container.innerHTML = `
      <div class="empty-food">
        No items added to bill.
      </div>
    `;

    updateBillTotal();

    return;

  }


  cart.forEach(
    function(item) {

      const row =
        document.createElement(
          "div"
        );


      row.className =
        "bill-item";


      row.innerHTML = `

        <div>

          <div class="bill-item-name">
  ${escapeHTML(
    item.name
  )}

  ${
    item.tamilName
      ? `(${escapeHTML(
          item.tamilName
        )})`
      : ""
  }
</div>

          <div class="bill-item-price">
            ₹${item.price} each
          </div>

        </div>


        <div class="bill-qty">

          <button
            onclick="
              changeQuantity(
                ${item.id},
                -1
              )
            "
          >
            −
          </button>


          <strong>
            ${item.quantity}
          </strong>


          <button
            onclick="
              changeQuantity(
                ${item.id},
                1
              )
            "
          >
            +
          </button>

        </div>


        <div class="bill-item-total">
  ₹${(
    item.price *
    item.quantity
  ).toFixed(0)}
</div>

<button
  class="bill-delete-btn"
  onclick="deleteBillItem(${item.id})"
>
  🗑️
</button>

      `;


      container.appendChild(
        row
      );

    }
  );


  updateBillTotal();

}


/* =====================================
   CHANGE QUANTITY
===================================== */

function changeQuantity(
  id,
  amount
) {

  const item =
    cart.find(
      function(product) {

        return product.id === id;

      }
    );


  if (!item) return;


  item.quantity +=
    amount;


  if (
    item.quantity <= 0
  ) {

    cart =
      cart.filter(
        function(product) {

          return product.id !==
            id;

        }
      );

  }


  displayBill();


  updateCartBar();

}
/* =====================================
   DELETE SINGLE BILL ITEM
===================================== */

function deleteBillItem(id) {

  cart =
    cart.filter(
      function(item) {
        return item.id !== id;
      }
    );

  displayBill();

  updateCartBar();

}


/* =====================================
   CLEAR CART
===================================== */

function clearCart() {

  if (
    cart.length === 0
  ) {

    return;

  }


  const confirmed =
    confirm(
      "Clear current bill?"
    );


  if (!confirmed) {

    return;

  }


  cart = [];


  const discount =
    document.getElementById(
      "discount"
    );


  if (discount) {

    discount.value = 0;

  }


  displayBill();


  updateCartBar();

}


/* =====================================
   UPDATE BILL TOTAL
===================================== */

function updateBillTotal() {

  let subtotal = 0;


  cart.forEach(
    function(item) {

      subtotal +=
        item.price *
        item.quantity;

    }
  );


  const discountInput =
    document.getElementById(
      "discount"
    );


  const discount =
    discountInput

      ? Number(
          discountInput.value
        ) || 0

      : 0;


  const total =
    Math.max(
      0,
      subtotal - discount
    );


  const subtotalElement =
    document.getElementById(
      "billSubtotal"
    );


  const totalElement =
    document.getElementById(
      "billTotal"
    );


  if (subtotalElement) {

    subtotalElement.textContent =
      `₹${subtotal.toFixed(0)}`;

  }


  if (totalElement) {

    totalElement.textContent =
      `₹${total.toFixed(0)}`;

  }

}


/* =====================================
   PAYMENT METHOD
===================================== */

function selectPayment(
  method,
  button
) {

  selectedPayment =
    method;


  document
    .querySelectorAll(
      ".payment"
    )
    .forEach(
      function(btn) {

        btn.classList.remove(
          "active"
        );

      }
    );


  if (button) {

    button.classList.add(
      "active"
    );

  }

}


/* =====================================
   SAVE BILL
===================================== */

function saveBillRecord() {

  if (
    cart.length === 0
  ) {

    return null;

  }


  const discountInput =
    document.getElementById(
      "discount"
    );


  const discount =
    discountInput

      ? Number(
          discountInput.value
        ) || 0

      : 0;


  const subtotal =
    cart.reduce(
      function(sum, item) {

        return sum +
          (
            item.price *
            item.quantity
          );

      },
      0
    );


  const total =
    Math.max(
      0,
      subtotal - discount
    );


  let billNumber =
    Number(
      localStorage.getItem(
        "hotelBillNumber"
      )
    ) || 1;


  const now =
    new Date();


  const bill = {

    billNumber:
  "#" +
  String(
    billNumber
  ),

    date:
      now.toLocaleDateString(
        "en-IN"
      ),

    time:
      now.toLocaleTimeString(
        "en-IN"
      ),

    items:
      cart.map(
        function(item) {

          return {

            id:
              item.id,

          name:
  item.name,

tamilName:
  item.tamilName || "",

price:
  item.price,

            quantity:
              item.quantity,

            total:
              item.price *
              item.quantity

          };

        }
      ),

    subtotal:
      subtotal,

    discount:
      discount,

    total:
      total,

    payment:
      selectedPayment

  };


  let bills = [];


  try {

    bills =
      JSON.parse(
        localStorage.getItem(
          "savedBills"
        ) || "[]"
      );

  } catch (error) {

    bills = [];

  }


  bills.push(
    bill
  );
  // Save bill to Firebase Firestore
if (typeof db !== "undefined") {

  db.collection("bills")
    .add(bill)
    .then(function() {

      console.log(
        "Bill saved to Firebase:",
        bill.billNumber
      );

    })
    .catch(function(error) {

      console.error(
        "Firebase bill save error:",
        error
      );

    });

}


  localStorage.setItem(
    "savedBills",
    JSON.stringify(
      bills
    )
  );


  localStorage.setItem(
    "hotelBillNumber",
    billNumber + 1
  );


  return bill;

}


/* =====================================
   PRINT BILL
===================================== */

function printBill() {

  if (
    cart.length === 0
  ) {

    alert(
      "Please add food items first."
    );

    return;

  }


  const discountInput =
    document.getElementById(
      "discount"
    );


  const discount =
    discountInput

      ? Number(
          discountInput.value
        ) || 0

      : 0;


  const subtotal =
    cart.reduce(
      function(sum, item) {

        return sum +
          (
            item.price *
            item.quantity
          );

      },
      0
    );


  const total =
    Math.max(
      0,
      subtotal - discount
    );


  let billNumber =
    Number(
      localStorage.getItem(
        "hotelBillNumber"
      )
    ) || 1;


  const currentBill =
    "#" +
    String(
      billNumber
    ).padStart(
      6,
      "0"
    );


  const now =
    new Date();


  const date =
    now.toLocaleDateString(
      "en-IN"
    );


  const time =
    now.toLocaleTimeString(
      "en-IN",
      {
        hour:
          "2-digit",

        minute:
          "2-digit"
      }
    );


  const receipt =
    document.getElementById(
      "receiptPrint"
    );


  if (!receipt) {

    alert(
      "Receipt area is missing."
    );

    return;

  }


  let receiptHTML = `

    <div class="receipt-title">
      SRI HOTEL
    </div>

    <div class="receipt-center">
      Good Food - Happy People
    </div>

    <div class="receipt-center">
      Phone: 9876543210
    </div>

    <div class="receipt-line"></div>

    <div>
      Bill No: ${currentBill}
    </div>

    <div>
      Date: ${date}
    </div>

    <div>
      Time: ${time}
    </div>

    <div class="receipt-line"></div>

    <div class="receipt-row">

      <strong>
        Item
      </strong>

      <strong>
        Qty
      </strong>

      <strong>
        Amount
      </strong>

    </div>

  `;


  cart.forEach(
    function(item) {

      const itemTotal =
        item.price *
        item.quantity;


      receiptHTML += `

        <div class="receipt-row">

          <span class="receipt-item">
            ${escapeHTML(
              item.name
            )}
          </span>

          <span class="receipt-qty">
            ${item.quantity}
          </span>

          <span class="receipt-price">
            ₹${itemTotal}
          </span>

        </div>

      `;

    }
  );


  receiptHTML += `

    <div class="receipt-line"></div>

    <div class="receipt-row">

      <span>
        Subtotal
      </span>

      <span>
        ₹${subtotal}
      </span>

    </div>


    <div class="receipt-row">

      <span>
        Discount
      </span>

      <span>
        ₹${discount}
      </span>

    </div>


    <div class="receipt-line"></div>


    <div class="receipt-row receipt-total">

      <span>
        TOTAL
      </span>

      <span>
        ₹${total}
      </span>

    </div>


    <div class="receipt-row">

      <span>
        Payment
      </span>

      <span>
        ${selectedPayment}
      </span>

    </div>


    <div class="receipt-line"></div>


    <div class="thank-you">
      THANK YOU!
    </div>

    <div class="thank-you">
      VISIT AGAIN
    </div>

  `;


  receipt.innerHTML =
    receiptHTML;


  /*
   * Save the bill only once.
   */

  saveBillRecord();


// Clear current bill for next customer
cart = [];

const discountElement =
  document.getElementById(
    "discount"
  );

if (discountElement) {
  discountElement.value = 0;
}

displayBill();

updateCartBar();


setTimeout(
  function() {

    window.print();

  },
  400
);
}


/* =====================================
   INITIAL LOAD
===================================== */

displayProducts(
  products
);


updateCartBar();


/* =====================================
   ESCAPE KEY
===================================== */

document.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key === "Escape"
    ) {

      closeItemMenu();

      closeItemModal();

      closeDeleteModal();

    }

  }
);
/* =====================================
   RECEIPT PREVIEW
===================================== */

function previewBill() {

  if (cart.length === 0) {

    alert(
      "Please add food items first."
    );

    return;

  }


  const discountInput =
    document.getElementById(
      "discount"
    );


  const discount =
    discountInput
      ? Number(
          discountInput.value
        ) || 0
      : 0;


  const subtotal =
    cart.reduce(
      function(sum, item) {

        return sum +
          (
            item.price *
            item.quantity
          );

      },
      0
    );


  const total =
    Math.max(
      0,
      subtotal - discount
    );


  const billNumber =
    Number(
      localStorage.getItem(
        "hotelBillNumber"
      )
    ) || 1;


  const billNo =
    "#" +
    String(
      billNumber
    ).padStart(
      6,
      "0"
    );


  const now =
    new Date();


  const date =
    now.toLocaleDateString(
      "en-IN"
    );


  const time =
    now.toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit"
      }
    );


  const container =
    document.getElementById(
      "previewReceiptContent"
    );


  if (!container) return;


  let itemsHTML = "";


  cart.forEach(
    function(item) {

      const itemTotal =
        item.price *
        item.quantity;


      itemsHTML += `

        <div class="preview-item-row">

          <div>
            ${escapeHTML(
  item.name
)}

${
  item.tamilName
    ? `(${escapeHTML(
        item.tamilName
      )})`
    : ""
}
          </div>

          <div>
            ${item.quantity}
          </div>

          <div>
            ₹${item.price}
          </div>

          <div>
            ₹${itemTotal}
          </div>

        </div>

      `;

    }
  );


  container.innerHTML = `

    <div class="preview-hotel-name">
      SRI HOTEL
    </div>


    <div class="preview-subtitle">
      Good Food &nbsp; Happy People
    </div>


    <div class="preview-contact">
      Phone: 9876543210
    </div>


    <div class="preview-dashed"></div>


    <div class="preview-info">

      <div>
        Bill No: ${billNo}
      </div>

      <div>
        Date: ${date}
      </div>

      <div>
        Time: ${time}
      </div>

      <div>
        Payment: ${selectedPayment}
      </div>

    </div>


    <div class="preview-dashed"></div>


    <div class="preview-table-head">

      <div>Item</div>

      <div>Qty</div>

      <div>Rate</div>

      <div>Amount</div>

    </div>


    ${itemsHTML}


    <div class="preview-dashed"></div>


    <div class="preview-totals">

      <div class="preview-total-row">

        <span>
          Subtotal
        </span>

        <strong>
          ₹${subtotal}
        </strong>

      </div>


      <div class="preview-total-row">

        <span>
          Discount
        </span>

        <strong>
          ₹${discount}
        </strong>

      </div>


      <div
        class="preview-total-row preview-grand-total"
      >

        <span>
          Total
        </span>

        <strong>
          ₹${total}
        </strong>

      </div>

    </div>


    <div class="preview-thank-you">
      Thank You!
    </div>


    <div class="preview-visit">
      Visit Again!
    </div>


    <div class="preview-footer">
      Good Food Brings Good Mood
    </div>

  `;


  document
    .getElementById(
      "receiptPreviewOverlay"
    )
    .classList.remove(
      "hidden"
    );

}


/* =====================================
   CLOSE RECEIPT PREVIEW
===================================== */

function closeReceiptPreview() {

  const overlay =
    document.getElementById(
      "receiptPreviewOverlay"
    );


  if (overlay) {

    overlay.classList.add(
      "hidden"
    );

  }

}


/* =====================================
   SHARE BILL
===================================== */

function shareBill() {

  const text =
    createShareText();


  if (
    navigator.share
  ) {

    navigator.share({

      title:
        "SRI HOTEL Bill",

      text:
        text

    }).catch(
      function() {}
    );

  } else {

    navigator.clipboard
      .writeText(text)
      .then(
        function() {

          alert(
            "Bill copied successfully."
          );

        }
      )
      .catch(
        function() {

          alert(
            "Sharing is not supported on this device."
          );

        }
      );

  }

}


/* =====================================
   SHARE TEXT
===================================== */

function createShareText() {

  let text =
    "SRI HOTEL\n\n";


  cart.forEach(
    function(item) {

      text +=
        `${item.name} x ${item.quantity} = ₹${
          item.price *
          item.quantity
        }\n`;

    }
  );


  const discountInput =
    document.getElementById(
      "discount"
    );


  const discount =
    discountInput
      ? Number(
          discountInput.value
        ) || 0
      : 0;


  const subtotal =
    cart.reduce(
      function(sum, item) {

        return sum +
          (
            item.price *
            item.quantity
          );

      },
      0
    );


  const total =
    Math.max(
      0,
      subtotal - discount
    );


  text +=
    `\nSubtotal: ₹${subtotal}`;


  text +=
    `\nDiscount: ₹${discount}`;


  text +=
    `\nTOTAL: ₹${total}`;


  text +=
    `\nPayment: ${selectedPayment}`;


  text +=
    "\n\nThank You! Visit Again!";


  return text;

}
/* =====================================
   BOTTOM NAVIGATION
===================================== */

function goToBilling() {

  closeReports();

  closeSalesHistory();

  closeSavedBillDetail();
document
  .getElementById(
    "monthlyReportDetailsPage"
  )
  ?.classList.add("hidden");

document
  .getElementById(
    "dailyReportDetailsPage"
  )
  ?.classList.add("hidden");
  document
    .querySelectorAll(".bottom-nav-item")
    .forEach(function(item) {
      item.classList.remove("active");
    });

  document
    .querySelector(
      ".bottom-nav-item:nth-child(1)"
    )
    .classList.add("active");

}


function goToHistory() {

  closeReports();

  closeSavedBillDetail();

  document
    .querySelectorAll(".bottom-nav-item")
    .forEach(function(item) {
      item.classList.remove("active");
    });

  document
    .querySelector(
      ".bottom-nav-item:nth-child(2)"
    )
    .classList.add("active");

  openSalesHistory();

}


function goToReports() {

  // Active Reports button
  document
    .querySelectorAll(".bottom-nav-item")
    .forEach(function(item) {
      item.classList.remove("active");
    });

  const button =
    document.querySelector(
      ".bottom-nav-item:nth-child(3)"
    );

  if (button) {
    button.classList.add("active");
  }


  // Close other pages
  closeBill();
  closeSalesHistory();
  closeSavedBillDetail();
  document
  .getElementById(
    "monthlyReportDetailsPage"
  )
  ?.classList.add("hidden");

document
  .getElementById(
    "dailyReportDetailsPage"
  )
  ?.classList.add("hidden");


  // Get Reports page
  const reportsPage =
    document.getElementById(
      "reportsPage"
    );

  if (!reportsPage) {
    alert("Reports page not found.");
    return;
  }


  // SHOW REPORTS FIRST
  reportsPage.classList.remove(
    "hidden"
  );

  document.body.style.overflow =
    "hidden";


  // Render after opening
  try {

    renderReports();

  } catch (error) {

    console.error(
      "Reports error:",
      error
    );

    alert(
      "Reports opened, but report data has an error."
    );

  }

}


function goToSettings() {

  document
    .querySelectorAll(".bottom-nav-item")
    .forEach(function(item) {

      item.classList.remove("active");

    });

  document
    .querySelector(
      ".bottom-nav-item:nth-child(4)"
    )
    .classList.add("active");

  alert(
    "Settings page will be added next."
  );

}
/* =====================================
   SALES HISTORY
===================================== */

let selectedHistoryBill = null;


/* =====================================
   OPEN HISTORY
===================================== */

function openSalesHistory() {

  const page =
    document.getElementById(
      "salesHistoryPage"
    );

  if (!page) return;

syncBillsFromFirebase();

setTimeout(function() {

  displaySalesHistory();

}, 500);
  


  page.classList.remove(
    "hidden"
  );


  document.body.style.overflow =
    "hidden";

}


/* =====================================
   CLOSE HISTORY
===================================== */

function closeSalesHistory() {

  const page =
    document.getElementById(
      "salesHistoryPage"
    );

  if (!page) return;


  page.classList.add(
    "hidden"
  );


  document.body.style.overflow =
    "";

}


/* =====================================
   GET HISTORY BILLS
===================================== */

function getHistoryBills() {

  try {

    return JSON.parse(
      localStorage.getItem(
        "savedBills"
      ) || "[]"
    );

  } catch (error) {

    return [];

  }

}

/* =====================================
   SYNC FIREBASE BILLS
===================================== */

function syncBillsFromFirebase() {

  if (typeof db === "undefined") {
    return;
  }

  db.collection("bills")
    .get()
    .then(function(snapshot) {

      const firebaseBills = [];

      snapshot.forEach(function(doc) {

        firebaseBills.push(
          doc.data()
        );

      });

      // Firebase is the main source
      // of saved bills
      localStorage.setItem(
        "savedBills",
        JSON.stringify(
          firebaseBills
        )
      );

      console.log(
        "Firebase bills synced:",
        firebaseBills.length
      );

    })
    .catch(function(error) {

      console.error(
        "Firebase history sync error:",
        error
      );

    });

}


/* =====================================
   DISPLAY HISTORY
===================================== */
function getHistoryDateTitle(dateString) {

  const billDate =
    parseSavedBillDate(dateString);

  if (!billDate) {
    return dateString;
  }

  const today = new Date();

  const yesterday = new Date();

  yesterday.setDate(
    yesterday.getDate() - 1
  );

  if (
    getDateKey(billDate) ===
    getDateKey(today)
  ) {
    return "Today";
  }

  if (
    getDateKey(billDate) ===
    getDateKey(yesterday)
  ) {
    return "Yesterday";
  }

  return billDate.toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "numeric",
      year: "2-digit",
      weekday: "short"
    }
  );
}


function displaySalesHistory(
  searchText = ""
) {

  const bills =
    getHistoryBills();


  const list =
    document.getElementById(
      "historyBillList"
    );


  if (!list) return;


  const search =
    searchText
      .toLowerCase()
      .trim();


  let filtered =
    bills;


  if (search) {

  filtered =
    bills.filter(
      function(bill) {

        const billNumber =
          String(
            bill.billNumber || ""
          )
            .toLowerCase();

        const billDate =
          String(
            bill.date || ""
          )
            .toLowerCase();

        return (
          billNumber.includes(search) ||
          billDate.includes(search)
        );

      }
    );

  }


  const totalSales =
    bills.reduce(
      function(sum, bill) {

        return sum +
          Number(
            bill.total
          );

      },
      0
    );


  const countElement =
    document.getElementById(
      "historyBillCount"
    );


  const totalBillsElement =
    document.getElementById(
      "historyTotalBills"
    );


  const totalSalesElement =
    document.getElementById(
      "historyTotalSales"
    );


  if (countElement) {

    countElement.textContent =
      bills.length;

  }


  if (totalBillsElement) {

    totalBillsElement.textContent =
      bills.length;

  }


  if (totalSalesElement) {

    totalSalesElement.textContent =
      `₹${totalSales.toFixed(0)}`;

  }


  list.innerHTML = "";


  if (
    filtered.length === 0
  ) {

    list.innerHTML = `
      <div class="history-empty">
        No saved bills found.
      </div>
    `;

    return;

  }


  /*
   * Newest bill first
   */

  const reversed =
    [...filtered].reverse();
  
const historyGroups = {};

reversed.forEach(function(bill) {

  const title =
    getHistoryDateTitle(bill.date);

  if (!historyGroups[title]) {
    historyGroups[title] = [];
  }

  historyGroups[title].push(bill);

});

  Object.keys(historyGroups).forEach(
  function(title) {

    const billsForDate =
      historyGroups[title];

    const dateHeader =
      document.createElement("div");

    dateHeader.className =
      "history-date-title";

    dateHeader.innerHTML = `
      <strong>
        ${escapeHTML(title)}
      </strong>

      <span>
        ${billsForDate.length}
        ${billsForDate.length === 1 ? "Bill" : "Bills"}
      </span>
    `;

    list.appendChild(dateHeader);


    billsForDate.forEach(
      function(bill) {

        const card =
          document.createElement("div");

        card.className =
          "history-bill-card";


        const itemCount =
          bill.items
            ? bill.items.reduce(
                function(total, item) {

                  return total +
                    Number(
                      item.quantity
                    );

                },
                0
              )
            : 0;


        card.innerHTML = `

          <div class="history-icon">
            🧾
          </div>


          <div class="history-main">

            <strong>
              ${escapeHTML(
                bill.billNumber
              )}
            </strong>

            <small>
              ${escapeHTML(
                bill.time
              )}
              •
              ${itemCount} Items
              •
              ${escapeHTML(
                bill.payment
              )}
            </small>

          </div>


          <div class="history-amount">
            ₹${Number(
              bill.total
            ).toFixed(0)}
          </div>


          <div class="history-arrow">
            ›
          </div>

        `;


        card.onclick =
          function() {

            openSavedBillDetail(
              bill
            );

          };


        list.appendChild(
          card
        );

      }
    );

  }
);
  
}


/* =====================================
   SEARCH HISTORY
===================================== */

function searchHistory() {

  const input =
    document.getElementById(
      "historySearch"
    );


  if (!input) return;


  displaySalesHistory(
    input.value
  );

}


/* =====================================
   OPEN SAVED BILL DETAIL
===================================== */

function openSavedBillDetail(
  bill
) {

  if (!bill) return;


  selectedHistoryBill =
    bill;


  const page =
    document.getElementById(
      "savedBillDetailPage"
    );


  const numberElement =
    document.getElementById(
      "detailBillNumber"
    );


  if (!page) return;


  if (numberElement) {

    numberElement.textContent =
      bill.billNumber;

  }


  renderSavedBill(
    bill
  );


  page.classList.remove(
    "hidden"
  );


  document.body.style.overflow =
    "hidden";

}


/* =====================================
   CLOSE SAVED BILL DETAIL
===================================== */

function closeSavedBillDetail() {

  const page =
    document.getElementById(
      "savedBillDetailPage"
    );


  if (!page) return;


  page.classList.add(
    "hidden"
  );


  document.body.style.overflow =
    "";

}


/* =====================================
   RENDER SAVED BILL
===================================== */

function renderSavedBill(
  bill
) {

  const container =
    document.getElementById(
      "savedBillReceipt"
    );


  if (!container) return;


  let itemsHTML = "";


  if (
    bill.items &&
    bill.items.length
  ) {

    bill.items.forEach(
      function(item) {

        itemsHTML += `

          <div class="saved-item-row">

          <div>
  ${escapeHTML(
    item.name
  )}

  ${
    item.tamilName
      ? `(${escapeHTML(
          item.tamilName
        )})`
      : ""
  }
</div>

            <div>
              ${item.quantity}
            </div>

            <div>
              ₹${Number(
                item.price
              ).toFixed(0)}
            </div>

            <div>
              ₹${Number(
                item.total ||
                (
                  item.price *
                  item.quantity
                )
              ).toFixed(0)}
            </div>

          </div>

        `;

      }
    );

  }


  container.innerHTML = `

    <div class="saved-receipt-title">
      SRI HOTEL
    </div>


    <div class="saved-receipt-subtitle">
      Good Food • Happy People
    </div>


    <div class="saved-receipt-subtitle">
      Phone: 9876543210
    </div>


    <div class="saved-receipt-line"></div>


    <div class="saved-receipt-info">

      <div>
        Bill No: ${escapeHTML(
          bill.billNumber
        )}
      </div>

      <div>
        Date: ${escapeHTML(
          bill.date
        )}
      </div>

      <div>
        Time: ${escapeHTML(
          bill.time
        )}
      </div>

      <div>
        Payment: ${escapeHTML(
          bill.payment
        )}
      </div>

    </div>


    <div class="saved-receipt-line"></div>


    <div class="saved-table-head">

      <div>Item</div>
      <div>Qty</div>
      <div>Rate</div>
      <div>Amount</div>

    </div>


    ${itemsHTML}


    <div class="saved-receipt-line"></div>


    <div class="saved-totals">

      <div class="saved-total-row">

        <span>
          Subtotal
        </span>

        <strong>
          ₹${Number(
            bill.subtotal
          ).toFixed(0)}
        </strong>

      </div>


      <div class="saved-total-row">

        <span>
          Discount
        </span>

        <strong>
          ₹${Number(
            bill.discount
          ).toFixed(0)}
        </strong>

      </div>


      <div
        class="saved-total-row saved-grand-total"
      >

        <span>
          Total
        </span>

        <strong>
          ₹${Number(
            bill.total
          ).toFixed(0)}
        </strong>

      </div>

    </div>


    <div class="saved-thank-you">
      Thank You!
    </div>


    <div class="saved-visit">
      Visit Again!
    </div>

  `;

}


/* =====================================
   PRINT OLD SAVED BILL
===================================== */

function printSavedBill() {

  const bill =
    selectedHistoryBill;


  if (!bill) {

    alert(
      "Saved bill not found."
    );

    return;

  }


  const receipt =
    document.getElementById(
      "receiptPrint"
    );


  if (!receipt) {

    alert(
      "Receipt area is missing."
    );

    return;

  }


  let html = `

    <div class="receipt-title">
      SRI HOTEL
    </div>

    <div class="receipt-center">
      Good Food - Happy People
    </div>

    <div class="receipt-center">
      Phone: 9876543210
    </div>

    <div class="receipt-line"></div>

    <div>
      Bill No: ${escapeHTML(
        bill.billNumber
      )}
    </div>

    <div>
      Date: ${escapeHTML(
        bill.date
      )}
    </div>

    <div>
      Time: ${escapeHTML(
        bill.time
      )}
    </div>

    <div class="receipt-line"></div>

  `;


  if (
    bill.items &&
    bill.items.length
  ) {

    bill.items.forEach(
      function(item) {

        const amount =
          item.total ||
          (
            item.price *
            item.quantity
          );


        html += `

          <div class="receipt-row">

            <span class="receipt-item">
              ${escapeHTML(
                item.name
              )}
            </span>

            <span class="receipt-qty">
              ${item.quantity}
            </span>

            <span class="receipt-price">
              ₹${amount}
            </span>

          </div>

        `;

      }
    );

  }


  html += `

    <div class="receipt-line"></div>

    <div class="receipt-row">

      <span>
        Subtotal
      </span>

      <span>
        ₹${Number(
          bill.subtotal
        ).toFixed(0)}
      </span>

    </div>


    <div class="receipt-row">

      <span>
        Discount
      </span>

      <span>
        ₹${Number(
          bill.discount
        ).toFixed(0)}
      </span>

    </div>


    <div class="receipt-line"></div>


    <div class="receipt-row receipt-total">

      <span>
        TOTAL
      </span>

      <span>
        ₹${Number(
          bill.total
        ).toFixed(0)}
      </span>

    </div>


    <div class="receipt-row">

      <span>
        Payment
      </span>

      <span>
        ${escapeHTML(
          bill.payment
        )}
      </span>

    </div>


    <div class="receipt-line"></div>


    <div class="thank-you">
      THANK YOU!
    </div>

    <div class="thank-you">
      VISIT AGAIN
    </div>

  `;


  receipt.innerHTML =
    html;


  /*
   * IMPORTANT:
   *
   * We do NOT call saveBill().
   *
   * This is an old bill.
   * Printing it must not create
   * another bill.
   */

  setTimeout(
    function() {

      window.print();

    },
    300
  );

}


/* =====================================
   SHARE SAVED BILL
===================================== */

function shareSavedBill() {

  const bill =
    selectedHistoryBill;


  if (!bill) return;


  let text =
    `SRI HOTEL\n\n`;


  text +=
    `Bill No: ${bill.billNumber}\n`;


  text +=
    `Date: ${bill.date}\n`;


  text +=
    `Time: ${bill.time}\n\n`;


  if (
    bill.items &&
    bill.items.length
  ) {

    bill.items.forEach(
      function(item) {

        text +=
          `${item.name} x ${item.quantity} = ₹${
            item.total ||
            (
              item.price *
              item.quantity
            )
          }\n`;

      }
    );

  }


  text +=
    `\nSubtotal: ₹${bill.subtotal}`;


  text +=
    `\nDiscount: ₹${bill.discount}`;


  text +=
    `\nTOTAL: ₹${bill.total}`;


  text +=
    `\nPayment: ${bill.payment}`;


  text +=
    "\n\nThank You! Visit Again!";


  if (
    navigator.share
  ) {

    navigator.share({

      title:
        `SRI HOTEL ${bill.billNumber}`,

      text:
        text

    }).catch(
      function() {}
    );

  } else {

    navigator.clipboard
      .writeText(text)
      .then(
        function() {

          alert(
            "Bill copied successfully."
          );

        }
      );

  }

}


/* =====================================
   DELETE SAVED BILL
===================================== */

function deleteSavedBill() {

  const bill =
    selectedHistoryBill;

  if (!bill) return;


  const confirmed =
    confirm(
      `Delete ${bill.billNumber}?`
    );

  if (!confirmed) return;


  let bills =
    getHistoryBills();


  bills =
    bills.filter(
      function(item) {

        return item.billNumber !==
          bill.billNumber;

      }
    );


  localStorage.setItem(
    "savedBills",
    JSON.stringify(
      bills
    )
  );


  // Delete the same bill from Firebase
  if (typeof db !== "undefined") {

    db.collection("bills")
      .where(
        "billNumber",
        "==",
        bill.billNumber
      )
      .get()
      .then(function(snapshot) {

        const deletePromises = [];

        snapshot.forEach(
          function(doc) {

            deletePromises.push(
              doc.ref.delete()
            );

          }
        );

        return Promise.all(
          deletePromises
        );

      })
      .then(function() {

        console.log(
          "Bill deleted from Firebase:",
          bill.billNumber
        );

      })
      .catch(function(error) {

        console.error(
          "Firebase delete error:",
          error
        );

      });

  }


  selectedHistoryBill =
    null;


  closeSavedBillDetail();


  displaySalesHistory();

}
/* =====================================
   REPORTS
===================================== */

let reportMonth =
  new Date();

let reportLatestFirst =
  true;


/* =====================================
   OPEN REPORTS
===================================== */



/* =====================================
   CLOSE REPORTS
===================================== */

function closeReports() {

  const page =
    document.getElementById(
      "reportsPage"
    );


  if (!page) return;


  page.classList.add(
    "hidden"
  );


  document.body.style.overflow =
    "";

}


/* =====================================
   GET MONTH INFO
===================================== */

function getReportMonthInfo() {

  const year =
    reportMonth.getFullYear();

  const month =
    reportMonth.getMonth();


  const firstDay =
    new Date(
      year,
      month,
      1
    );


  const lastDay =
    new Date(
      year,
      month + 1,
      0
    );


  return {
    year,
    month,
    firstDay,
    lastDay
  };

}


/* =====================================
   CHANGE MONTH
===================================== */

function changeReportMonth(
  amount
) {

  reportMonth =
    new Date(
      reportMonth.getFullYear(),
      reportMonth.getMonth() + amount,
      1
    );


  renderReports();

}


/* =====================================
   FORMAT MONTH
===================================== */

function formatMonthTitle(
  date
) {

  return date.toLocaleDateString(
    "en-IN",
    {
      month: "long",
      year: "numeric"
    }
  );

}


/* =====================================
   PARSE SAVED BILL DATE
===================================== */

function parseSavedBillDate(
  dateString
) {

  if (!dateString) {
    return null;
  }


  /*
   * Handles:
   *
   * 21/09/2026
   * 21/9/2026
   */

  const parts =
    dateString
      .split("/")
      .map(Number);


  if (
    parts.length === 3 &&
    parts.every(
      Number.isFinite
    )
  ) {

    return new Date(
  parts[2],
  parts[1] - 1,
  parts[0],
  12,
  0,
  0
);

  }


  /*
   * Fallback
   */

  const parsed =
    new Date(
      dateString
    );


  return isNaN(
    parsed.getTime()
  )
    ? null
    : parsed;

}


/* =====================================
   CHECK BILL IN MONTH
===================================== */

function billBelongsToMonth(
  bill,
  year,
  month
) {

  const date =
    parseSavedBillDate(
      bill.date
    );


  if (!date) {
    return false;
  }


  return (
    date.getFullYear() === year &&
    date.getMonth() === month
  );

}


/* =====================================
   REPORT DATA
===================================== */

function getReportData() {

  const bills =
  getHistoryBills();


  const info =
    getReportMonthInfo();


  const monthlyBills =
    bills.filter(
      function(bill) {

        return billBelongsToMonth(
          bill,
          info.year,
          info.month
        );

      }
    );


  let totalItems = 0;

  let totalAmount = 0;


  const daily = {};


  monthlyBills.forEach(
    function(bill) {

      const date =
        parseSavedBillDate(
          bill.date
        );


      if (!date) return;


      const day =
        String(
          date.getDate()
        ).padStart(
          2,
          "0"
        );


      const month =
        String(
          date.getMonth() + 1
        ).padStart(
          2,
          "0"
        );


      const dateKey =
        `${date.getFullYear()}-${month}-${day}`;


      /*
       * Count individual items.
       */

      const itemCount =
        (bill.items || []).reduce(
          function(sum, item) {

            return sum +
              Number(
                item.quantity
              );

          },
          0
        );


      totalItems +=
        itemCount;


      totalAmount +=
        Number(
          bill.total
        ) || 0;


      if (!daily[dateKey]) {

        daily[dateKey] = {

          date:
            date,

          totalItems:
            0,

          totalAmount:
            0,

          bills:
            []

        };

      }


      daily[dateKey].totalItems +=
        itemCount;


      daily[dateKey].totalAmount +=
        Number(
          bill.total
        ) || 0;


      daily[dateKey].bills.push(
        bill
      );

    }
  );


  return {

    monthlyBills,

    totalItems,

    totalAmount,

    daily

  };

}


/* =====================================
   RENDER REPORTS
===================================== */

function renderReports() {

  const data =
    getReportData();


  const info =
    getReportMonthInfo();


  const title =
    document.getElementById(
      "reportMonthTitle"
    );


  const range =
    document.getElementById(
      "reportDateRange"
    );


  if (title) {

    title.textContent =
      formatMonthTitle(
        reportMonth
      );

  }


  if (range) {

    const first =
      info.firstDay.toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric"
        }
      );


    const last =
      info.lastDay.toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric"
        }
      );


    range.textContent =
      `${first} – ${last}`;

  }


  const itemsElement =
    document.getElementById(
      "monthlyTotalItems"
    );


  const amountElement =
    document.getElementById(
      "monthlyTotalAmount"
    );


  if (itemsElement) {

    itemsElement.textContent =
      data.totalItems.toLocaleString(
        "en-IN"
      );

  }


  if (amountElement) {

    amountElement.textContent =
      `₹${data.totalAmount.toLocaleString(
        "en-IN"
      )}`;

  }


  renderDailyReports(
    data.daily
  );

}


/* =====================================
   RENDER DAILY REPORTS
===================================== */

function renderDailyReports(
  daily
) {

  const container =
    document.getElementById(
      "dailyReportList"
    );


  if (!container) return;


  container.innerHTML = "";


  let days =
    Object.values(
      daily
    );


  days.sort(
    function(a, b) {

      return reportLatestFirst
        ? b.date - a.date
        : a.date - b.date;

    }
  );


  if (
    days.length === 0
  ) {

    container.innerHTML = `

      <div class="daily-empty">
        No sales recorded for this month.
      </div>

    `;

    return;

  }


  days.forEach(
    function(day) {

      const card =
        document.createElement(
          "div"
        );


      card.className =
        "daily-report-card";


      const dayNumber =
        day.date.getDate();


      const monthYear =
        day.date.toLocaleDateString(
          "en-IN",
          {
            month: "short",
            year: "numeric"
          }
        );


      const weekday =
        day.date.toLocaleDateString(
          "en-IN",
          {
            weekday: "short"
          }
        );


      const dateKey =
        getDateKey(
          day.date
        );


      card.innerHTML = `

        <div class="daily-date">

          <strong>
            ${dayNumber}
          </strong>

          <span>
            ${monthYear}
          </span>

          <small>
            ${weekday}
          </small>

        </div>


        <div class="daily-stat">

          <div class="daily-stat-icon">
            📦
          </div>

          <div>

            <label>
              Total Items
            </label>

            <strong>
              ${day.totalItems.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>

        </div>


        <div class="daily-stat amount">

          <div class="daily-stat-icon">
            🪙
          </div>

          <div>

            <label>
              Total Amount
            </label>

            <strong>
              ₹${day.totalAmount.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>

        </div>


        <button
          class="daily-view-btn"
          onclick="
            openHistoryForDate(
              '${dateKey}'
            )
          "
        >
          View All ›
        </button>

      `;


      container.appendChild(
        card
      );

    }
  );

}


/* =====================================
   DATE KEY
===================================== */

function getDateKey(
  date
) {

  return [
    date.getFullYear(),

    String(
      date.getMonth() + 1
    ).padStart(
      2,
      "0"
    ),

    String(
      date.getDate()
    ).padStart(
      2,
      "0"
    )

  ].join("-");

}


/* =====================================
   SORT DAILY REPORT
===================================== */

function toggleReportSort() {

  reportLatestFirst =
    !reportLatestFirst;


  const button =
    document.getElementById(
      "reportSortButton"
    );


  if (button) {

    button.innerHTML =
      reportLatestFirst

        ? "↕ Latest First <span>⌄</span>"

        : "↕ Oldest First <span>⌄</span>";

  }


  renderReports();

}


/* =====================================
   MONTHLY REPORT DETAILS
===================================== */

function viewMonthlyItems() {

  openMonthlyReportDetails();

}


function viewMonthlyAmount() {

  openMonthlyReportDetails();

}


/* =====================================
   OPEN MONTHLY DETAILS
===================================== */

function openMonthlyReportDetails() {

  const page =
    document.getElementById(
      "monthlyReportDetailsPage"
    );

  if (!page) return;


  const data =
    getReportData();


  const info =
    getReportMonthInfo();


  const title =
    formatMonthTitle(
      reportMonth
    );


  const range =
    `${info.firstDay.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric"
      }
    )} – ${info.lastDay.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric"
      }
    )}`;


  document.getElementById(
    "monthlyDetailsMonth"
  ).textContent = title;


  document.getElementById(
    "monthlyDetailsTitle"
  ).textContent = title;


  document.getElementById(
    "monthlyDetailsRange"
  ).textContent = range;


  renderMonthlyItemDetails(
    data.monthlyBills
  );


  closeReports();


  page.classList.remove(
    "hidden"
  );


  document.body.style.overflow =
    "hidden";

}


/* =====================================
   RENDER MONTHLY ITEMS
===================================== */

function renderMonthlyItemDetails(
  bills
) {

  const list =
    document.getElementById(
      "monthlyItemList"
    );

  if (!list) return;


  const items = {};


  bills.forEach(
    function(bill) {

      (bill.items || []).forEach(
        function(item) {

          const key =
            String(
              item.name
            ).trim()
            .toLowerCase();


          if (!items[key]) {

  const product =
    products.find(
      function(p) {
        return String(p.name)
          .trim()
          .toLowerCase() ===
          String(item.name)
            .trim()
            .toLowerCase();
      }
    );

  items[key] = {

    name:
      item.name,

    tamilName:
      item.tamilName ||
      (product
        ? product.tamilName || ""
        : ""),

    quantity:
      0,

    amount:
      0

  };

          }


          items[key].quantity +=
            Number(
              item.quantity
            ) || 0;


          items[key].amount +=
            Number(
              item.total
            ) ||
            (
              Number(item.price) *
              Number(item.quantity)
            ) ||
            0;

        }
      );

    }
  );


  const rows =
    Object.values(items);


  list.innerHTML = "";


  rows.forEach(
    function(item, index) {

      const row =
        document.createElement(
          "div"
        );


      row.className =
        "report-item-row";


      row.innerHTML = `

        <span>
          ${index + 1}
        </span>

        <span>
  ${escapeHTML(
    item.name
  )}

  ${
    item.tamilName
      ? `(${escapeHTML(
          item.tamilName
        )})`
      : ""
  }
</span>

        <span>
          ${item.quantity}
        </span>

        <span>
          ₹${item.amount.toFixed(0)}
        </span>

      `;


      list.appendChild(row);

    }
  );


  document.getElementById(
    "monthlyDetailTotalItems"
  ).textContent =
    rows.reduce(
      function(sum, item) {

        return sum +
          item.quantity;

      },
      0
    );


  document.getElementById(
    "monthlyDetailTotalAmount"
  ).textContent =
    `₹${bills.reduce(
      function(sum, bill) {

        return sum +
          (
            Number(
              bill.total
            ) || 0
          );

      },
      0
    ).toFixed(0)}`;

}


/* =====================================
   CLOSE MONTHLY DETAILS
===================================== */

function closeMonthlyReportDetails() {

  const page =
    document.getElementById(
      "monthlyReportDetailsPage"
    );

  if (!page) return;


  page.classList.add(
    "hidden"
  );


  renderReports();


  const reportsPage =
    document.getElementById(
      "reportsPage"
    );

  if (reportsPage) {

    reportsPage.classList.remove(
      "hidden"
    );

  }


  document.body.style.overflow =
    "hidden";

}

/* =====================================
   OPEN DAILY REPORT DETAILS
===================================== */

function openHistoryForDate(
  dateKey
) {

  const data =
    getReportData();


  const day =
    data.daily[dateKey];


  if (!day) {

    alert(
      "No report found for this date."
    );

    return;

  }


  const page =
    document.getElementById(
      "dailyReportDetailsPage"
    );

  if (!page) return;


  const title =
    day.date.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    );


  const weekday =
    day.date.toLocaleDateString(
      "en-IN",
      {
        weekday: "long"
      }
    );


  document.getElementById(
    "dailyDetailsDate"
  ).textContent = title;


  document.getElementById(
    "dailyDetailsTitle"
  ).textContent = title;


  document.getElementById(
    "dailyDetailsWeekday"
  ).textContent = weekday;


  renderDailyItemDetails(
    day
  );


  closeReports();


  page.classList.remove(
    "hidden"
  );


  document.body.style.overflow =
    "hidden";

}


/* =====================================
   RENDER DAILY ITEMS
===================================== */

function renderDailyItemDetails(
  day
) {

  const list =
    document.getElementById(
      "dailyItemList"
    );

  if (!list) return;


  const items = {};


  day.bills.forEach(
    function(bill) {

      (bill.items || []).forEach(
        function(item) {

          const key =
            String(
              item.name
            ).trim()
            .toLowerCase();


        if (!items[key]) {

  const product =
    products.find(
      function(p) {
        return String(p.name)
          .trim()
          .toLowerCase() ===
          String(item.name)
            .trim()
            .toLowerCase();
      }
    );

  items[key] = {

    name:
      item.name,

    tamilName:
      item.tamilName ||
      (product
        ? product.tamilName || ""
        : ""),

    quantity:
      0,

    amount:
      0

  };

        }


          items[key].quantity +=
            Number(
              item.quantity
            ) || 0;


          items[key].amount +=
            Number(
              item.total
            ) ||
            (
              Number(item.price) *
              Number(item.quantity)
            ) ||
            0;

        }
      );

    }
  );


  const rows =
    Object.values(items);


  list.innerHTML = "";


  rows.forEach(
    function(item, index) {

      const row =
        document.createElement(
          "div"
        );


      row.className =
        "report-item-row";


      row.innerHTML = `

        <span>
          ${index + 1}
        </span>

        <span>
  ${escapeHTML(
    item.name
  )}

  ${
    item.tamilName
      ? `(${escapeHTML(
          item.tamilName
        )})`
      : ""
  }
</span>

        <span>
          ${item.quantity}
        </span>

        <span>
          ₹${item.amount.toFixed(0)}
        </span>

      `;


      list.appendChild(row);

    }
  );


  document.getElementById(
    "dailyDetailTotalItems"
  ).textContent =
    day.totalItems.toLocaleString(
      "en-IN"
    );


  document.getElementById(
    "dailyDetailTotalAmount"
  ).textContent =
    `₹${day.totalAmount.toFixed(0)}`;

}


/* =====================================
   CLOSE DAILY DETAILS
===================================== */

function closeDailyReportDetails() {

  const page =
    document.getElementById(
      "dailyReportDetailsPage"
    );

  if (!page) return;


  page.classList.add(
    "hidden"
  );


  renderReports();


  const reportsPage =
    document.getElementById(
      "reportsPage"
    );

  if (reportsPage) {

    reportsPage.classList.remove(
      "hidden"
    );

  }


  document.body.style.overflow =
    "hidden";

}



/* =====================================
   FILTER HISTORY BY DATE
===================================== */

function filterHistoryByDate(
  dateKey
) {

  const bills =
    getSavedBills();


  const list =
    document.getElementById(
      "historyBillList"
    );


  if (!list) return;


  const selectedBills =
    bills.filter(
      function(bill) {

        const date =
          parseSavedBillDate(
            bill.date
          );


        if (!date) {
          return false;
        }


        return (
          getDateKey(date) ===
          dateKey
        );

      }
    );


  list.innerHTML = "";


  if (
    selectedBills.length === 0
  ) {

    list.innerHTML = `

      <div class="history-empty">
        No bills found for this date.
      </div>

    `;

    return;

  }


  [...selectedBills]
    .reverse()
    .forEach(
      function(bill) {

        const card =
          document.createElement(
            "div"
          );


        card.className =
          "history-bill-card";


        const itemCount =
          (bill.items || []).reduce(
            function(sum, item) {

              return sum +
                Number(
                  item.quantity
                );

            },
            0
          );


        card.innerHTML = `

          <div class="history-icon">
            🧾
          </div>


          <div class="history-main">

            <strong>
              ${escapeHTML(
                bill.billNumber
              )}
            </strong>

            <small>
              ${escapeHTML(
                bill.time
              )}
              •
              ${itemCount} Items
              •
              ${escapeHTML(
                bill.payment
              )}
            </small>

          </div>


          <div class="history-amount">
            ₹${Number(
              bill.total
            ).toLocaleString(
              "en-IN"
            )}
          </div>


          <div class="history-arrow">
            ›
          </div>

        `;


        card.onclick =
          function() {

            openSavedBillDetail(
              bill
            );

          };


        list.appendChild(
          card
        );

      }
    );

}