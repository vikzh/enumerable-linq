class Enumerable {
  constructor(collection) {
    this.collection = collection;
  }

  where(f) {
    return new Enumerable(this.collection.filter(f));
  }

  select(f) {
    return new Enumerable(this.collection.map(f));
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
    return new Enumerable(this.collection.sort(comparator));
  }

  toArray() {
    return this.collection;
  }
}

export default Enumerable;
