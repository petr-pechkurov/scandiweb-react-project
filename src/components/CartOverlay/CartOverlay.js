import React, { Component } from 'react';
import shoppingCart from '../../assets/Empty Cart.svg';
import CurrencyContext from '../../contexts/CurrencyContext';

export default class CartOverlay extends Component {
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
          <CartContainer onBackgroundClick={this.closeCartOverlay} />
        )}
      </div>
    );
  }
}

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
          {cart.map((item) => (
            <CartItem item={item} key={item.id} />
          ))}
          {itemsTotal > 0 && (
            <div className='total-container'>
              <div>Total</div>
              <div>
                {currency} {this.getTotalPrice()}
              </div>
            </div>
          )}
          <div className='button-block'>
            <button>View Bag</button>
            <button>View Bag</button>
          </div>
        </div>
      </>
    );
  }
}

class CartItem extends Component {
  static contextType = CurrencyContext;
  state = {
    count: 1,
  };

  componentDidMount() {
    console.log(this.props.item.count);
  }

  changeQuantity(quantity) {
    if (this.state.count === 0 && quantity === -1) return;
    this.setState({ count: this.state.count + quantity });
  }

  render() {
    if (!this.props.item) return null;
    const { item } = this.props;
    const { name, brand, prices, attributes, gallery } = item;

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
              action={() => this.changeQuantity(1)}
            />
            <div>{this.state.count}</div>
            <CartItemButton
              label='-'
              cursor={true}
              action={() => this.changeQuantity(-1)}
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
