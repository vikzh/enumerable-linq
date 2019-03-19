[![Maintainability](https://api.codeclimate.com/v1/badges/24484a5b3ef3ab225913/maintainability)](https://codeclimate.com/github/vikzh/enumerable-linq/maintainability)[![Test Coverage](https://api.codeclimate.com/v1/badges/24484a5b3ef3ab225913/test_coverage)](https://codeclimate.com/github/vikzh/enumerable-linq/test_coverage)[![Build Status](https://travis-ci.org/vikzh/enumerable-linq.svg?branch=master)](https://travis-ci.org/vikzh/enumerable-linq)
# Enumerable-linq
##Features
* Fluent interface
* Immutable
* Lazy Evaluation
* Memoization
## Install
````
npm install enumerable-linq
````
## Using
````js
import Enumerable from 'enumerable-linq';

const people = new Enumerable([
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
]);
const newGroup = people.select(person => person.group)
      .where(person => person.group > 6);
newGroup.length(); //2
newGroup.toArray();
//[  
// {
//     age: 38,
//     name: 'Leon Oneill',
//     gender: 'male',
//     group: 7,
//   },      
//   {
//     age: 26,
//     name: 'Leach Christensen',
//     gender: 'male',
//     group: 9,
//   },
//];
````
## Documentation
### Table of Contents

-   [where][1]
    -   [Parameters][2]
    -   [Examples][3]
-   [select][4]
    -   [Parameters][5]
    -   [Examples][6]
-   [orderBy][7]
    -   [Parameters][8]
    -   [Examples][9]
-   [toArray][10]
    -   [Examples][11]
-   [length][12]
    -   [Examples][13]

## where

Query from object

### Parameters

-   `predicates` **...any** 

### Examples

```javascript
const coll = new Enumerable([{age: 37,name: 'Bobbie Hanson',gender: 'female',group: 6,},
                           {age: 38,name: 'Leon Oneill',gender: 'male',group: 7,},]);
const result = coll.where(obj => obj['age'] > 37)//where(obj => obj['age'] > 37, {gender: male})
                  .where({gender: male})
result.toArray(); //[{age: 38,name: 'Leon Oneill',gender: 'male',group: 7,}]
```

Returns **Enumerable** 

## select

Select properties

### Parameters

-   `f`  

### Examples

```javascript
const coll = new Enumerable([{age: 37,name: 'Bobbie Hanson',gender: 'female',group: 6,},
                           {age: 38,name: 'Leon Oneill',gender: 'male',group: 7,},]);
coll.select(person => person.gender).toArray()//['female', 'male']
```

Returns **Enumerable** 

## orderBy

Order collection

### Parameters

-   `f`  (sort function)
-   `direction`  

### Examples

```javascript
const coll = new Enumerable([{age: 37,name: 'Bobbie Hanson',gender: 'female',group: 6,},
                           {age: 38,name: 'Leon Oneill',gender: 'male',group: 7,},]);
coll.order(person => person.age, 'desc');
//[{age: 38,name: 'Leon Oneill',gender: 'male',group: 7,},
//{age: 37,name: 'Bobbie Hanson',gender: 'female',group: 6,},]
```

Returns **Enumerable** 

## toArray

Returns array from object

### Examples

```javascript
const coll = new Enumerable([{age: 37,name: 'Bobbie Hanson',gender: 'female',group: 6,},
                           {age: 38,name: 'Leon Oneill',gender: 'male',group: 7,},]);
coll.toArray(); //[{age: 37,name: 'Bobbie Hanson',gender: 'female',group: 6,},
               //  {age: 38,name: 'Leon Oneill',gender: 'male',group: 7,},]
```

Returns **[array][14]** 

## length

Returns number of elements

### Examples

```javascript
const coll = new Enumerable([{age: 37,name: 'Bobbie Hanson',gender: 'female',group: 6,},
                           {age: 38,name: 'Leon Oneill',gender: 'male',group: 7,},]);
coll.length(); //2
```

Returns **int** 

[1]: #where

[2]: #parameters

[3]: #examples

[4]: #select

[5]: #parameters-1

[6]: #examples-1

[7]: #orderby

[8]: #parameters-2

[9]: #examples-2

[10]: #toarray

[11]: #examples-3

[12]: #length

[13]: #examples-4

[14]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array
