import { FC } from 'react'
import { useParams } from 'react-router-dom'

interface Props {
  countries: RootObject[]
}

interface BadgeProps {
  title?: string
  content?: string
}

const Badge: FC<BadgeProps> = ({ title, content }) => {
  return (
    <div className='flex flex-row items-center gap-2 bg-usr-gray h-14 py-2 px-4 rounded-xl'>
      <h6 className='flex items-center h-full border-r-2 border-usr-black pr-5'>{title}</h6>
      <span className='ps-3'>{content}</span>
    </div>
  )
}

const Row: FC<BadgeProps> = ({ title, content }) => {
  return (
    <div className='flex flex-row w-full justify-between border-y-[1px] border-usr-gray py-6 px-4'>
      <span>{title}</span>
      <span className='text-usr-white'>{content}</span>
    </div>
  )
}

// This component shows detail page for each country
export const CountryPage: FC<Props> = ({ countries }) => {
  const { country } = useParams()
  const currentCountry = countries.find(c => c.name.common === country)

  // select countries in the same subregion
  const neighbouring = countries.filter(c => {
    return c.subregion === currentCountry?.subregion &&
      c.name.common !== currentCountry?.name.common
  }).map(m => {
    return {
      name: m.name.common,
      flag: m.flags.svg
    }
  })

  const currentLanguages = currentCountry?.languages != null
    ? Object.values(currentCountry.languages).join(',')
    : ''

  const currentCurrencies = currentCountry?.currencies != null
    ? Object.values(currentCountry.currencies).map(v => v.name).join(',')
    : ''

  return (
    <div className='relative -top-10 flex flex-col items-center bg-usr-black border-[1px] border-usr-gray rounded-2xl mx-auto max-w-[640px]'>
      <img
        className='relative -top-10 w-64 rounded-2xl'
        src={currentCountry?.flags.svg}
      />
      <h2 className='text-4xl font-semibold'>{currentCountry?.name.common}</h2>
      <h4>{currentCountry?.name.official}</h4>
      <div className='m-8 w-full flex flex-row justify-center gap-10'>
        <Badge title='Population' content={currentCountry?.population.toLocaleString('en-US')} />
        <Badge title='Area(km²)' content={currentCountry?.area.toLocaleString('en-US')} />
      </div>
      <div className='w-full text-usr-lightgray text-[14px]'>
        <Row title='Capital' content={currentCountry?.capital?.join(',')} />
        <Row title='Subregion' content={currentCountry?.subregion} />
        <Row title='Language' content={currentLanguages} />
        <Row title='Currencies' content={currentCurrencies} />
        <Row title='Continents' content={currentCountry?.continents.join(',')} />
        <h6 className='p-4'>Neighbouring countries</h6>
        <div className='flex flex-row gap-8 p-4 flex-wrap'>
          {
            neighbouring.map(c => {
              return (
                <div key={c.name} className='flex flex-col w-20 justify-end'>
                  <img className='h-16 object-cover rounded-md mb-2' src={c.flag} alt={`flag of ${c.name}`} />
                  <h6 className='text-[12px] text-usr-white'>{c.name}</h6>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
