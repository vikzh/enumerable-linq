class Enumerable {
  constructor(collection, operations) {
    this.collection = collection;
    this.operations = operations || [];
  }

  addOperation(operation) {
    return new Enumerable(this.collection.slice(), this.operations.concat(operation));
  }

  where(f) {
    return this.addOperation(coll => coll.filter(f));
  }

  select(f) {
    return this.addOperation(coll => coll.map(f));
  }

  orderBy(f, direction = 'asc') {
    const compareResult = direction === 'asc' ? 1 : -1;
    const comparator = (a, b) => {
      const aValue = f(a);
      const bValue = f(b);

      if (aValue > bValue) {
        return compareResult;
      }
      if (aValue < bValue) {
        return -compareResult;
      }

      return 0;
    };
    return this.addOperation(coll => coll.sort(comparator));
  }

  getProcessedCollection() {
    if (!this.memo) {
      this.memo = this.operations.reduce(
        (acc, curOperation) => curOperation(acc),
        this.collection.slice(),
      );
    }
    return this.memo;
  }

  toArray() {
    return this.getProcessedCollection();
  }

  get length() {
    return this.getProcessedCollection().length;
  }
}

export default Enumerable;
