import { FC } from 'react'
import './App.css'
import '@fontsource/be-vietnam-pro'
import ImgLogo from './assets/Logo.svg'
import { CountriesPage } from './components/CountriesPage'
import { Routes, Route, Link } from 'react-router-dom'
import { CountryPage } from './components/CountryPage'
import { useFetch } from './services/api'

export const App: FC = () => {
  const { countries, setFilter, filter } = useFetch()

  return (
    <>
      <div className='flex flex-col items-center bg-usr-gray text-usr-white'>
        <div className='flex justify-center items-center w-full h-56 usr-main'>
          <Link to='/'><img className='h-6' src={ImgLogo} alt='World ranks logo' /></Link>
        </div>
        <Routes>
          <Route
            path='/' element={
              <CountriesPage
                countries={countries}
                setFilter={setFilter}
                filter={filter}
              />
            }
          />
          <Route
            path='countries/:country'
            element={<CountryPage countries={countries} />}
          />
        </Routes>
      </div>
    </>
  )
}

export default App
