import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css';
import { addToLs, getStoredCart, removeFromLocalStorage } from "../../utilities/LocalStorage";
import Cart from "../Cart/Cart";


const Bottles = () => {
    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('bottles.json')
            .then(res => res.json())
            .then(data => setBottles(data))
    }, []);
    // two useEffect work seperately 
    // load cart from local storage
    // cannot understand this useEffect division
    useEffect(() => {
        console.log('Called the useEffect', bottles.length);
        if (bottles.length) {
            const getStoredInfo = getStoredCart();
            const savedCart = [];
            for (const id of getStoredInfo) {
                // find returns us one element but here we can get multiple items and multiple same items
                const bottle = bottles.find(bottle => bottle.id === id);
                if (bottle) {
                    savedCart.push(bottle)

                }
            }
            console.log('saved cart', savedCart);
            setCart(savedCart);

        }
    }, [bottles]);

    const handleAddedToCart = (bottle) => {
        const newCart = [...cart, bottle];
        setCart(newCart);
        addToLs(bottle.id);
    }

    const handleRemoveFromCart = (id) => {
        // you have to remove from both local storage and UI 
        const remainingCart = cart.filter(bottle => bottle.id !== id);
        setCart(remainingCart);
        removeFromLocalStorage(id);
    }

    return (
        <div>
            <h3>bottles are available here {bottles.length}</h3>
            <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
            <div className="bottle-container">
                {
                    bottles.map(bottle => <Bottle
                        key={bottle.id}
                        handleAddedToCart={handleAddedToCart}
                        bottle={bottle}>

                    </Bottle>)
                }
            </div>
        </div>
    );
};

export default Bottles;