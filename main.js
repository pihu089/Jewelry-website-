$(document).ready(function() {
    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();
    
    // Add to cart functionality
    $('.add-to-cart').on('click', function(e) {
        e.preventDefault();
        
        const productId = $(this).data('id');
        const productName = $(this).closest('.card-product').find('.product-title').text();
        const productPrice = $(this).closest('.card-product').find('.product-price').text().replace('$', '');
        const productImage = $(this).closest('.card-product').find('.card-img-top').attr('src');
        
        // Check if product already in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: parseFloat(productPrice),
                image: productImage,
                quantity: 1
            });
        }
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Animation feedback
        $(this).addClass('bg-success');
        setTimeout(() => {
            $(this).removeClass('bg-success');
        }, 700);
    });
    
    // Update cart count
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        $('.cart-count').text(totalItems);
    }
    
    // Newsletter form submission
    $('#newsletter-form').on('submit', function(e) {
        e.preventDefault();
        const email = $(this).find('input[type="email"]').val();
        alert(`Thank you! ${email} has been subscribed to our newsletter.`);
        $(this).find('input[type="email"]').val('');
    });
    
    // Contact form submission
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message. We will get back to you soon!');
        $(this)[0].reset();
    });
    
    // Video play functionality
    $('.video-thumbnail').on('click', function() {
        // In a real implementation, this would open a modal with the video
        alert('Video would play here. In a real implementation, this would open a video modal.');
    });
});

// cart functionality
function updateCartDisplay(isEmpty) {
    document.getElementById("empty-cart").style.display = isEmpty ? "block" : "none";
    document.getElementById("cart-content").classList.toggle("d-none", isEmpty);
}


    function addToCart(productName, price) {
        // Add item to cart
        cart.push({ name: productName, price: parseFloat(price) });

        // Update cart count
        document.getElementById("cart-count").textContent = cart.length;

        // Update cart total
        updateCartTotal();

        // Optional: Add the item to cart table if you're on cart page
        const cartItems = document.getElementById("cart-items");
        if (cartItems) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${productName}</td>
                <td>$${price}</td>
            `;
            cartItems.appendChild(row);
        }

        // Toggle cart visibility
        updateCartDisplay(false);
    }

    function updateCartTotal() {
        const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
        document.getElementById("grand-total").textContent = `Total: $${total}`;
    }

    function updateCartDisplay(isEmpty) {
        const emptyCart = document.getElementById("empty-cart");
        const cartContent = document.getElementById("cart-content");
        if (emptyCart && cartContent) {
            emptyCart.style.display = isEmpty ? "block" : "none";
            cartContent.classList.toggle("d-none", isEmpty);
        }
    }

    // Call this on page load to set empty state
    window.onload = function () {
        updateCartDisplay(cart.length === 0);
    };



 
 

    
    

