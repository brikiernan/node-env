import OrderProcessor from './processor';

const orderProcessor = new OrderProcessor();

orderProcessor.on('PROCESSING_STARTED', orderNumber => {
  console.log(`Pre order checks running for ${orderNumber}`);
});

orderProcessor.on('PROCESSING_FAILED', failureData => {
  console.log('[Failed Order]', failureData);
});

orderProcessor.on('PROCESSING_SUCCESS', orderNumber => {
  console.log(`Pre order checks passed for ${orderNumber}`);
});

orderProcessor.placeOrder({
  orderNumber: '0021254',
  lineItems: [
    { itemId: 3, quantity: 4 },
    { itemId: 5, quantity: 4 },
  ],
});
