/**
 * PALADAR RAIZ - CULINÁRIA CAIPIRA & MARMITAS CONGELADAS
 * Script Principal da Landing Page & Sistema de Pedidos
 */

// Catálogo de Produtos e Kits Iniciais da Semana
const PRODUCTS_DATA = [
  {
    id: 1,
    name: "Feijão Tropeiro Nobre com Bisteca & Couve",
    category: "classicos",
    categoryLabel: "Clássico da Roça",
    description: "Feijão al dente puxado na farinha de mandioca da fazenda, torresmo pururuca crocante, bisteca suína grelhada, ovos e couve fininha.",
    price: 28.90,
    oldPrice: 32.00,
    badge: "Mais Pedido",
    badgeType: "default",
    weight: "400g",
    heatTime: "6 min",
    image: "assets/prato_tropeiro.jpg",
    ingredients: "Feijão carioquinha, lombo e bisteca suína, farinha de mandioca artesanal, couve manteiga fresca, torresmo pururuca, ovos caipiras e pimenta biquinho."
  },
  {
    id: 2,
    name: "Kit Raiz Semanal (5 Marmitas Selecionadas)",
    category: "kits",
    categoryLabel: "Combo Especial",
    description: "5 refeições completas para sua semana de trabalho: 2 Tropeiros Nobres, 2 Galinhadas Caipiras e 1 Escondidinho de Mandioca.",
    price: 139.90,
    oldPrice: 158.00,
    badge: "12% OFF",
    badgeType: "promo",
    weight: "5 x 400g",
    heatTime: "5 a 7 min",
    image: "assets/kits_hero.jpg",
    ingredients: "Variedade balanceada preparada pela Chef Maria Rosa com selo de ultracongelamento individual."
  },
  {
    id: 3,
    name: "Galinhada Caipira com Milho Verde & Açafrão",
    category: "classicos",
    categoryLabel: "Prato da Roça",
    description: "Arroz soltinho cozido com açafrão da terra puro, frango caipira desfiado suculento, milho verde recém-debulhado e cheiro verde.",
    price: 27.50,
    oldPrice: null,
    badge: "Sabor de Infância",
    badgeType: "default",
    weight: "400g",
    heatTime: "5 min",
    image: "assets/kits_hero.jpg",
    ingredients: "Arroz agulhinha selecionado, coxa e sobrecoxa caipira desfiada, milho verde da espiga, cúrcuma/açafrão natural, cebolinha e alho frito."
  },
  {
    id: 4,
    name: "Escondidinho de Aipim com Carne Seca & Canastra",
    category: "classicos",
    categoryLabel: "Especialidade",
    description: "Creme aveludado de mandioca na manteiga de garrafa recheado com carne seca desfiada e coberto com queijo da Canastra dourado.",
    price: 31.00,
    oldPrice: 35.00,
    badge: "Gratinado",
    badgeType: "promo",
    weight: "420g",
    heatTime: "7 min",
    image: "assets/kits_hero.jpg",
    ingredients: "Mandioca manteiga, carne seca artesanal dessalgada e puxada na cebola roxa, queijo minas canastra curado e cheiro verde."
  },
  {
    id: 5,
    name: "Costelinha Suína com Polenta Cremosa & Quiabo",
    category: "classicos",
    categoryLabel: "Tradição Caipira",
    description: "Costelinha de porco marinada em ervas e limão caipira, cozida até soltar do osso com polenta rústica no tacho e quiabos sem baba.",
    price: 32.90,
    oldPrice: null,
    badge: "Suculento",
    badgeType: "default",
    weight: "430g",
    heatTime: "6 min",
    image: "assets/prato_tropeiro.jpg",
    ingredients: "Costelinha suína, fubá de moinho d'água, quiabo verde fresco salteado na panela de ferro e caldo de ervas aromáticas."
  },
  {
    id: 6,
    name: "Frango com Quiabo & Arroz Integral de Ervas",
    category: "leves",
    categoryLabel: "Linha Equilíbrio",
    description: "Opção leve e nutritiva: peito de frango caipira em cubos com quiabo grelhado, purê de abóbora cabotiá e arroz integral aromático.",
    price: 26.90,
    oldPrice: null,
    badge: "Low Fat",
    badgeType: "fit",
    weight: "380g",
    heatTime: "5 min",
    image: "assets/kits_hero.jpg",
    ingredients: "Peito de frango desossado, abóbora cabotiá assada, quiabo, arroz integral e azeite extravirgem."
  },
  {
    id: 7,
    name: "Kit Família da Fazenda (10 Marmitas)",
    category: "kits",
    categoryLabel: "Super Combo",
    description: "10 refeições variadas para abastecer o freezer de casais e famílias. A maior economia por porção com variedade total de pratos.",
    price: 259.90,
    oldPrice: 298.00,
    badge: "Frete Grátis",
    badgeType: "promo",
    weight: "10 x 400g",
    heatTime: "5 a 7 min",
    image: "assets/kits_hero.jpg",
    ingredients: "Variedade completa com 3 Tropeiros, 3 Galinhadas, 2 Escondidinhos e 2 Costelinhas."
  },
  {
    id: 8,
    name: "Doce de Leite Caipira de Tacho (Pote 320g)",
    category: "sobremesas",
    categoryLabel: "Doce Caseiro",
    description: "Doce de leite tradicional mineiro cozido no tacho de cobre com leite fresco da fazenda e toque sutil de baunilha natural.",
    price: 22.00,
    oldPrice: null,
    badge: "Artesanal",
    badgeType: "default",
    weight: "320g",
    heatTime: "Pronto p/ comer",
    image: "assets/chef.jpg",
    ingredients: "Leite integral puro da roça, açúcar cristal orgânico e fava de baunilha."
  }
];

// Estado do Carrinho (com suporte a localStorage)
let cart = JSON.parse(localStorage.getItem('paladar_raiz_cart')) || [];

// Elementos DOM
const productsGrid = document.getElementById('productsGrid');
const categoryFilters = document.getElementById('categoryFilters');
const cartDrawer = document.getElementById('cartDrawer');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartToggleBtn = document.getElementById('cartToggleBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartCount = document.getElementById('cartCount');
const cartHeaderTotal = document.getElementById('cartHeaderTotal');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartSubtotalText = document.getElementById('cartSubtotalText');
const cartFinalTotalText = document.getElementById('cartFinalTotalText');
const checkoutWhatsappBtn = document.getElementById('checkoutWhatsappBtn');

// Modais
const dishModalBackdrop = document.getElementById('dishModalBackdrop');
const dishModalBody = document.getElementById('dishModalBody');
const closeDishModalBtn = document.getElementById('closeDishModalBtn');

const chefLoginBackdrop = document.getElementById('chefLoginBackdrop');
const openChefLoginBtn = document.getElementById('openChefLoginBtn');
const footerChefLoginBtn = document.getElementById('footerChefLoginBtn');
const closeChefLoginBtn = document.getElementById('closeChefLoginBtn');
const chefLoginForm = document.getElementById('chefLoginForm');

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

// ============================================================
// INICIALIZAÇÃO
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('todos');
  updateCartUI();
  setupEventListeners();
  setupScrollEffects();
  setupAccordion();
});

// ============================================================
// RENDERIZAÇÃO DOS PRODUTOS
// ============================================================
function renderProducts(filterCategory = 'todos') {
  productsGrid.innerHTML = '';

  const filtered = filterCategory === 'todos' 
    ? PRODUCTS_DATA 
    : PRODUCTS_DATA.filter(p => p.category === filterCategory);

  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-id', product.id);

    const badgeClass = product.badgeType === 'promo' ? 'badge-promo' : (product.badgeType === 'fit' ? 'badge-fit' : '');

    card.innerHTML = `
      <div class="product-thumb-wrapper" onclick="openDishDetails(${product.id})">
        <img src="${product.image}" alt="${product.name}" class="product-thumb" loading="lazy">
        ${product.badge ? `<span class="product-badge ${badgeClass}">${product.badge}</span>` : ''}
      </div>

      <div class="product-content">
        <span class="product-category-label">${product.categoryLabel}</span>
        <h3 class="product-title" onclick="openDishDetails(${product.id})" style="cursor: pointer;">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        
        <div class="product-meta-row">
          <span><i class="fa-solid fa-weight-scale"></i> ${product.weight}</span>
          <span><i class="fa-solid fa-fire"></i> ${product.heatTime}</span>
        </div>

        <div class="product-footer">
          <div class="price-box">
            ${product.oldPrice ? `<span class="old-price">R$ ${product.oldPrice.toFixed(2).replace('.', ',')}</span>` : ''}
            <span class="current-price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
          </div>
          <button class="add-cart-btn" onclick="addToCart(${product.id})">
            <i class="fa-solid fa-plus"></i> Adicionar
          </button>
        </div>
      </div>
    `;

    productsGrid.appendChild(card);
  });
}

// ============================================================
// GERENCIAMENTO DO CARRINHO
// ============================================================
function addToCart(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      weight: product.weight,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  openCart();

  // Feedback tátil
  if (navigator.vibrate) navigator.vibrate(50);
}

function updateQuantity(productId, delta) {
  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex === -1) return;

  cart[itemIndex].quantity += delta;
  if (cart[itemIndex].quantity <= 0) {
    cart.splice(itemIndex, 1);
  }

  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('paladar_raiz_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  cartCount.textContent = totalItems;
  cartHeaderTotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  cartSubtotalText.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  cartFinalTotalText.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty-state">
        <i class="fa-solid fa-basket-shopping"></i>
        <h4>Seu cesto está vazio</h4>
        <p>Escolha seus pratos caipiras favoritos no cardápio para montar seu pedido semanal.</p>
      </div>
    `;
    checkoutWhatsappBtn.disabled = true;
    checkoutWhatsappBtn.style.opacity = '0.6';
  } else {
    checkoutWhatsappBtn.disabled = false;
    checkoutWhatsappBtn.style.opacity = '1';

    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.name}</h4>
          <span class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
        </div>
        <div class="cart-qty-controls">
          <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
          <span class="qty-val">${item.quantity}</span>
          <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
        </div>
      </div>
    `).join('');
  }
}

function openCart() {
  cartDrawer.classList.add('open');
  cartBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}

// ============================================================
// FINALIZAÇÃO VIA WHATSAPP COM PEDIDO FORMATADO
// ============================================================
function checkoutWhatsapp() {
  if (cart.length === 0) return;

  const customerName = document.getElementById('customerName').value.trim();
  const customerAddress = document.getElementById('customerAddress').value.trim();
  const deliveryDay = document.getElementById('deliveryDay').value;

  if (!customerName) {
    alert('Por favor, informe seu nome para que a Chef possa preparar seu pedido!');
    document.getElementById('customerName').focus();
    return;
  }

  if (!customerAddress) {
    alert('Por favor, informe seu endereço ou bairro de entrega!');
    document.getElementById('customerAddress').focus();
    return;
  }

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Formatação elegante para mensagem de WhatsApp
  let message = `🍃 *PEDIDO PALADAR RAIZ - MARMITAS ARTESANAIS* 🍃\n\n`;
  message += `👤 *Cliente:* ${customerName}\n`;
  message += `📍 *Entrega:* ${customerAddress}\n`;
  message += `📅 *Dia preferido:* ${deliveryDay}\n\n`;
  message += `📦 *ITENS DO PEDIDO:*\n`;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    message += `• ${item.quantity}x ${item.name} (R$ ${itemTotal.toFixed(2).replace('.', ',')})\n`;
  });

  message += `\n💰 *VALOR TOTAL:* R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
  message += `❄️ *Conservação:* Refeições entregues ultracongeladas.\n\n`;
  message += `_Olá Chef Maria! Enviei meu pedido pelo site e aguardo a confirmação de entrega._`;

  const phone = '5511999999999'; // Número do restaurante
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

  window.open(whatsappUrl, '_blank');
}

// ============================================================
// MODAL DE DETALHES DO PRATO
// ============================================================
function openDishDetails(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  dishModalBody.innerHTML = `
    <div class="modal-img-col">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="modal-info-col">
      <span class="product-category-label">${product.categoryLabel}</span>
      <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-green-dark); margin: 0.3rem 0 0.8rem;">
        ${product.name}
      </h3>
      <p style="font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.6; margin-bottom: 1.2rem;">
        ${product.description}
      </p>

      <div style="background: var(--color-sand-cream); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem;">
        <h5 style="font-size: 0.85rem; color: var(--color-green-forest); text-transform: uppercase; margin-bottom: 0.35rem;">
          <i class="fa-solid fa-leaf"></i> Ingredientes Selecionados:
        </h5>
        <p style="font-size: 0.84rem; color: var(--color-text-dark); line-height: 1.5;">
          ${product.ingredients}
        </p>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--color-sand-border);">
        <div>
          <span style="font-size: 0.78rem; color: #888; display: block;">Valor por unidade:</span>
          <span style="font-size: 1.45rem; font-weight: 800; color: var(--color-terracotta);">
            R$ ${product.price.toFixed(2).replace('.', ',')}
          </span>
        </div>
        <button class="btn btn-primary" onclick="addToCart(${product.id}); closeDishModal();">
          <i class="fa-solid fa-cart-plus"></i> Adicionar ao Pedido
        </button>
      </div>
    </div>
  `;

  dishModalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDishModal() {
  dishModalBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}

// ============================================================
// MODAL DE LOGIN DA CHEF (BASTIDORES)
// ============================================================
function openChefLogin() {
  chefLoginBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeChefLogin() {
  chefLoginBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}

function handleChefLogin(e) {
  e.preventDefault();
  const email = document.getElementById('chefEmail').value;
  const password = document.getElementById('chefPassword').value;

  if (email && password) {
    alert(`👩‍🍳 Bem-vinda aos Bastidores do Paladar Raiz, Chef Maria!\n\nNa próxima etapa vamos criar a sua interface completa de gerenciamento para subir fotos de pratos, ajustar preços e lançar promoções da semana.`);
    closeChefLogin();
  }
}

// ============================================================
// EVENT LISTENERS GERAIS
// ============================================================
function setupEventListeners() {
  // Filtros de Categoria
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');
      renderProducts(cat);
    });
  });

  // Carrinho
  cartToggleBtn.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);
  cartBackdrop.addEventListener('click', closeCart);
  checkoutWhatsappBtn.addEventListener('click', checkoutWhatsapp);

  // Botão Banner Tropeiro
  const bannerBtn = document.querySelector('.add-single-btn');
  if (bannerBtn) {
    bannerBtn.addEventListener('click', () => addToCart(1));
  }

  // Modais
  closeDishModalBtn.addEventListener('click', closeDishModal);
  dishModalBackdrop.addEventListener('click', (e) => {
    if (e.target === dishModalBackdrop) closeDishModal();
  });

  openChefLoginBtn.addEventListener('click', openChefLogin);
  footerChefLoginBtn.addEventListener('click', openChefLogin);
  closeChefLoginBtn.addEventListener('click', closeChefLogin);
  chefLoginBackdrop.addEventListener('click', (e) => {
    if (e.target === chefLoginBackdrop) closeChefLogin();
  });
  chefLoginForm.addEventListener('submit', handleChefLogin);

  // Menu Mobile
  const navBackdrop = document.getElementById('navBackdrop');
  
  function openMobileNav() {
    navLinks.classList.add('open');
    if (navBackdrop) navBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    navLinks.classList.remove('open');
    if (navBackdrop) navBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  mobileMenuBtn.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeMobileNav);
  }

  // Fechar menu mobile ao clicar em um link ou botão
  document.querySelectorAll('.nav-links a, .nav-links button').forEach(item => {
    item.addEventListener('click', closeMobileNav);
  });
}

// Efeito de scroll suave na navbar
function setupScrollEffects() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// FAQ Accordion
function setupAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}
