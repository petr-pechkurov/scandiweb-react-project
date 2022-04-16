import React, { Component } from 'react';
import shoppingCart from '../../assets/Empty Cart.svg';
import CurrencyContext from '../../contexts/CurrencyContext';
import { withRouter } from '../../withRouter';

class CartOverlay extends Component {
  static contextType = CurrencyContext;
  state = {
    isOverlayOpen: false,
  };

  openCartOverlay = () => {
    this.setState({ isOverlayOpen: true });
  };

  closeCartOverlay = () => {
    this.setState({ isOverlayOpen: false });
  };

  toggleCartOverlay = () => {
    this.setState({ isOverlayOpen: !this.state.isOverlayOpen });
  };

  render() {
    const productsCount = this.context.cart.length;
    return (
      <div className='cart-overlay' style={{ marginTop: '0.6rem' }}>
        <div className='cart-icon' onClick={this.toggleCartOverlay}>
          <div className='product-counter'>
            {productsCount > 0 ? productsCount : ''}
          </div>
          <img src={shoppingCart} alt='shopcart' />
        </div>
        {this.state.isOverlayOpen && (
          <CartContainer
            onBackgroundClick={this.closeCartOverlay}
            navigate={this.props.navigate}
          />
        )}
      </div>
    );
  }
}

export default withRouter(CartOverlay);
class CartContainer extends Component {
  static contextType = CurrencyContext;
  getTotalPrice() {
    let sum = 0;
    this.context.cart.forEach(
      (item) =>
        (sum += item.prices.find(
          (price) => price.currency.symbol === this.context.currency
        ).amount)
    );
    return sum.toFixed(2);
  }

  render() {
    const { currency, cart } = this.context;
    const itemsTotal = cart.length;

    return (
      <>
        <div
          className='background'
          onClick={this.props.onBackgroundClick}></div>
        <div className='overlay-container'>
          <div>
            <span style={{ fontWeight: '700' }}>My Bag, </span> {itemsTotal}{' '}
            items
          </div>
          {cart.map((item, index) => (
            <CartItem item={item} key={index} />
          ))}
          {itemsTotal > 0 && (
            <div className='total-container'>
              <div>Total</div>
              <div>
                {currency} {this.getTotalPrice()}
              </div>
            </div>
          )}
          {itemsTotal > 0 && (
            <div className='button-block'>
              <button
                className='view-btn'
                onClick={() => this.props.navigate('/cart')}>
                View Bag
              </button>
              <button className='checkout-btn'>Checkout</button>
            </div>
          )}
        </div>
      </>
    );
  }
}

export class CartItem extends Component {
  static contextType = CurrencyContext;
  state = {
    count: this.props.item.quantity ?? 1,
  };

  changeQuantity(itemNumber, quantity) {
    if (this.state.count === 0 && quantity === -1) return;
    const count = this.state.count + quantity;
    this.setState({ count: count });
    console.log('count', count);
    this.context.changeQuantity(itemNumber, count);
  }

  render() {
    if (!this.props.item) return null;
    const { item } = this.props;
    const { number, name, brand, prices, attributes, gallery } = item;

    const currentPrice = prices.find(
      (price) => price.currency.symbol === this.context.currency
    );

    return (
      <div className='cart-item-container'>
        <div className='info-container'>
          <div className='cart-item-label'>
            {brand}
            <div>{name}</div>
          </div>
          <div className='cart-item-price'>
            {currentPrice.currency.symbol} {currentPrice.amount}
          </div>
          <div>
            {attributes.length > 0 && (
              <>
                {attributes.map((attribute) => {
                  return (
                    <div key={attribute.id}>
                      {attribute.name}:
                      <div>
                        <CartItemButton
                          label={
                            attribute.items.find((item) => item.selected)?.value
                          }
                          type={attribute.type}
                        />
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
        <div className='gallery'>
          <div className='add-remove-buttons-container'>
            <CartItemButton
              label='+'
              cursor={true}
              action={() => this.changeQuantity(number, 1)}
            />
            <div>{this.state.count}</div>
            <CartItemButton
              label='-'
              cursor={true}
              action={() => this.changeQuantity(number, -1)}
            />
          </div>
          <div className='img-container'>
            <img src={gallery[0]} alt='small product'></img>
          </div>
        </div>
      </div>
    );
  }
}

class CartItemButton extends Component {
  render() {
    const { label, type } = this.props;
    if (type === 'swatch') {
      return (
        <div
          className='cart-item-swatch'
          style={{ backgroundColor: label }}></div>
      );
    }
    return (
      <button
        className='cart-item-button'
        style={this.props.cursor ? { cursor: 'pointer' } : {}}
        onClick={this.props.action}>
        {label}
      </button>
    );
  }
}
