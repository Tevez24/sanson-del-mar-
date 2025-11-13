lucide.replace();

// ===== Mock Data =====
const menuItems = [
  {
    id: 1,
    name: "Pizza Margherita",
    category: "Pizzas",
    description: "Pizza clásica con queso y tomate",
    price: 25000,
  },
  {
    id: 2,
    name: "Hamburguesa Clásica",
    category: "Hamburguesas",
    description: "Carne, queso y lechuga",
    price: 20000,
  },
  {
    id: 3,
    name: "Ensalada César",
    category: "Ensaladas",
    description: "Lechuga, pollo y aderezo César",
    price: 15000,
  },
  {
    id: 4,
    name: "Pizza Pepperoni",
    category: "Pizzas",
    description: "Pepperoni y extra queso",
    price: 28000,
  },
];

const state = { items: [], itemCount: 0 };
const categories = ["Todos", ...Array.from(new Set(menuItems.map((i) => i.category)))];
let selectedCategory = "Todos";

// ===== Elements =====
const searchInput = document.getElementById("searchInput");
const categoryButtonsDiv = document.getElementById("categoryButtons");
const menuItemsContainer = document.getElementById("menuItemsContainer");
const customMenuContainer = document.getElementById("customMenuContainer");
const cartBadge = document.getElementById("cartBadge");
const cartModal = document.getElementById("cartModal");
const openCartBtn = document.getElementById("openCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartTax = document.getElementById("cartTax");
const cartShipping = document.getElementById("cartShipping");
const cartTotal = document.getElementById("cartTotal");
const payBtn = document.getElementById("payBtn");

// ===== MenuCard Component =====
function MenuCard(item) {
  const card = document.createElement("div");
  card.className = "border rounded p-4 bg-white shadow";
  card.innerHTML = `
    <h3 class="font-bold text-lg mb-2">${item.name}</h3>
    <p class="text-muted-foreground mb-2">${item.description}</p>
    <p class="font-semibold mb-2">${item.price} COP</p>
    <button class="button-ocean w-full">Agregar al carrito</button>
  `;
  card.querySelector("button").addEventListener("click", () => addToCart(item));
  return card;
}

// ===== Custom Menu Creator =====
function CustomMenuCreator() {
  const container = document.createElement("div");
  container.className = "p-6 bg-gray-100 rounded";
  container.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">Crea tu Menú Mundial</h2>
    <p>Selecciona tus ingredientes y crea un plato personalizado.</p>
    <div class="mt-4">
      <label class="block mb-2 font-semibold">Nombre del Plato</label>
      <input type="text" class="border rounded w-full py-2 px-3" placeholder="Nombre del plato">
    </div>
    <div class="mt-4">
      <label class="block mb-2 font-semibold">Ingredientes</label>
      <input type="text" class="border rounded w-full py-2 px-3" placeholder="Lista de ingredientes">
    </div>
    <button class="button-ocean mt-4">Agregar al Menú</button>
  `;
  return container;
}
customMenuContainer.appendChild(CustomMenuCreator());

// ===== Render Functions =====
function renderCategoryButtons() {
  categoryButtonsDiv.innerHTML = "";
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.className = selectedCategory === cat ? "button-ocean" : "button-outline";
    btn.addEventListener("click", () => {
      selectedCategory = cat;
      renderCategoryButtons();
      renderMenuItems();
    });
    categoryButtonsDiv.appendChild(btn);
  });
}

function renderMenuItems() {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === "Todos" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  menuItemsContainer.innerHTML = "";
  const grouped = {};
  filtered.forEach((item) => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });

  if (selectedCategory === "Todos") {
    for (const [cat, items] of Object.entries(grouped)) {
      if (items.length === 0) continue;
      const section = document.createElement("div");
      section.className = "space-y-6";

      const title = document.createElement("h2");
      title.textContent = cat;
      title.className = "text-3xl font-bold text-ocean-blue";
      section.appendChild(title);

      const grid = document.createElement("div");
      grid.className = "grid md:grid-cols-2 lg:grid-cols-3 gap-6";

      items.forEach((item) => grid.appendChild(MenuCard(item)));

      section.appendChild(grid);
      menuItemsContainer.appendChild(section);
    }
  } else {
    const section = document.createElement("div");
    section.className = "space-y-6";

    const title = document.createElement("h2");
    title.textContent = selectedCategory;
    title.className = "text-3xl font-bold text-ocean-blue";
    section.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "grid md:grid-cols-2 lg:grid-cols-3 gap-6";

    filtered.forEach((item) => grid.appendChild(MenuCard(item)));

    section.appendChild(grid);
    menuItemsContainer.appendChild(section);
  }
}

// ===== Cart Functions =====
function addToCart(item) {
  const existing = state.items.find((i) => i.id === item.id);
  if (existing) existing.quantity++;
  else state.items.push({ ...item, quantity: 1 });
  updateCartCount();
  renderCartItems();
}

function removeFromCart(id) {
  state.items = state.items.filter((i) => i.id !== id);
  updateCartCount();
  renderCartItems();
}

function changeQuantity(id, delta) {
  const item = state.items.find((i) => i.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) removeFromCart(id);
  else renderCartItems();
  updateCartCount();
}

function updateCartCount() {
  const total = state.items.reduce((sum, i) => sum + i.quantity, 0);
  state.itemCount = total;
  cartBadge.textContent = total;
}

function renderCartItems() {
  cartItemsContainer.innerHTML = "";
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = subtotal * 0.19;
  const shipping = subtotal > 50000 ? 0 : 5000;
  const total = subtotal + tax + shipping;

  cartSubtotal.textContent = subtotal + " COP";
  cartTax.textContent = tax + " COP";
  cartShipping.textContent = shipping === 0 ? "Gratis" : shipping + " COP";
  cartTotal.textContent = total + " COP";

  state.items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "flex justify-between items-center border-b pb-2";

    div.innerHTML = `
      <div>
        <h4 class="font-semibold">${item.name}</h4>
        <p class="text-sm text-muted-foreground">${item.price} COP c/u</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="px-2 bg-gray-200 rounded">-</button>
        <span>${item.quantity}</span>
        <button class="px-2 bg-gray-200 rounded">+</button>
        <button class="px-2 text-red-500">x</button>
      </div>
    `;

    const [minusBtn, , plusBtn, delBtn] = div.querySelectorAll("button");
    minusBtn.addEventListener("click", () => changeQuantity(item.id, -1));
    plusBtn.addEventListener("click", () => changeQuantity(item.id, 1));
    delBtn.addEventListener("click", () => removeFromCart(item.id));

    cartItemsContainer.appendChild(div);
  });
}

// ===== Pay Button =====
payBtn.addEventListener("click", () => {
  if (state.items.length === 0) return alert("Carrito vacío");

  const now = new Date();
  const orderNumber = `MR-${now.getTime().toString().slice(-8)}`;
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = subtotal * 0.19;
  const shipping = subtotal > 50000 ? 0 : 5000;
  const total = subtotal + tax + shipping;

  let content = `RESTAURANTE SAZÓN DEL MAR\nComprobante de Pago\n\nNúmero de Orden: ${orderNumber}\nFecha: ${now.toLocaleDateString()}\n\nPRODUCTOS:\n`;
  state.items.forEach((i) => (content += `${i.name} x${i.quantity} = ${i.price * i.quantity} COP\n`));
  content += `\nSubtotal: ${subtotal} COP\nIVA: ${tax} COP\nEnvío: ${shipping} COP\nTOTAL: ${total} COP\n¡Gracias por tu compra!`;

  const blob = new Blob([content], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `comprobante-${orderNumber}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  state.items = [];
  updateCartCount();
  renderCartItems();
  cartModal.classList.add("hidden");
});

// ===== Event Listeners =====
searchInput.addEventListener("input", renderMenuItems);
renderCategoryButtons();
renderMenuItems();

openCartBtn.addEventListener("click", () => {
  cartModal.classList.remove("hidden");
  renderCartItems();
});

closeCartBtn.addEventListener("click", () => cartModal.classList.add("hidden"));

// Tabs
const tabRegular = document.getElementById("tabRegular");
const tabCustom = document.getElementById("tabCustom");
const contentRegular = document.getElementById("contentRegular");
const contentCustom = document.getElementById("contentCustom");

tabRegular.addEventListener("click", () => {
  tabRegular.classList.add("active");
  tabCustom.classList.remove("active");
  contentRegular.classList.remove("hidden");
  contentCustom.classList.add("hidden");
});

tabCustom.addEventListener("click", () => {
  tabCustom.classList.add("active");
  tabRegular.classList.remove("active");
  contentCustom.classList.remove("hidden");
  contentRegular.classList.add("hidden");
});
