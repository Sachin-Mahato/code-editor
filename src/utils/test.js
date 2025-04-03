const object1 = {
  a: "somestring",
  b: 42,
  c: false,
};

console.log(Object.keys(object1).reduce((acc, key) => {
    if (key === "a") {
        acc[key] = true;
    }else {
        acc[key] = false
    }
    return acc;
}, {}));