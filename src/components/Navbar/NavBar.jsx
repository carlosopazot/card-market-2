import { Layout, Flex, Button, Typography, Divider } from 'antd'
import UserMenu from '../UserMenu/UserMenu'
import Searchbar from '../Searchbar/Searchbar'
import Logo from '../../assets/images/card-games.png'
import DarkMode from '../DarkMode/DarkMode'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { ThemeContext } from '../../context/ThemeContext'
import { Link, useNavigate } from 'react-router-dom'
import './styles.css'

const { Header } = Layout

const Navbar = () => {
  const { user } = useContext(UserContext)
  const { isDarkMode } = useContext(ThemeContext)
  const navigate = useNavigate()

  return (
    <Header className={`navbar ${isDarkMode ? 'navbar-dark' : ''} `}>
      <div className="main">
        <Flex justify='space-between' align='center'>
          <Link to="/" className="brand">
            <img src={Logo} className="logo" alt="Logo" />
            <h2 className={`logo-title ${isDarkMode ? 'logo-title-dark' : ''} `}>
              Card Market
            </h2>
          </Link>
          {/* <Searchbar></Searchbar> */}
          <Flex gap={24} align="center">
            <DarkMode></DarkMode>
            <Divider type='vertical' />
            <Flex gap={10} align="center">
              {!user.logged ? (
                
                <Button onClick={()=> {navigate('/login')}} size="large" type="primary">
                  Ingresar
                </Button>
              ) : (
                <UserMenu name={user.name} />
              )}
            </Flex>
          </Flex>
        </Flex>
      </div>
    </Header>
  )
}

export default Navbar
