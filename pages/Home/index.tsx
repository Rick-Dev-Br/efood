import { useEffect, useState } from 'react'
import Footer from '../../src/components/Footer'
import Header from '../../src/components/Header'
import RestaurantList from '../../src/components/List'
import React from 'react'
export type CardapioItem = {
  id: number
  nome: string
  descricao: string
  preco: number
  porcao: string
  foto: string
  quantidade: number
}
export type Restaurants = {
  foto: string
  infos: string[]
  id: number
  titulo: string
  destacado: boolean
  tipo: string
  avaliacao: string
  descricao: string
  capa: string
  cardapio: CardapioItem[]
}

const Home = () => {
  const [restaurants, setRestaurants] = useState<Restaurants[]>([])

  useEffect(() => {
    fetch('https://ebac-fake-api.vercel.app/api/efood/restaurantes')
      .then((resposta) => resposta.json())
      .then((resposta) => setRestaurants(resposta))
  }, [])

  return (
    <React.Fragment>
      <Header />
      <RestaurantList restaurants={restaurants} />
      <Footer />
    </React.Fragment>
  )
}
export default Home
