import { useCartStore, useTotalStore } from '../store/synchronize.store'
import './CartTotalSyncDemo.css'

const PRODUCT_PRICES = [10, 25, 50, 100]

export const CartTotalSyncDemo = () => {
  const { items, price, addItem, removeItem, clearCart } = useCartStore()
  const { itemCount, totalPrice } = useTotalStore()

  return (
    <div className="cart-total-sync-demo">
      <h3 className="cart-total-sync-demo__title">🛒 Sincronización Unidireccional</h3>
      <p className="cart-total-sync-demo__description">
        El store Total se actualiza automáticamente cuando cambia el Carrito.
      </p>

      <div className="cart-total-sync-demo__section">
        <h4>📦 Cart Store (fuente)</h4>
        <div className="cart-total-sync-demo__info">
          <div>
            <span className="cart-total-sync-demo__label">Items:</span>
            <span className="cart-total-sync-demo__value">{items}</span>
          </div>
          <div>
            <span className="cart-total-sync-demo__label">Price:</span>
            <span className="cart-total-sync-demo__value">${price}</span>
          </div>
        </div>
        <div className="cart-total-sync-demo__buttons">
          {PRODUCT_PRICES.map((productPrice) => (
            <button
              key={productPrice}
              onClick={() => addItem(productPrice)}
              className="cart-total-sync-demo__button"
            >
              + ${productPrice}
            </button>
          ))}
        </div>
        <div className="cart-total-sync-demo__actions">
          <button
            onClick={() => removeItem(PRODUCT_PRICES[0])}
            disabled={items === 0}
            className="cart-total-sync-demo__button--secondary"
          >
            Remover item
          </button>
          <button onClick={clearCart} className="cart-total-sync-demo__button--danger">
            Limpiar carrito
          </button>
        </div>
      </div>

      <div className="cart-total-sync-demo__arrow">↓</div>

      <div className="cart-total-sync-demo__section">
        <h4>💰 Total Store (sincronizado)</h4>
        <div className="cart-total-sync-demo__total">
          <div>
            <span className="cart-total-sync-demo__label">Total Items:</span>
            <span className="cart-total-sync-demo__value--large">{itemCount}</span>
          </div>
          <div>
            <span className="cart-total-sync-demo__label">Total Price:</span>
            <span className="cart-total-sync-demo__value--large">${totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
