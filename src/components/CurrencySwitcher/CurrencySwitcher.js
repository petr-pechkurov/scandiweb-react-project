import React, { Component } from 'react';
import './CurrencySwitcher.css';
import { getCurrencies } from '../../repository';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import CurrencyContext from '../../contexts/CurrencyContext';

export default class CurrencySwitcher extends Component {
  state = {
    loaded: false,
  };

  static contextType = CurrencyContext;

  currencies;
  async componentDidMount() {
    const data = await getCurrencies();
    this.currencies = data.currencies;
    const selectedCurrency = this.currencies.find(
      (currency) => currency.symbol === this.context.currency
    );
    this.setState({ loaded: true, selectedCurrency: selectedCurrency });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedCurrency?.symbol !== this.context.currency) {
      const selectedCurrency = this.currencies.find(
        (currency) => currency.symbol === this.context.currency
      );
      this.setState({ loaded: true, selectedCurrency: selectedCurrency });
    }
  }

  setSelectedCurrency(selected) {
    const selectedCurrency = this.currencies.find(
      (currency) => currency.symbol === selected
    );
    this.setState({ selectedCurrency });
    this.context.setCurrency(selectedCurrency.symbol);
    sessionStorage.setItem('currency', selectedCurrency.symbol);
  }

  render() {
    return (
      <CurrencyDropdown
        selected={this.state.selectedCurrency?.symbol}
        options={this.currencies}
        onSelect={(selected) => this.setSelectedCurrency(selected)}
      />
    );
  }
}

class CurrencyDropdown extends Component {
  state = { open: false };

  render() {
    return (
      <div className='container'>
        <div className='dropdown'>
          <div
            onClick={() => this.setState({ open: !this.state.open })}
            className='select'>
            <span>
              {this.props.selected}{' '}
              {this.state.open ? (
                <FaChevronUp size={10} />
              ) : (
                <FaChevronDown size={10} />
              )}
            </span>
          </div>
          <input type='hidden' name='currency' />
          {this.state.open && (
            <>
              <div
                className='background'
                onClick={() => this.setState({ open: false })}></div>
              <ul className='dropdown-menu'>
                {this.props.options.map((option) => (
                  <li
                    key={option.symbol}
                    onClick={() => {
                      this.props.onSelect(option.symbol);
                      this.setState({ open: false });
                    }}>
                    {option.symbol} {option.label}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    );
  }
}
