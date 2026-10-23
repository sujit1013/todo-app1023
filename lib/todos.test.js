import { addTodo, countRemaining, deleteTodo, toggleTodo,filterTodos } from './todos'

const sample = [
  { id: 'a', text: '牛乳を買う', done: false },
  { id: 'b', text: 'レポート提出', done: true },
]

describe('addTodo', () => {
  test('末尾に未完了の TODO が1件増える', () => {
    const result = addTodo(sample, '部屋の掃除')
    expect(result).toHaveLength(3)
    expect(result[2]).toEqual({ id: expect.any(String), text: '部屋の掃除', done: false })
  })
  test('元の配列は書き換えない', () => {
  const result = addTodo(sample, '部屋の掃除')
  expect(result).not.toBe(sample)
  expect(sample).toHaveLength(2)
})

})

describe('toggleTodo', () => {
  test('指定した id の done だけが反転する', () => {
    const result = toggleTodo(sample, 'a')
    expect(result[0].done).toBe(true)
    expect(result[1].done).toBe(true)
})
})

describe('deleteTodo', () => {
  test('指定した id の TODO だけが消える', () => {
    const result = deleteTodo(sample, 'a')
    expect(result).toEqual([{ id: 'b', text: 'レポート提出', done: true }])
  })

  test('存在しない id なら何も消えない', () => {
    const result = deleteTodo(sample, 'zzz')
    expect(result).toEqual(sample)
  })
})

describe('countRemaining', () => {
  test('未完了の数を返す', () => {
    expect(countRemaining(sample)).toBe(1)
  })

  test('0件なら 0', () => {
    expect(countRemaining([])).toBe(0)
  })

  test('すべて完了なら 0', () => {
    const allDone = [
      { id: 'x', text: 'A', done: true },
      { id: 'y', text: 'B', done: true },
    ]
    expect(countRemaining(allDone)).toBe(0)
  })
})
describe('filterTodos', () => {
  test.each([
    ['all', ['a', 'b']],
    ['active', ['a']],
    ['done', ['b']],
  ])('%s のとき id が %j の TODO が残る', (filter, expectedIds) => {
    const result = filterTodos(sample, filter)
    expect(result.map((todo) => todo.id)).toEqual(expectedIds)
  })
})


