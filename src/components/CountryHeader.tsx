import React, { FC, useEffect, useState } from 'react'
import { SearchIcon } from '../assets/SearchIcon'

interface Props {
  qty: number
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
}

export const CountryHeader: FC<Props> = ({ qty, setFilter }) => {
  const [inputValue, setInputValue] = useState('')

  // 300 ms delay set filter
  useEffect(() => {
    const delay = inputValue === '' ? 10 : 300
    const timer = setTimeout(() => {
      setFilter(prev => {
        return {
          ...prev,
          keys: inputValue
        }
      })
    }, delay)

    return () => clearTimeout(timer)
  }, [inputValue])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
  }

  const handleEmptyInput = (): void => {
    setInputValue('')
  }

  return (
    <div className='mb-4 w-full flex flex-row items-center justify-between'>
      <h4>{`Found ${qty} countries`}</h4>
      <form className='relative'>
        <div className='h-full absolute top-2.5 left-2'>
          <SearchIcon />
        </div>
        {inputValue.length > 0 &&
          <div
            className='absolute top-2.5 right-2 cursor-pointer'
            onClick={handleEmptyInput}
          >❌
          </div>}
        <input
          className='ps-10 w-[340px] h-11 rounded-xl bg-usr-gray '
          type='text'
          placeholder='Search by Name, Region, Subregion'
          value={inputValue}
          onChange={handleChange}
        />
      </form>
    </div>
  )
}
