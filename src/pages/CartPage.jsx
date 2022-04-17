import React, { Component } from 'react';
import Header from '../components/Header';
import CurrencyContext from '../contexts/CurrencyContext';
import leftArrow from '../assets/left-arrow.svg';
import rightArrow from '../assets/right-arrow.svg';
import trashCan from '../assets/trashcan.png';

export default class CartPage extends Component {
  static contextType = CurrencyContext;

  render() {
    if (this.context.cart.length === 0) {
      return (
        <>
          <Header />
          <h1 className='no-items'>No items in your cart yet!</h1>
        </>
      );
    }
    return (
      <>
        <Header />
        <div className='cart-container'>
          <h1 style={{ marginBottom: '4rem' }}>CART</h1>
          {this.context.cart.map((item, index) => {
            return (
              <div key={index}>
                <hr />
                <div className='product-container'>
                  <div key={index}>
                    <div className='brand'>{item.brand}</div>
                    <div className='name'>{item.name}</div>
                    <div className='price'>
                      {this.context.currency}
                      {
                        item.prices.find(
                          (price) =>
                            price.currency.symbol === this.context.currency
                        ).amount
                      }
                    </div>
                    <div className='attributes-container'>
                      {item.attributes.map((attribute) => {
                        const selected = attribute.items.find(
                          (item) => item.selected
                        );
                        return (
                          <div
                            key={attribute.id}
                            style={{ marginRight: '2rem' }}>
                            <div>{attribute.name}</div>
                            <div className='attribute-value'>
                              {attribute.type === 'swatch' && (
                                <button
                                  style={{
                                    backgroundColor: selected.value,
                                  }}></button>
                              )}
                              {attribute.type !== 'swatch' && (
                                <button>{selected.value}</button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => this.context.removeProduct(item.number)}>
                      <img
                        src={trashCan}
                        alt='can'
                        style={{ height: '30px' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <QuantityButtons item={item} />
                    <div>
                      <Gallery images={item.gallery} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

class QuantityButtons extends Component {
  static contextType = CurrencyContext;

  componentDidMount() {
    this.setState({ count: this.props.item.quantity });
  }

  changeQuantity(quantity) {
    if (this.state.count === 1 && quantity === -1) return;
    const count = this.state.count + quantity;
    this.setState({ count: count });
    this.context.changeQuantity(this.props.item.number, count);
  }

  render() {
    if (!this.state) return null;
    return (
      <div className='add-remove-buttons-container'>
        <button className='btn' onClick={() => this.changeQuantity(1)}>
          +
        </button>
        <div>{this.state.count ?? 1}</div>
        <button className='btn' onClick={() => this.changeQuantity(-1)}>
          -
        </button>
      </div>
    );
  }
}

class Gallery extends Component {
  state = {
    current: 0,
  };
  length = this.props.images.length;

  nextSlide = () => {
    this.setState({
      current:
        this.state.current === this.length - 1 ? 0 : this.state.current + 1,
    });
  };

  prevSlide = () => {
    this.setState({
      current:
        this.state.current === 0 ? this.length - 1 : this.state.current - 1,
    });
  };

  render() {
    const { current } = this.state;
    return (
      <section className='slider'>
        <img
          className='arrow left svg-color'
          src={leftArrow}
          alt='left'
          onClick={this.prevSlide}
        />
        <img
          className='arrow right svg-color'
          src={rightArrow}
          alt='right'
          onClick={this.nextSlide}
        />
        {this.props.images.map((img, index) => {
          return (
            <div className='img-gallery-container' key={index}>
              <div
                className={index === current ? 'slide active' : 'slide'}
                key={index}>
                {index === current && (
                  <img src={img} alt='product' className='image' />
                )}
              </div>
            </div>
          );
        })}
      </section>
    );
  }
}
