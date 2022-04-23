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
          <h1>CART</h1>
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
                        item.prices.find((price) => price.currency.symbol === this.context.currency)
                          .amount
                      }
                    </div>
                    <div className='attributes-container'>
                      {item.attributes.map((attribute) => {
                        return (
                          <div key={attribute.id} className='mr-2rem'>
                            <div>{attribute.name}</div>
                            <div className='attribute-value'>
                              {attribute.type === 'swatch' ? (
                                <>
                                  {attribute.items.map((item) => (
                                    <button
                                      key={item.id}
                                      className={item.selected ? 'cart-swatch-selected' : ''}
                                      style={{
                                        backgroundColor: item.value,
                                      }}></button>
                                  ))}
                                </>
                              ) : (
                                <>
                                  {attribute.items.map((item) => (
                                    <button
                                      key={item.id}
                                      className={item.selected ? 'cart-attr-selected' : ''}>
                                      {item.value}
                                    </button>
                                  ))}
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div
                      className='pointer'
                      onClick={() => this.context.removeProduct(item.number)}>
                      <img src={trashCan} alt='can' className='img-height-pointer' />
                    </div>
                  </div>
                  <div className='d-flex'>
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
      current: this.state.current === this.length - 1 ? 0 : this.state.current + 1,
    });
  };

  prevSlide = () => {
    this.setState({
      current: this.state.current === 0 ? this.length - 1 : this.state.current - 1,
    });
  };

  render() {
    const { current } = this.state;
    return (
      <section className='slider'>
        {this.length > 1 && (
          <div>
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
          </div>
        )}
        {this.props.images.map((img, index) => {
          return (
            <div className='img-gallery-container' key={index}>
              <div className={index === current ? 'slide active' : 'slide'} key={index}>
                {index === current && <img src={img} alt='product' className='image' />}
              </div>
            </div>
          );
        })}
      </section>
    );
  }
}
