document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById('searchBar');
    const productContainer = document.getElementById('productContainer');
    const accountBtn = document.getElementById('accountBtn');
    const loginPanel = document.getElementById('loginPanel');
    const selectedProducts = document.getElementById('selectedProducts');
    const totalPriceDisplay = document.getElementById('totalPrice');
    const removeBillBtn = document.getElementById('removeBillBtn');
    const discountInput = document.getElementById('discount');
    let products = [];
    let selectedItems = [];
    
    // Load products from server
    fetch('/products')
        .then(response => response.json())
        .then(data => {
            products = data;
            displayProducts();
        });

    function displayProducts() {
        productContainer.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="${product.available ? 'available' : 'unavailable'}">${product.available ? 'Available' : 'Unavailable'}</p>
                <button onclick="addToBill(${product.id})">Add to Bill</button>
            `;
            productContainer.appendChild(productDiv);
        });
    }

    window.addToBill = function (id) {
        const product = products.find(p => p.id === id);
        if (!product) return;
        selectedItems.push(product);
        updateBill();
    };

    function updateBill() {
        selectedProducts.innerHTML = '';
        let total = 0;
        selectedItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `${item.name} - $${item.price} <button onclick="removeItem(${item.id})" class="red-btn">Remove Item</button>`;
            selectedProducts.appendChild(itemDiv);
            total += item.price;
        });
        const discount = parseFloat(discountInput.value) || 0;
        total -= discount;
        totalPriceDisplay.innerText = total.toFixed(2);
    }

    window.removeItem = function (id) {
        selectedItems = selectedItems.filter(item => item.id !== id);
        updateBill();
    };

    removeBillBtn.addEventListener('click', function () {
        selectedItems = [];
        updateBill();
    });

    accountBtn.addEventListener('click', function () {
        loginPanel.classList.toggle('hidden');
    });

    document.getElementById('loginBtn').addEventListener('click', function () {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (username === 'admin' && password === 'admin') {
            loginPanel.classList.add('hidden');
            loadAdminFeatures();
        } else {
            alert('Invalid credentials');
        }
    });

    function loadAdminFeatures() {
        // Load admin features such as adding/removing products
        alert('Welcome, Admin!');
        // Implement additional admin functionalities here.
    }
});
