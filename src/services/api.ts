import React, { useEffect, useRef, useState } from 'react'

interface UseFetch {
  countries: RootObject[] | never[]
  setCountries: React.Dispatch<React.SetStateAction<RootObject[] | never[]>>
  filter: Filter
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
}

export const useFetch = (): UseFetch => {
  const APICountries = useRef<RootObject[] | null>(null)
  const [countries, setCountries] = useState<RootObject[] | never[]>([])
  const [filter, setFilter] = useState<Filter>({
    sortBy: null,
    region: [],
    keys: '',
    UNMember: false,
    independent: false
  })

  // first API consult
  useEffect(() => {
    const url = 'https://restcountries.com/v3.1/all'
    fetch(url)
      .then(async res => await res.json())
      .then(data => {
        setCountries(data)
        APICountries.current = data
      })
      .catch(err => console.error('Error in fetch', err))
  }, [])

  // listen change on filters and filter
  useEffect(() => {
    if (APICountries.current === null) return
    const newCountries = APICountries.current.filter((country): boolean => {
      // region buttons
      if (filter.region.length > 0 && filter.region.every(reg => {
        return reg !== country.region
      })) return false

      // input filter
      if (filter.keys !== '' && !(
        country.region.includes(filter.keys) ||
        (country.subregion?.includes(filter.keys) ?? false) ||
        country.name.common.includes(filter.keys)
      )) return false

      // checkboxes
      if (filter.UNMember && !country.unMember) return false
      if (filter.independent && !(country.independent ?? false)) return false
      return true
    })

    if (filter.sortBy !== null) {
      const newCountriesSorted = newCountries.sort((a, b) => {
        if (filter.sortBy === null) return 0
        let aValue = a[filter.sortBy]
        let bValue = b[filter.sortBy]

        if (filter.sortBy === 'name') {
          aValue = a.name.common
          bValue = b.name.common
        }

        if (aValue === undefined || bValue === undefined) return 0

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue)
        } else {
          return (aValue as number) - (bValue as number)
        }
      })
      setCountries(newCountriesSorted)
    } else {
      setCountries(newCountries)
    }
  }, [filter])

  return {
    countries,
    filter,
    setCountries,
    setFilter
  }
}
