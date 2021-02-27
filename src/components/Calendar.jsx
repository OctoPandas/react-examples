import React, { useState } from 'react'
import { Icon } from '@mdi/react'
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js'
import classnames from 'classnames'

const styleButton = 'shadow-md h-8 w-8 text-center rounded-lg border border-gray-200 flex items-center justify-center focus:outline-none focus:ring transition'

const Calendar = () => {
  const [date, setDate] = useState(new Date())

  const start = new Date(date)
  start.setDate(1)
  start.setDate(-start.getDay())

  function* getDate() {
    const currentMonth = new Date(date)
    currentMonth.setMonth(currentMonth.getMonth() + 1)
    currentMonth.setDate(0)
    while (start < currentMonth || start.getDay() !== 6) {
      start.setDate(start.getDate() + 1)
      yield new Date(start)
    }
  }

  return (
    <div className="max-w-xs m-auto bg-white rounded-xl p-8 shadow-lg">
      <div className="flex">
        <button onClick={
          () => {
            const t = new Date(date)
            t.setMonth(t.getMonth() - 1)
            setDate(t)
          }
        } className={styleButton}>
          <Icon path={mdiArrowLeft} size={1} className="text-gray-400 hover:text-blue-400 transition" />
        </button>
        <span className="m-auto text-xl font-bold text-gray-800">{(() => {
          const [_, m, __, y] = date.toDateString().split(' ')
          return `${m}. ${y}`
        })()}</span>
        <button onClick={
          () => {
            const t = new Date(date)
            t.setMonth(t.getMonth() + 1)
            setDate(t)
          }
        } className={styleButton}>
          <Icon path={mdiArrowRight} size={1} className="text-gray-400 hover:text-blue-400 transition" />
        </button>

      </div>
      <div className="grid grid-cols-7 text-center mt-4 gap-0 justify-center">
        {
          'Su/Mo/Tu/We/Th/Fr/Sa'.split('/').map(w => <span key={w} className="text-gray-400 font-medium pb-4">{w}</span>)
        }
        {
          [...getDate()].map(i => (
            <a href="#" className={
              classnames(
                'rounded-lg w-7 h-7 border-2 border-transparent box-content text-sm font-bold flex justify-center items-center m-auto',
                i.getMonth() !== date.getMonth() ? 'text-gray-400' : 'text-gray-800', 'rounded',
                i.getDate() === date.getDate() ? 'text-blue-500 border-blue-500 border-opacity-30' : '',
              )
            } key={i} onClick={() => setDate(i)}>
              {i.getDate()}
            </a>
          )
          )
        }
      </div>
    </div>
  )
}

export default Calendar
