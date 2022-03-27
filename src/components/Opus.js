import { client, Query } from '@tilework/opus';
import React from 'react';

client.setEndpoint('http://localhost:4000/');

class Opus extends React.Component {
  query = new Query('categories', true).addField('name');
  state = {
    categories: [],
  };

  componentDidMount() {
    client.post(this.query).then((result) => {
      this.setState({ categories: result.categories });
    });
  }

  render() {
    return this.state.categories.map((cat, index) => {
      return <div key={index}>{cat.name}</div>;
    });
  }
}

export default Opus;
