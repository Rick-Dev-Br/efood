import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import type { CardapioItem, Restaurants } from '../../../pages/Home'
import Food from '../Food'
import { List } from './styles'
import { Container } from '../../styles'

export default function FoodList() {
  const { id } = useParams<{ id: string }>()
  const [restaurante, setRestaurante] = useState<Restaurants | null>(null)

  useEffect(() => {
    if (id) {
      fetch(`https://api-ebac.vercel.app/api/efood/restaurantes/${id}`)
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
    }
  }, [id])

  if (!restaurante?.cardapio) return null

  return (
    <Container>
      <List>
        {restaurante.cardapio.map((item) => (
          <Food
            key={item.id}
            foto={item.foto}
            nome={item.nome}
            descricao={item.descricao}
            preco={item.preco}
            porcao={item.porcao}
            id={item.id}
          />
        ))}
      </List>
    </Container>
  )
}
