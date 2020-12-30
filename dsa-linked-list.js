class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let currNode = this.head;
      while (currNode.next !== null)
        currNode = currNode.next;
      currNode.next = new _Node(item, null);
    }
  }

  insertBefore(item, key) {
    let prevNode;
    let currNode;

    if (this.head.value === key) {
      this.insertFirst(item);
    } else {
      prevNode = this.head;
      currNode = this.head.next;
      while (currNode) {
        if (currNode.value === key) {
          const node = new _Node(item, currNode);
          prevNode.next = node;
          return;
        } else {
          prevNode = currNode;
          currNode = currNode.next;
        }
      }
    }
  }

  insertAfter(item, key) {
    let currNode = this.head;
    while (currNode) {
      if (currNode.value === key) {
        const node = new _Node(item, currNode.next);
        currNode.next = node;
        return;
      } else {
        currNode = currNode.next;
      }
    }
  }

  insertAt(item, position) {
    let prevNode;
    let currNode;

    if (position === 0) {
      this.insertFirst(item);
    } else {
      prevNode = this.head;
      currNode = this.head.next;
      let idx = 1;
      while (currNode) {
        if (idx === position) {
          const node = new _Node(item, currNode);
          prevNode.next = node;
          return;
        }
        prevNode = currNode;
        currNode = currNode.next;
        idx++;
      }
    }
  }

  find(item) {
    let currNode = this.head;
    while (currNode) {
      if (currNode.value === item) return currNode;
      currNode = currNode.next;
    }
    return null;
  }

  remove(item) {
    if (!this.head) {
      return;
    } else if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }

    let prevNode;
    let currNode = this.head;

    while (currNode) {
      if (currNode.value === item) {
        prevNode.next = currNode.next;
        currNode = currNode.next;
        if (!currNode) return;
      }
      prevNode = currNode;
      currNode = currNode.next;
    }
  }
}

class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

function display(list) {
  let str = '';

  if (list.head === null)
    return 'head -> null';
  else {
    str += `(head -> ${list.head.value})`;

    let currNode = list.head.next;
    while (currNode) {
      str += ` -> ${currNode.value}`;
      currNode = currNode.next;
    }
    str += ' -> null';
    console.log(str);
  }
}

function size(list) {
  let currNode = list.head;
  let size = 0;

  while (currNode) {
    size++;
    currNode = currNode.next;
  }
  return size;
}

function isEmpty(list) {
  if (!list.head) return true;
  return false;
}

function findPrevious(list, item) {
  if (list.head === null || item === list.head.value)
    return null;

  let prevNode = list.head;
  let currNode = list.head.next;
  while (currNode) {
    if (currNode.value === item)
      return prevNode;
    prevNode = currNode;
    currNode = currNode.next;
  }
}

function findLast(list) {
  if (!list.head) return null;
  let currNode = list.head;
  while (currNode.next) currNode = currNode.next;
  return currNode;
}

/**
 * 2. Create a singly linked list
 */
function main() {
  const SLL = new LinkedList();
  SLL.insertLast('Apollo');
  SLL.insertLast('Boomer');
  SLL.insertLast('Helo');
  SLL.insertLast('Husker');
  SLL.insertLast('Starbuck');
  SLL.insertLast('item');
  SLL.remove('squirrel');
  SLL.insertBefore('Athena', 'Boomer');
  SLL.insertAfter('Hotdog', 'Helo');
  SLL.insertAt('Kat', 2);
  SLL.remove('item');
  /**
   * 3. Supplemental functions for a linked list
   */
  display(SLL);
  console.log(size(SLL));
  console.log(isEmpty(SLL));
  console.log(findPrevious(SLL, 'Boomer'));
  console.log(findLast(SLL));
}
//main();

/**
 * 4. Mystery program
 function WhatDoesThisProgramDo(lst) {
     let current = lst.head;
     while (current !== null) {
         let newNode = current;
         while (newNode.next !== null) {
             if (newNode.next.value === current.value) {
                 newNode.next = newNode.next.next;
             }
             else {
                 newNode = newNode.next;
             }
         }
         current = current.next;
     }
 }
 * Removes any duplicates. O(n^2) since it will run n^2/2 if there are no duplicates.
 */

/**
 * 5. Reverse a list
 * node1 -> node2 -> node3 -> node4 => node4 -> node3 -> node2 -> node1
 */
function reverseHelper(node, prev = null) {
  if (!node.next) {
    node.next = prev;
    return node;
  }
  let head = reverseHelper(node.next, node);
  node.next = prev;
  return head;
}

function reverseList(list) {
  if (!list.head || !list.head.next) return list;

  list.head = reverseHelper(list.head);
  return list;
}

function reverseListIterative(list) {
  if (!list.head || !list.head.next) return list;

  let oldHead = list.head;
  let currHead = list.head;
  let currNode = list.head.next;

  let temp;
  while (currNode) {
    temp = currNode.next;
    currNode.next = currHead;
    currHead = currNode;
    currNode = temp;
  }
  list.head = currHead;
  oldHead.next = null;
  return list;
}
// const SLL = new LinkedList();
// SLL.insertLast('node1');
// SLL.insertLast('node2');
// SLL.insertLast('node3');
// SLL.insertLast('node4');
// display(reverseListIterative(SLL));

/**
 * 6. 3rd from the end
 * node1 -> node2 -> node3 => node1
 */
function find3rdfromEnd(list) {
  if (!list.head || !list.head.next || !list.head.next.next) return null;

  let currNode = list.head;
  while (currNode.next.next.next) currNode = currNode.next;
  return currNode;
}
// const SLL = new LinkedList();
// SLL.insertLast('node1');
// SLL.insertLast('node2');
// SLL.insertLast('node3');
// console.log(find3rdfromEnd(SLL));

/**
 * 7. Middle of a list
 * node1 -> node2 -> node3 -> node4 => node3;
 */
function middleOfList(list) {
  let node1 = list.head;
  let node2 = list.head;

  if (!list.head) return null;

  while (node2.next) {
    node1 = node1.next;
    node2 = node2.next.next ? node2.next.next : node2.next;
  }
  return node1;
}
// const SLL = new LinkedList();
// SLL.insertLast('node1');
// SLL.insertLast('node2');
// SLL.insertLast('node3');
// SLL.insertLast('node4');
// console.log(middleOfList(SLL));

/**
 * 8. Cycle in a list
 * node1 -> node2 -> node3 -> node1 => true;
 */
function cycleList(list) {
  let head = list.head;

  if (!list.head || !list.head.next) return false;

  let currNode = list.head.next;
  while (currNode) {
    if (currNode === head) return true;
    currNode = currNode.next;
  }
  return false;
}
// const SLL = new LinkedList();
// SLL.insertLast('node1');
// SLL.insertLast('node2');
// SLL.insertLast('node3');
// SLL.head.next.next.next = SLL.head;
// console.log(cycleList(SLL));

/**
 * 9. Doubly linked list
 */
class DoublyLinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _DLLnode(item, null, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let currNode = this.head;
      while (currNode.next !== null)
        currNode = currNode.next;
      currNode.next = new _DLLnode(item, currNode, null);
    }
  }

  insertBefore(item, key) {
    if (this.head === null) return;

    if (this.head.value === key) {
      this.insertFirst(item);
    } else {
      let currNode;
      currNode = this.head.next;
      while (currNode) {
        if (currNode.value === key) {
          const node = new _DLLnode(item, currNode.prev, currNode);
          currNode.prev.next = node;
          return;
        } else {
          currNode = currNode.next;
        }
      }
    }
  }

  insertAfter(item, key) {
    let currNode = this.head;
    while (currNode) {
      if (currNode.value === key) {
        const node = new _DLLnode(item, currNode, currNode.next);
        currNode.next = node;
        return;
      } else {
        currNode = currNode.next;
      }
    }
  }

  insertAt(item, position) {
    if (position === 0) {
      this.insertFirst(item);
    } else {
      let currNode;
      currNode = this.head.next;
      let idx = 1;
      while (currNode) {
        if (idx === position) {
          const node = new _DLLnode(item, currNode.prev, currNode);
          currNode.prev.next = node;
          return;
        }
        currNode = currNode.next;
        idx++;
      }
    }
  }

  find(item) {
    let currNode = this.head;
    while (currNode) {
      if (currNode.value === item) return currNode;
      currNode = currNode.next;
    }
    return null;
  }

  remove(item) {
    if (!this.head) {
      return;
    } else if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }

    let currNode = this.head;
    while (currNode) {
      if (currNode.value === item) {
        currNode.prev.next = currNode.next;
        currNode = currNode.next;
        if (!currNode) return;
      }
      currNode = currNode.next;
    }
  }
}

class _DLLnode {
  constructor(value, prev, next) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}
function mainDLL() {
  const DLL = new DoublyLinkedList();
  DLL.insertLast('node1');
  DLL.insertLast('node2');
  DLL.insertLast('node3');
  DLL.insertLast('node4');
  DLL.insertLast('node5');
  DLL.insertLast('item');
  DLL.remove('node4');
  display(DLL);
}
// mainDLL();

/**
 * 10. Reverse a DLL
 */

function reverseDLL(list) {
  if (!list.head || !list.head.next) return list;

  let currNode = list.head;
  let temp;
  while (currNode) {
    temp = currNode.next;
    currNode.next = currNode.prev;
    currNode.prev = temp;
    if (currNode.prev === null) break;
    else currNode = currNode.prev;
  }
  list.head = currNode;
  return list;
}
const DLL = new DoublyLinkedList();
DLL.insertLast('node1');
DLL.insertLast('node2');
DLL.insertLast('node3');
DLL.insertLast('node4');
display(reverseDLL(DLL));
/** 
 * They are different because you don't have to keep track of the previous iteration, you can just switch
 * the next and previous values of the current node.
 */