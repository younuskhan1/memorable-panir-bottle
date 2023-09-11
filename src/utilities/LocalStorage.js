const getStoredCart = () => {
    const savedStoredCart = localStorage.getItem('cart');
    if (savedStoredCart) {
        return JSON.parse(savedStoredCart);
    }
    return [];
}

const saveCartToLs = (cart) => {
    const savedStoredCartToLs = JSON.stringify(cart);
    localStorage.setItem('cart', savedStoredCartToLs);
}

const removeFromLocalStorage = (id) => {
    const cart = getStoredCart();
    const remaining = cart.filter(idx => idx !== id);
    saveCartToLs(remaining);
}
const addToLs = (id) => {
    const cart = getStoredCart();
    cart.push(id);
    // save to local storage
    saveCartToLs(cart);
}

export { addToLs, getStoredCart, removeFromLocalStorage };