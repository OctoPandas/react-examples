import React, { useState } from 'react'
import classnames from 'classnames'

import iconLeft from 'bootstrap-icons/icons/caret-left-square-fill.svg'
import iconRight from 'bootstrap-icons/icons/caret-right-square-fill.svg'

const Calendar = () => {
  const [date, setDate] = useState(new Date())

  const start = new Date(date)
  start.setDate(1)
  start.setDate(-start.getDay())

  function* getDate() {
    const currentMonth = new Date(date)
    currentMonth.setMonth(currentMonth.getMonth() + 1)
    currentMonth.setDate(0)
    do {
      start.setDate(start.getDate() + 1)
      yield new Date(start)
    } while (start <= currentMonth || start.getDay() !== 6)
  }

  return (
    <div className="max-w-xs m-auto">
      <div className="text-4xl">
        <button onClick={
          () => {
            const t = new Date(date)
            t.setMonth(t.getMonth() - 1)
            setDate(t)
          }
        }>
          <img src={iconLeft} alt="" />
        </button>
        <button>
          <img src={iconLeft} alt="" />
        </button>
        <button>
          <img src={iconRight} alt="" />
        </button>
        <button onClick={
          () => {
            const t = new Date(date)
            t.setMonth(t.getMonth() + 1)
            setDate(t)
          }
        }>
          <img src={iconRight} alt="" />
        </button>
        {
          date.toLocaleDateString()
        }
      </div>
      <div className="grid grid-cols-7 gap-4 text-center">
        {
          ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(w => <div key={w}>{w}</div>)
        }
        {
          [...getDate()].map(i => (
            <a href="#" className={
              classnames(i.getMonth() !== date.getMonth() ? 'text-gray-400' : 'text-gray-800', 'bg-green-200 rounded')
            } key={i} onClick={() => console.log(i)}>
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
