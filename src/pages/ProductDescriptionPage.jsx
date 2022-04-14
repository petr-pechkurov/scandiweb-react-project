import React, { Component } from 'react';
import { getProductById } from '../repository';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import CurrencyContext from '../contexts/CurrencyContext';

function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams();
    return <Component {...props} params={params} />;
  }
  return ComponentWithRouter;
}

class ProductDescriptionPage extends Component {
  state = {
    id: '',
    image: '',
  };

  static getDerivedStateFromProps(nextProps) {
    return {
      id: nextProps.params.id,
    };
  }

  async componentDidMount() {
    this.setState({ id: this.props.params.id });

    const { product } = await getProductById(this.state.id);
    this.setState({ product: product, image: product.gallery[0] });
  }

  setImage = (event) => {
    const img = this.state.product.gallery.find(
      (img) => img === event.target.src
    );

    this.setState({
      image: img,
    });
  };

  render() {
    if (this.state.product) {
      const { gallery } = this.state.product;
      return (
        <>
          <Header />
          <div className='pdp-container'>
            <Gallery setImage={this.setImage} gallery={gallery} />
            <ProductImage image={this.state.image} />
            <Description product={this.state.product} />
          </div>
        </>
      );
    }
    return null;
  }
}

const HOCProductPage = withRouter(ProductDescriptionPage);
export default HOCProductPage;

class Gallery extends Component {
  render() {
    const { gallery } = this.props;
    return (
      <div className='pdp-gallery-img-container'>
        {gallery.map((img, index) => (
          <img
            onClick={(event) => this.props.setImage(event)}
            src={img}
            key={index}
            alt='product'
          />
        ))}
      </div>
    );
  }
}

class ProductImage extends Component {
  render() {
    return (
      <div className='big-image'>
        <img src={this.props.image} alt='product' />
      </div>
    );
  }
}

class Description extends Component {
  static contextType = CurrencyContext;

  state = {
    product: { id: this.props.product.id, attributes: [] },
  };

  addAttribute = (attributes) => {
    this.setState({
      product: { id: this.props.product.id,  attributes: attributes },
    });
  };

  handleClick = () => {
    this.context.addProduct(this.state.product);
    this.setState({ added: true });
    setTimeout(() => {
      this.setState({ added: false });
    }, 2000);
  };

  render() {
    const { brand, name, description, prices, attributes } = this.props.product;
    console.log(this.props.product);
    return (
      <div className='description'>
        <div className='brand'>{brand}</div>
        <div className='name'>{name}</div>
        <Attributes attributes={attributes} />
        <Price
          price={prices.find(
            (price) => price.currency.symbol === this.context.currency
          )}
        />
        <button
          className={this.state?.added ? 'add-button-added' : 'add-button'}
          onClick={this.handleClick}>
          {this.state?.added ? 'Added to the cart!' : 'Add to Cart'}
        </button>
        <div className='product-description'>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
      </div>
    );
  }
}

class Attributes extends Component {
  render() {
    const { attributes } = this.props;
    return (
      <div className=''>
        {attributes.map((attribute) => {
          return (
            <div key={attribute.id} className='attribute-label'>
              {attribute.name}:
              <div className='attribute-values-container'>
                {attribute.items.map((item) => {
                  if (attribute.type === 'swatch') {
                    return (
                      <button
                        className='selector'
                        key={item.id}
                        onClick={() =>
                          console.log({ ...attribute, items: [item] })
                        }
                        style={{ backgroundColor: item.value }}></button>
                    );
                  }
                  return (
                    <button
                      className='selector'
                      key={item.id}
                      onClick={() =>
                        console.log({ ...attribute, items: [item] })
                      }>
                      {item.displayValue}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

class Price extends Component {
  render() {
    // console.log(this.props);
    return (
      <div className='price'>
        <div className='attribute-label'>PRICE:</div>
        <div className='amount'>
          {this.props.price.currency.symbol} {this.props.price.amount}
        </div>
      </div>
    );
  }
}
