import { Switch } from 'antd'
import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

const DarkMode = () => {
  const { toggleDarkMode } = useContext(ThemeContext)
  return (
    <Switch
      onChange={toggleDarkMode}
      checkedChildren={<FontAwesomeIcon icon={faMoon} />}
      unCheckedChildren={<FontAwesomeIcon icon={faSun} />}
    />
  )
}

export default DarkMode
