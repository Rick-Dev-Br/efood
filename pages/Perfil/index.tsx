import { useEffect, useState } from 'react'
import FoodList from '../../src/components/FoodList'
import Footer from '../../src/components/Footer'
import HeaderPerfil from '../../src/components/HeaderPerfil'
import { useParams } from 'react-router-dom'
import Cart from '../../src/components/Cart'
import type { CardapioItem, Restaurants } from '../Home'

const Perfil = () => {
  const [restaurante, setRestaurante] = useState<Restaurants | null>(null)
  const { id } = useParams()

  useEffect(() => {
    fetch(`https://ebac-fake-api.vercel.app/api/efood/restaurantes/${id}`)
      .then((resposta) => resposta.json())
      .then((resposta) => {
        const cardapioCorrigido: CardapioItem[] = resposta.cardapio.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any) => ({
            ...item,
            preco: Number(item.preco),
          })
        )
        setRestaurante({
          ...resposta,
          cardapio: cardapioCorrigido,
        } as Restaurants)
      })
  }, [id])

  return (
    <>
      {restaurante && (
        <HeaderPerfil
          tipo={restaurante.tipo!}
          titulo={restaurante.titulo!}
          capa={restaurante.capa!}
        />
      )}
      <FoodList />
      <Cart />
      <Footer />
    </>
  )
}

export default Perfil
