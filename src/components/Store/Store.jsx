import { Row, Col, Typography, Card, Empty, message } from 'antd'
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  doc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useEffect, useState, useContext, useMemo } from 'react'
import { UserContext } from '../../context/UserContext'
import StoreHeader from './StoreHeader'
import StoreItem from './StoreItem'
import StoreStats from './StoreStats'
import Loader from '../Loader/Loader'

const { Title } = Typography

const Store = () => {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useContext(UserContext)

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true)
      const q = query(
        collection(db, 'cards'),
        where('seller.uid', '==', user.uid)
      )
      const querySnapshot = await getDocs(q)

      const cardsData = []
      querySnapshot.forEach((doc) => {
        cardsData.push({ id: doc.id, ...doc.data() })
      })

      setCards(cardsData)
      console.log(cardsData)
      setLoading(false)
    }

      fetchCards()
  }, [user.uid])

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'cards', id))
      setCards(cards.filter((card) => card.id !== id))
      message.success('Carta eliminada con éxito')
    } catch (error) {
      console.error('Error al eliminar la carta:', error)
      message.error('Error al eliminar la carta')
    }
  }

  const handleSold = async (id) => {
    try {

      const docRef = doc(db, 'cards', id) 
      await updateDoc(docRef, {
        'sold' : true
      }, { merge: true })
      // setCards(cards.filter((card) => card.stock !== 0))
      message.success('Carta eliminada con éxito')
    } catch (error) {
      console.error('Error al marcar la carta como vendida:', error)
      message.error('Error al marcar la carta como vendida')
    }
  }

  const totalStock = useMemo(() => {
    return cards.reduce(
      (accumulator, currentCard) => accumulator + currentCard.stock,
      0
    )
  }, [cards])

  const totalForSell = useMemo(() => {
    return cards.reduce((total, item) => total + Number(item.total), 0)
  }, [cards])

  return (
    <main className='main'>
      <Row gutter={[16, 24]}>
        <StoreHeader></StoreHeader>
        <Col xs={24}>
          {loading ? (
            <Loader></Loader>
          ) : (
            <Row gutter={[16, 16]}>
              <StoreStats
                totalStock={totalStock}
                totalForSell={totalForSell}
              ></StoreStats>
              {cards.length > 0 ? (
                <Col xs={24}>
                  <Row>
                    <Col xs={24}>
                      <Title level={3}>Mis cartas</Title>
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]}>
                    {cards.map((item) => (
                      <StoreItem
                        key={item.id}
                        item={item}
                        onDelete={handleDelete}
                        onSold={handleSold}
                      />
                    ))}
                  </Row>
                </Col>
              ) : (
                <Col xs={24}>
                  <Card>
                    <Empty description="No hay cartas para mostrar"></Empty>
                  </Card>
                </Col>
              )}
            </Row>
          )}
        </Col>
      </Row>
    </main>
  )
}

export default Store
