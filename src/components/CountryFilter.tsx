import React, { FC } from 'react'
import { REGIONS } from '../constants'
import { Checkbox } from './Checkbox'

interface Props {
  filter: Filter
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
}

export const CountryFilter: FC<Props> = ({ setFilter, filter }) => {
  const sortByArr: Array<keyof RootObject> = ['name', 'population', 'area', 'region']

  const handleUNCkeck = (checked: boolean): void => {
    setFilter(prev => {
      return {
        ...prev,
        UNMember: checked
      }
    })
  }

  const handleIndependentCheck = (checked: boolean): void => {
    setFilter(prev => {
      return {
        ...prev,
        independent: checked
      }
    })
  }

  const handleSortby = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const index = e.target.options.selectedIndex
    const value = index === 0 ? null : sortByArr[index - 1]

    setFilter(prev => {
      return {
        ...prev,
        sortBy: value
      }
    })
  }

  const handleRegionFilter = (e: string): void => {
    setFilter(prev => {
      const index = prev.region.indexOf(e)
      if (index === -1) {
        return {
          ...prev,
          region: [...prev.region, e]
        }
      } else {
        return {
          ...prev,
          region: prev.region.filter(item => item !== e)
        }
      }
    })
  }

  return (
    <div className='flex flex-col md:max-w-[280px] flex-grow-[1]'>
      <form className='py-4 flex gap-2 flex-col w-full'>
        <label className='text-[12px]'>Sort by</label>
        <select
          className='text-usr-white w-full ps-2 bg-transparent border-2 border-usr-gray h-11 rounded-xl'
          onChange={handleSortby}
        >
          <option className='bg-usr-lightgray disabled'>Select</option>
          {
            sortByArr.map((v, i) => (
              <option key={i} className='bg-usr-lightgray'>{v[0].toUpperCase() + v.substring(1)}</option>
            ))
          }
        </select>
      </form>

      <div className='my-4'>
        <h2 className='text-[12px]'>Region</h2>
        {
          REGIONS.map(e => {
            const regionClass = `font-semibold text-[12px] p-2 m-2 rounded-xl 
              ${filter.region.some(s => s === e) ? 'bg-usr-gray text-usr-white' : ''}`
            return (
              <button
                className={regionClass}
                key={e}
                onClick={() => handleRegionFilter(e)}
              >{e}
              </button>
            )
          })
        }
      </div>

      <div>
        <h2 className='text-[12px] mb-2'>Status</h2>
        <form className='flex flex-col'>
          <div className='flex flex-row gap-2 mb-2'>
            <Checkbox handleClick={handleUNCkeck} />
            <label className='flex items-center gap-2'>
              Member of the United Nations
            </label>
          </div>
          <div className='flex flex-row gap-2'>
            <Checkbox handleClick={handleIndependentCheck} />
            <label className='flex items-center gap-2'>
              Independent
            </label>
          </div>
        </form>
      </div>
    </div>
  )
}
