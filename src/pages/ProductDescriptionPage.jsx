import React, { Component } from 'react';
import { getProductById } from '../repository';
import { useParams } from 'react-router-dom';

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
  };

  static getDerivedStateFromProps(nextProps) {
    return {
      id: nextProps.params.id,
    };
  }

  async componentDidMount() {
    this.setState({ id: this.props.params.id });

    const { product } = await getProductById(this.state.id);
    this.setState({product: product});
  }

  render() {
    if (this.state.product) {
      const { gallery } = this.state.product;
      return (
        <>
          <div className='pdp-container'>
            <Gallery gallery={gallery} />
            <ProductImage image={gallery[0]} />
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
          <img src={img} key={index} alt='product' />
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
  render() {
    const { brand, name, description, prices, attributes } = this.props.product;
    console.log(prices);
    return (
      <div className='description'>
        <div className='brand'>{brand}</div>
        <div className='name'>{name}</div>
        <Attributes attributes={attributes} />
        <Price price={prices[0]} />
        <button className='add-button'>Add to Cart</button>
        <div className='product-description'>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
      </div>
    );
  }
}

class Price extends Component {
  render() {
    console.log(this.props);
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

class Attributes extends Component {
  render() {
    const { attributes } = this.props;
    console.log('attributes:', this.props);
    return (
      <div className=''>
        {attributes.map((attribute) => {
          return (
            <Attribute
              key={attribute.id}
              name={attribute.name}
              type={attribute.type}
              items={attribute.items}
            />
          );
        })}
      </div>
    );
  }
}

class Attribute extends Component {
  render() {
    return (
      <div className='attribute-label'>
        {this.props.name}:
        {<AttributeType items={this.props.items} type={this.props.type} />}
      </div>
    );
  }
}

class AttributeType extends Component {
  render() {
    console.log('types:', this.props);
    const { items, type } = this.props;
    return (
      <div className='attribute-values-container'>
        {items.map((item) => {
          if (type === 'swatch') {
            return (
              <button
                className='selector'
                key={item.id}
                style={{ backgroundColor: item.value }}></button>
            );
          }
          return (
            <button className='selector' key={item.id}>
              {item.displayValue}
            </button>
          );
        })}
      </div>
    );
  }
}
