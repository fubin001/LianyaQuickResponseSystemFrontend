/**
 * 获取自适应宽度
 * @param rows 所有行数据
 * @param label 标签
 * @param prop 对应字段
 * @returns {string}
 */
export function flexColumnWidth(rows, label, prop) {
  // 1.获取该列的所有数据
  let arr = []
  if (rows && rows.length > 0) {
    arr = rows.map((x) => x[prop])
  }
  arr.push(label) // 把每列的表头也加进去算
  // 2.计算每列内容最大的宽度 + 表格的内间距（依据实际情况而定）
  return getMaxLength(arr) + 20 + 'px'
}

function getTextWidth(str) {
  let width = 0
  const html = document.createElement('span')
  html.innerText = str
  html.className = 'getTextWidth'
  document.querySelector('body').appendChild(html)
  width = document.querySelector('.getTextWidth').offsetWidth
  document.querySelector('.getTextWidth').remove()
  return width
}

function getMaxLength(arr) {
  return arr.reduce((acc, item) => {
    if (item) {
      const calcLen = getTextWidth(item)
      if (acc < calcLen) {
        acc = calcLen
      }
    }
    return acc
  }, 0)
}
