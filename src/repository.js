import { client, Query, Field } from '@tilework/opus';

client.setEndpoint('http://localhost:4000/');

async function getProductById(id) {
  var query = new Query('product')
    .addArgument('id', 'String!', id)
    .addField('id')
    .addField('name')
    .addField('inStock')
    .addField('gallery')
    .addField('description')
    .addField('brand')
    .addField(
      new Field('attributes')
        .addField('id')
        .addField('name')
        .addField('type')
        .addField(new Field('items').addField('id').addField('value').addField('displayValue')))
    .addField(
      new Field('prices')
        .addField('amount')
        .addField(new Field('currency').addField('label').addField('symbol'))
    );

  return await client.post(query);
}

async function getCategoriesWithProducts() {
  var query = new Query('categories')
    .addField('name')
    .addField(
      new Field('products', true)
        .addField('id')
        .addField('name')
        .addField('inStock')
        .addField('gallery')
        .addField(
          new Field('attributes')
            .addField('id')
            .addField('name')
            .addField('type')
            .addField(new Field('items').addField('id').addField('value').addField('displayValue')))
        .addField(new Field('prices')
          .addField(new Field('currency').addField('label').addField('symbol'))
          .addField('amount'))
    );
  return await client.post(query);
}

async function getCategories() {
  var query = new Query('categories').addField('name');
  return await client.post(query);
}

async function getCurrencies() {
  var query = new Query('currencies').addFieldList(['symbol', 'label']);
  return await client.post(query);
}


export { getProductById, getCategoriesWithProducts, getCategories, getCurrencies };
