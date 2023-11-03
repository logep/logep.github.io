要翻转链表，你可以使用 JavaScript 编写一个函数。首先，你需要定义一个链表节点对象，然后编写一个函数来执行链表翻转操作。以下是一个示例：

```javascript
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function reverseLinkedList(head) {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

// 创建一个链表
const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);

node1.next = node2;
node2.next = node3;

// 输出原始链表
let current = node1;
while (current) {
  console.log(current.val);
  current = current.next;
}

// 翻转链表
const reversed = reverseLinkedList(node1);

// 输出翻转后的链表
current = reversed;
while (current) {
  console.log(current.val);
  current = current.next;
}
```

在上面的代码中，我们首先定义了一个 `ListNode` 类来表示链表节点。然后，我们编写了一个 `reverseLinkedList` 函数来执行链表翻转操作。最后，我们创建了一个链表，翻转它，并输出原始链表和翻转后的链表的值。

这个函数会将原始链表翻转，使链表的头部成为新链表的尾部，而链表的尾部成为新链表的头部。你可以根据自己的需求修改链表节点的值和连接方式。
