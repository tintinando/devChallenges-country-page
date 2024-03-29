import React, { FC } from 'react'
import { CountryHeader } from './CountryHeader'
import { CountryFilter } from './CountryFilter'
import { CountryTable } from './CountryTable'

interface Props {
  countries: RootObject[]
  filter: Filter
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
}

export const CountriesPage: FC<Props> = ({ countries, filter, setFilter }) => {
  const qtyCountries = countries.length

  return (
    <div className='relative -top-12 w-[94%]'>
      <div className='bg-usr-black p-8 flex flex-col items-center rounded-xl border-[1px] border-usr-gray text-usr-lightgray'>
        <CountryHeader qty={qtyCountries} setFilter={setFilter} />
        <div className='flex flex-col w-full items-center md:items-start md:flex-row md:justify-evenly gap-10'>
          <CountryFilter
            setFilter={setFilter}
            filter={filter}
          />
          <CountryTable
            countries={countries}
          />
        </div>
      </div>
    </div>
  )
}
