import { useSlicesStore } from '../store/slices.store'
import './CartSliceDemo.css'

const PRODUCTS = [
  { id: 1, name: '📱 Smartphone', price: 699 },
  { id: 2, name: '💻 Laptop', price: 1299 },
  { id: 3, name: '🎧 Auriculares', price: 199 },
  { id: 4, name: '⌚ Smartwatch', price: 399 },
]

export const CartSliceDemo = () => {
  const { items, addItem, removeItem, updateQuantity, clearCart, getTotalPrice, getTotalItems } =
    useSlicesStore()

  return (
    <div className="cart-slice-demo">
      <h3 className="cart-slice-demo__title">🛒 Cart Slice</h3>

      <div className="cart-slice-demo__products">
        <h4>Productos disponibles:</h4>
        <div className="cart-slice-demo__product-list">
          {PRODUCTS.map((product) => (
            <button
              key={product.id}
              onClick={() => addItem(product)}
              className="cart-slice-demo__product-btn"
            >
              {product.name} - ${product.price}
            </button>
          ))}
        </div>
      </div>

      <div className="cart-slice-demo__cart">
        <h4>Carrito ({getTotalItems()} items):</h4>
        {items.length === 0 ? (
          <p className="cart-slice-demo__empty">Carrito vacío</p>
        ) : (
          <>
            <div className="cart-slice-demo__items">
              {items.map((item) => (
                <div key={item.id} className="cart-slice-demo__item">
                  <div className="cart-slice-demo__item-info">
                    <span>{item.name}</span>
                    <span className="cart-slice-demo__item-price">
                      ${item.price} x {item.quantity}
                    </span>
                  </div>
                  <div className="cart-slice-demo__item-controls">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="cart-slice-demo__qty-btn"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="cart-slice-demo__qty-btn"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="cart-slice-demo__remove-btn"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-slice-demo__total">
              <strong>Total: ${getTotalPrice()}</strong>
            </div>
            <button onClick={clearCart} className="cart-slice-demo__clear-btn">
              Vaciar carrito
            </button>
          </>
        )}
      </div>
    </div>
  )
}
