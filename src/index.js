class Enumerable {
  constructor(collection) {
    this.collection = collection;
  }

  where = (f) => {
    this.collection = this.collection.filter(f);
    return this.collection;
  };

  select = (f) => {
    this.collection = this.collection.map(f);
    return this.collection;
  };

  orderBy = (f, direction = 'asc') => {
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
    this.collection.sort(comparator);
    return this;
  };

  toArray = () => this.collection.slice();
}

export default Enumerable;
