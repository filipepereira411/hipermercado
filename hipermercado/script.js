// Estado da aplicação (Carrinho de compras)
let cart = [];

// Seleção de elementos do DOM
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElement = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total-val');
const checkoutBtn = document.getElementById('checkout-btn');

// Escutar cliques nos botões de "Adicionar"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        const id = card.getAttribute('data-id');
        const name = card.getAttribute('data-name');
        const price = parseFloat(card.getAttribute('data-price'));

        addToCart(id, name, price);
    });
});

// Função para adicionar produto ao carrinho
function addToCart(id, name, price) {
    // Verificar se o produto já existe no carrinho
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    updateCartUI();
}

// Função para atualizar a interface do carrinho
function updateCartUI() {
    // 1. Limpar contentor
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">O carrinho está vazio.</p>';
        cartCountElement.textContent = '0';
        cartTotalElement.textContent = '0,00';
        return;
    }

    let totalItems = 0;
    let totalPrice = 0;

    // 2. Renderizar itens atuais
    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        const itemRow = document.createElement('div');
        itemRow.classList.add('cart-item');
        itemRow.innerHTML = `
            <div>
                <div><strong>${item.name}</strong></div>
                <small>${item.quantity}x (${item.price.toFixed(2)} €)</small>
            </div>
            <span>${(item.price * item.quantity).toFixed(2)} €</span>
        `;
        cartItemsContainer.appendChild(itemRow);
    });

    // 3. Atualizar totais globais
    cartCountElement.textContent = totalItems;
    cartTotalElement.textContent = totalPrice.toFixed(2).replace('.', ',');
}

// Botão de finalizar compra
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('O teu carrinho está vazio!');
    } else {
        alert(`Compra finalizada com sucesso! Total: ${cartTotalElement.textContent} €`);
        cart = []; // Limpa o carrinho
        updateCartUI();
    }
});
