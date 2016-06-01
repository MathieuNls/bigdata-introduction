var BinarySearchTree = require('./bst');


var bst = new BinarySearchTree();

// Inserting some data
bst.insert(15, {name: "Mathieu", lastname: "Nayrolles"});
bst.insert(12, 'something else');
bst.insert(18, 'hello');
bst.insert(18, 'world');

console.log(bst.search(15));
console.log(bst.search(18));
