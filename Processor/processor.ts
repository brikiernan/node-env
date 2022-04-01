import EventEmitter from 'events';
import StockList from './stock-list.json';

interface Stock {
  id: number;
  stock: number;
}

interface LineItem {
  itemId: number;
  quantity: number;
}

interface Payload {
  orderNumber: string;
  lineItems: LineItem[];
}

export default class Processor extends EventEmitter {
  private stock: Stock[] = [];

  constructor() {
    super();
    this.stock = StockList;
  }

  placeOrder({ lineItems, orderNumber }: Payload) {
    this.emit('PROCESSING_STARTED', orderNumber);

    if (lineItems && lineItems.length > 0) {
      for (const { itemId, quantity } of lineItems) {
        const isInStock = this.isItemInStock(itemId, quantity);

        if (!isInStock) {
          this.emit('PROCESSING_FAILED', {
            orderNumber,
            reason: 'INSUFFICIENT_STOCK',
            itemId,
          });

          return;
        }

        this.emit('PROCESSING_SUCCESS', orderNumber);
      }
    } else {
      this.emit('PROCESSING_FAILED', {
        orderNumber,
        reason: 'LINEITEMS_EMPTY',
      });
    }
  }

  isItemInStock(itemId: number, quantity: number) {
    const stock = this.stock.find(({ id, stock }) => {
      return id === itemId && stock >= quantity;
    });

    if (!stock) {
      return false;
    }

    return true;
  }
}
