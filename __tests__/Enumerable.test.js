import Enumerable from '../src';

describe('Enumerable', () => {
  let coll;
  let people;
  beforeEach(() => {
    people = [
      {
        age: 37,
        name: 'Bobbie Hanson',
        gender: 'female',
        group: 6,
      },
      {
        age: 38,
        name: 'Leon Oneill',
        gender: 'male',
        group: 7,
      },
      {
        age: 26,
        name: 'Leach Christensen',
        gender: 'male',
        group: 9,
      },
      {
        age: 27,
        name: 'Brandie Hancock',
        gender: 'female',
        group: 1,
      },
      {
        age: 38,
        name: 'Burt Mann',
        gender: 'male',
        group: 8,
      },
      {
        age: 24,
        name: 'Sandy Mckinney',
        gender: 'female',
        group: 8,
      },
      {
        age: 28,
        name: 'Lesley Pacheco',
        gender: 'female',
        group: 6,
      },
    ];
    coll = new Enumerable(people);
  });

  it('#toArray', () => {
    expect(coll.toArray()).toEqual(people);
  });

  it('#length', () => {
    expect(coll.length).toBe(7);
  });

  it('#orderBy', () => {
    expect(coll.orderBy(person => person.age).toArray()).toEqual([
      {
        age: 24,
        name: 'Sandy Mckinney',
        gender: 'female',
        group: 8,
      },
      {
        age: 26,
        name: 'Leach Christensen',
        gender: 'male',
        group: 9,
      },
      {
        age: 27,
        name: 'Brandie Hancock',
        gender: 'female',
        group: 1,
      },
      {
        age: 28,
        name: 'Lesley Pacheco',
        gender: 'female',
        group: 6,
      },
      {
        age: 37,
        name: 'Bobbie Hanson',
        gender: 'female',
        group: 6,
      },
      {
        age: 38,
        name: 'Leon Oneill',
        gender: 'male',
        group: 7,
      },
      {
        age: 38,
        name: 'Burt Mann',
        gender: 'male',
        group: 8,
      },
    ]);
  });

  it('#where', () => {
    const firstWhereResult = coll.where(person => person.gender === 'male');
    const expectedFirstWhere = [people[1], people[2], people[4]];
    expect(firstWhereResult.toArray()).toEqual(expectedFirstWhere);
    const secondWhereResult = coll.where(person => person.group > 6);
    expect(secondWhereResult.toArray()).toHaveLength(4);
  });

  it('#select', () => {
    const selectTResult = coll.select(person => person.group);
    const expectedSelect = [6, 7, 9, 1, 8, 8, 6];
    expect(selectTResult.toArray()).toEqual(expectedSelect);
  });
});
