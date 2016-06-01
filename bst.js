/**
 * Binary Search Tree implementation simplified
 * from  https://github.com/louischatriot/node-binary-search-tree/blob/master/lib/bst.js
 */

 /**
  * Constructor
  * @param {Object} options Optional
  * @param {Boolean}  options.unique Whether to enforce a 'unique' constraint on the key or not
  * @param {Key}      options.key Initialize this BST's key with key
  * @param {Value}    options.value Initialize this BST's data with [value]
  * @param {Function} options.compareKeys Initialize this BST's compareKeys
  */
function BinarySearchTree (options){

  options = options || {};

  this.left = null;
  this.right = null;
  this.parent = options.parent !== undefined ?
  options.parent : null;
  this.key = options.hasOwnProperty('key') ?
    options.key : null;
  this.value = options.hasOwnProperty('value') ?
    [options.value] : [];

  this.compareKeys = options.hasOwnProperty('compareKeys') ?
    this.compareKeys = options.compareKeys : function(a, b){
        if(a < b){
          return -1;
        }else if(a > b){
          return 1;
        }else {
          return 0;
        }
    };
}

/**
 * Create a node to the left
 * @param  Object options
 */
BinarySearchTree.prototype.createLeftChild = function(options){
  var leftChild = new BinarySearchTree(options);
  leftChild.parent = this;
  this.left = leftChild;
}

/**
 * Create a node to the right
 * @param  Object options
 */
BinarySearchTree.prototype.createRightChild = function(options){
  var rightChild = new BinarySearchTree(options);
  rightChild.parent = this;
  this.right = rightChild;
}

/**
 * Insert a new node
 * @param  Object key
 * @param  Object value
 */
BinarySearchTree.prototype.insert = function(key, value){

  if(this.key === null || this.key === key){
    this.key = key;
    this.value.push(value);
  } else {

    if(this.compareKeys(this.key, key) < 0){

      if(this.left){
        this.left.insert(key, value);
      }else{
        this.createLeftChild({key: key, value:value});
      }

    } else {

      if(this.right){
        this.right.insert(key, value);
      }else{
        this.createRightChild({key: key, value:value});
      }
    }

  }
 return;
}

/**
 * Shearches node according to key
 * @param Object key
 */
BinarySearchTree.prototype.search = function(key){
  if(!this.hasOwnProperty('key')) { return []; }

  if(this.compareKeys(this.key, key) === 0){
    return this.value;
  }

  if(this.compareKeys(this.key, key) < 0){
    if(this.left){
      return this.left.search(key);
    } else {
      return [];
    }
  } else {
    if(this.right){
      return this.right.search(key);
    } else {
      return [];
    }
  }
}

module.exports = BinarySearchTree;
