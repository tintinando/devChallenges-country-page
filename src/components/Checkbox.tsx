import { FC, useState } from 'react'
import { DoneRound } from '../assets/DoneRound'

interface Props {
  handleClick?: (arg0: boolean) => void
}

export const Checkbox: FC<Props> = ({ handleClick }) => {
  const [clicked, setClicked] = useState(false)

  const toggleClicked = (): void => {
    const newClicked = !clicked
    setClicked(newClicked)
    if (handleClick != null) handleClick(newClicked)
  }

  const classUsr = clicked ? 'bg-usr-blue' : 'bg-white'

  return (
    <div onClick={toggleClicked} className={`relative w-[24px] h-[24px] rounded-md ${classUsr}`}>
      {clicked && <div className='absolute w-full h-full top-0 left-0'><DoneRound /></div>}
    </div>
  )
}
