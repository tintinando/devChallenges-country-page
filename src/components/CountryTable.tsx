import { FC } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  countries: RootObject[]
}

export const CountryTable: FC<Props> = ({ countries }) => {
  return (
    <>
      <table className='table-auto border-collapse flex-grow-[3]'>
        <thead className='text-[12px] text-left'>
          <tr className='h-14 border-b-2 border-usr-gray'>
            <th>Flag</th>
            <th>Name</th>
            <th>Population</th>
            <th>Area (km²)</th>
            <th>Region</th>
          </tr>
        </thead>
        <tbody className='text-usr-white text-[14px]'>
          {
            countries.map(country => {
              return (
                <tr className='h-16' key={country.cca2}>
                  <td><img className='w-[50px] h-[40px] me-6 rounded-md' src={country.flags.svg} alt={`Flag of ${country.name.common}`} /></td>
                  <td>
                    <Link to={`countries/${country.name.common}`}>{country.name.common}</Link>
                  </td>
                  <td>{country.population.toLocaleString('en-US')}</td>
                  <td>{country.area.toLocaleString('en-US')}</td>
                  <td>{country.region}</td>
                </tr>
              )
            })

          }
        </tbody>
      </table>
    </>
  )
}
