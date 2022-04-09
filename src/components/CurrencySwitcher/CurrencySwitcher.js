import React, { Component } from 'react';
import './CurrencySwitcher.css';
import { getCurrencies } from '../../repository';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default class CurrencySwitcher extends Component {
  state = {
    loaded: false,
    selectedCurrency: {},
  };

  currencies;
  async componentDidMount() {
    const data = await getCurrencies();
    this.currencies = data.currencies;
    const [firstCurrency] = this.currencies;
    this.setState({ loaded: true, selectedCurrency: firstCurrency });
  }

  setSelectedCurrency(selected) {
    const selectedCurrency = this.currencies.find(
      (currency) => currency.symbol === selected
    );
    this.setState({ selectedCurrency: selectedCurrency });
    this.props.onSwitch(selected);
  }

  render() {
    return (
      <CurrencyDropdown
        selected={this.state.selectedCurrency.symbol}
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
          )}
        </div>
      </div>
    );
  }
}
