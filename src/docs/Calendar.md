生成日历的两种最直接的方式：基于日期 API 或者基于算数。

基于算数的方法稍显复杂且容易出错。

最主要展示的信息：上个月的信息（本月第一天不是星期日）、本月的信息、下个月的信息（本月最后一天不是星期六或下月第一天不是星期日）

关于 DOM 的复用：最好设置 `key` 为日期值，这样无论如何 1 号至 28 号的 DOM 都能完全无改动的复用。

如何处理点击事件：最好不要给每个元素单独绑定一个日期对象，绑定一个数字即可。当前月份的第 1 天为 1，前 1 天为 0，就像 API 中那样。这样每个日子对应着一个单纯的数字。

如何处理日历中的换行：

生成线性的结构，其余交给网格系统（基于浮动、flex 布局或 grid 布局）

即便是基于算数，也最好利用一下 API。否则很难处理当前是星期几的问题。

获得某月的天数：

```js
// month is 0-11
const getDaysOfMonth = (month, year) => {
  let days = 30
  if(Math.abs(month * 2 - 13) % 4 === 1)
    return ++days
  if (month > 1) return days
  if ((year % 4 || year % 25 === 0) && year % 400)
     --days
  return --days
}

Array(12).fill().map((_, i) => getDaysOfMonth(i, 2021))
```

由于 JS 可以对浮点数「求模」，所以可以这样写

```js
if(Math.abs(month - 6.5) % 2 === 0.5) return ++days
```

可否利用模运算的特性去掉绝对值？

另外的写法：

```js
const getDaysOfMonth = (month, year) => {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if(month !== 1) return days[month]
  // return days[month] + (year % 4 === 0 && year % 25) || (year % 400 === 0)
  // return days[month] + year % 100 ? year % 4 === 0 : year % 400 === 0
  // return days[month] + year % 25 ? year % 4 === 0 : year % 16 === 0
  // return days[month] + year % 25 ? (year & 3) === 0 : (year & 15) === 0
  return days[month] + year % 25 ? !(year & 0x3) : !(year & 0xf)
}
```

月历开始的第一天：

```js
const d = new Date()
d.setDate(1)
d.setDate(d.getDate()-d.getDay())
```

月历结束的最后一天：

```js
const d = new Date()
d.setMonth(d.getMonth()+1)
d.setDate(0)
d.setDate(d.getDate()+(6-d.getDay()))
```

样式参考：

[Date picker Dona app by Jakub Antalik on Dribbble](https://dribbble.com/shots/14648967-Date-picker-Dona-app)
