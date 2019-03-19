class Enumerable {
  constructor(collection, operations) {
    this.collection = collection;
    this.operations = operations || [];
  }

  addOperation(operation) {
    return new Enumerable(this.collection.slice(), this.operations.concat(operation));
  }

  /**
   * Query from object
   * @param predicates
   * @returns {Enumerable}
   * @example
   *const coll = new Enumerable([{age: 37,name: 'Bobbie Hanson',gender: 'female',group: 6,},
   *                            {age: 38,name: 'Leon Oneill',gender: 'male',group: 7,},]);
   *const result = coll.where(obj => obj['age'] > 37)//where(obj => obj['age'] > 37, {gender: male})
   *                   .where({gender: male})
   *result.toArray(); //[{age: 38,name: 'Leon Oneill',gender: 'male',group: 7,}]
   */
  where(...predicates) {
    const newOperations = predicates.map((predicate) => {
      if (typeof predicate === 'function') {
        return coll => coll.filter(predicate);
      }

      const checkingKeys = Object.keys(predicate);
      return coll => coll.filter(
        element => checkingKeys.every(key => predicate[key] === element[key]),
      );
    });
    return this.addOperation(newOperations);
  }

  /**
   * Select properties
   * @param f
   * @returns {Enumerable}
   * @example
   * const coll = new Enumerable([{age: 37,name: 'Bobbie Hanson',gender: 'female',group: 6,},
   *                            {age: 38,name: 'Leon Oneill',gender: 'male',group: 7,},]);
   * coll.select(person => person.gender).toArray()//['female', 'male']
   */
  select(f) {
    return this.addOperation(coll => coll.map(f));
  }

  /**
   * Order collection
   * @param f (sort function)
   * @param direction
   * @returns {Enumerable}
   * @example
   * const coll = new Enumerable([{age: 37,name: 'Bobbie Hanson',gender: 'female',group: 6,},
   *                            {age: 38,name: 'Leon Oneill',gender: 'male',group: 7,},]);
   * coll.order(person => person.age, 'desc');
   * //[{age: 38,name: 'Leon Oneill',gender: 'male',group: 7,},
   * //{age: 37,name: 'Bobbie Hanson',gender: 'female',group: 6,},]
   */
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

  /**
   * Returns array from object
   * @returns {array}
   * @example
   * const coll = new Enumerable([{age: 37,name: 'Bobbie Hanson',gender: 'female',group: 6,},
   *                            {age: 38,name: 'Leon Oneill',gender: 'male',group: 7,},]);
   * coll.toArray(); //[{age: 37,name: 'Bobbie Hanson',gender: 'female',group: 6,},
   *                //  {age: 38,name: 'Leon Oneill',gender: 'male',group: 7,},]
   */
  toArray() {
    return this.getProcessedCollection();
  }

  /**
   * Returns number of elements
   * @returns {int}
   * @example
   * const coll = new Enumerable([{age: 37,name: 'Bobbie Hanson',gender: 'female',group: 6,},
   *                            {age: 38,name: 'Leon Oneill',gender: 'male',group: 7,},]);
   * coll.length(); //2
   */
  get length() {
    return this.getProcessedCollection().length;
  }
}

export default Enumerable;
