import React from 'react';
// import { gql } from '@apollo/client';

class GraphQlTest extends React.Component {
  // getCategories = () => {
  //   this.props.client.query({
  //     query: gql`
  //       {
  //         currencies {
  //           label
  //         }
  //       }
  //     `,
  //   }).then(result => console.log(result));
  // };

  render() {
    // this.getCategories();
    return <h1>Graph Cmp Works!</h1>;
  }
}

export default GraphQlTest;
