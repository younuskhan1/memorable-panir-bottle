import PropTypes from 'prop-types';
import './Bottle.css';

const Bottle = ({ bottle, handleAddedToCart }) => {
    const { name, img, price } = bottle;
    return (
        <div className="bottle">
            <p>name: {name}</p>
            <img src={img} alt="" />
            <p>price: ${price}</p>
            <button onClick={() => handleAddedToCart(bottle)}>Purchase</button>
        </div>
    );
};
Bottle.propTypes = {
    bottle: PropTypes.object.isRequired,
    handleAddedToCart: PropTypes.func.isRequired

}
export default Bottle;