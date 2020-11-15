# uptill

Simplified, dependency-free await for objects (and it works for arrays as well).

Example:
```js
  const proms = {
    getName: fetch([endpoint]),
    postData: axios.post(...),
    timeout: promisifiedTimeout(1000),
    //etc, etc
  }

  r = await uptill(proms)
  console.log(r)
  //=> r = { getName: "John Doe", postData: "data sent", timeout: "I'am back" }
```

It will also work for arrays so that you don't have to go switch between `uptill` and `Promise.all`:
```js
  const proms = [
    fetch([endpoint]),
    axios.post(...),
    promisifiedTimeout(1000),
    //etc, etc
  ]

  r = await uptill(proms)
  console.log(r)
  //=> r = [ "John Doe", "data sent", "I'am back" ]
```

