class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  _heapifyUp() {
    if (this.heap.length === 1) return;
    let index = this.heap.length - 1;

    while (index > 0) {
      const parentIndex = index - 1;
      if (this.heap[parentIndex].priority <= this.heap[this.heap.length - 1].priority) {
        break;
      }
      index = parentIndex;
    }
    this.heap.splice(index, 0, this.heap.pop());
  }

  enqueue(value, priority) {
    this.heap.push({ value, priority });
    this._heapifyUp();
  }

  dequeue() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const root = this.heap[0];
    this.heap.shift();
    return root;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }
}

module.exports = { PriorityQueue };