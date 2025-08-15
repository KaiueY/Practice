# Set / WeakSet / Map / WeakMap 深入剖析笔记

## 1. 概览对比表

| 数据结构    | 键的类型限制       | 是否弱引用 | 是否可枚举 | 常见用途 |
|-------------|-------------------|------------|------------|----------|
| `Set`       | 任意值             | ❌ 否      | ✅ 可迭代   | 去重集合、集合运算 |
| `WeakSet`   | **只能是对象**     | ✅ 是      | ❌ 不可迭代 | 存储对象引用，不影响 GC |
| `Map`       | 任意值             | ❌ 否      | ✅ 可迭代   | 键值对存储（对象键不限于字符串） |
| `WeakMap`   | **只能是对象**     | ✅ 是      | ❌ 不可迭代 | 为对象绑定私有数据，不影响 GC |

---

## 2. 弱引用的含义

### 定义
**弱引用（Weak Reference）**：  
当对象只被弱引用持有时，JS 引擎的垃圾回收器（GC）会在下一次回收中直接释放它，不会因为这个引用而延长对象的生命周期。

### 后果
1. **不可枚举**：因为对象可能随时被 GC 清理，无法保证迭代结果稳定。
2. **只能存对象**：原始值（string、number、boolean 等）没有 GC 生命周期的概念，弱引用对它们无意义。

---

## 3. 底层实现差异

### Set / Map（强引用）
- 内部是强引用哈希表（通常是哈希 + 链表或哈希 + 红黑树）。
- Key 比较算法：**SameValueZero**（类似 `===`，但 `NaN` 等于 `NaN`）。
- 引擎会额外维护一个**迭代顺序数组**，保证插入顺序可枚举。

```js
const s = new Set();
let obj = {name: "A"};
s.add(obj);
obj = null; 
// Set 依然持有 obj 的强引用，对象不会被回收

WeakSet / WeakMap（弱引用）
	•	内部是弱引用哈希表（Key 用对象的内存地址 identity hash 存储）。
	•	JS 层面无法访问完整数据，也无法枚举。
	•	Weak* 结构只保存键的弱引用，不会阻止 GC 回收。
const ws = new WeakSet();
let obj = {name: "A"};
ws.add(obj);
obj = null; 
// 对象会被 GC 回收，WeakSet 自动清理
```

## 4. 内存行为对比

```js
// Map 强引用
let m = new Map();
let key = {id: 1};
m.set(key, "value");

key = null;
// GC 后对象依然存在于 Map 中
console.log([...m]); // [[{id: 1}, "value"]]

// WeakMap 弱引用
let wm = new WeakMap();
let key2 = {id: 2};
wm.set(key2, "value");

key2 = null;
// GC 后对象和对应记录一同被释放（无法遍历确认）

```
## 5. 应用场景
```js
Set
	•	数组去重
	•	集合运算（并集 / 交集 / 差集）


    const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);
const union = new Set([...a, ...b]); // 并集

WeakSet
	•	存储对象的访问标记，不影响其生命周期

    const visited = new WeakSet();
function traverse(node) {
  if (visited.has(node)) return;
  visited.add(node);
  // ...
}
Map
	•	缓存计算结果


    const cache = new Map();
function calc(obj) {
  if (cache.has(obj)) return cache.get(obj);
  const result = heavyWork(obj);
  cache.set(obj, result);
  return result;
}

WeakMap
	•	为对象存储私有数据（外部无法访问，随对象释放自动清理）

    const privateData = new WeakMap();
class Person {
  constructor(name) {
    privateData.set(this, {name});
  }
  getName() {
    return privateData.get(this).name;
  }
}
```

## 6. V8 内存布局剖析

以下是简化版的内存关系示意（真实 V8 会更复杂）

Map / Set（强引用）

Map/Set 强引用表
┌─────────────┐
│ Hash Table  │
│ ┌─────────┐ │
│ │ obj ptr │───▶ Heap Object { ... }
│ └─────────┘ │
│   value      │
└─────────────┘
(强引用：GC 看到这里仍然可达，不会回收)


WeakMap / WeakSet（弱引用）

Weak* 弱引用表
┌─────────────┐
│ Weak Table  │
│ ┌─────────┐ │
│ │ obj ptr │--weak--> Heap Object { ... }
│ └─────────┘ │
│   value      │
└─────────────┘
(弱引用：GC 不会把这个引用计入可达性分析)
在 V8 中，WeakMap 的 entry 会挂在对象的 WeakCell 链表中，GC 标记阶段如果对象不可达，就会把 WeakCell 标记为无效，并在清理阶段移除。

⸻

## 7. GC 可视化实验（Chrome DevTools）
```js
// 打开 DevTools → Memory 面板
// 选择 "Heap snapshot" 或 "Allocation instrumentation"
// 在控制台运行：

let wm = new WeakMap();
(function() {
  let obj = {name: "temp"};
  wm.set(obj, "some data");
})();

// 点击 "Collect garbage" 强制 GC
// 在 WeakMap 中的记录会自动清除（不可遍历）
``` 