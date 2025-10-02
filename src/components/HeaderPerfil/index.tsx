import { useDispatch, useSelector } from 'react-redux'
import fundoImg from '../../assets/images/fundo.png'
import logo from '../../assets/images/logo.svg'

import {
  Imagem,
  Text,
  Banner,
  TextBanner,
  RestaurantName,
  Cart,
} from './styles'
import { Container } from '../../styles'
import { Link, useParams } from 'react-router-dom'
import { open } from '../../../store/reducers/Cart'
import { useGetRestauranteQuery } from '../../../services/api'
import type { RootReducer } from '../../../store/index'

type Props = {
  tipo: string
  titulo: string
  capa: string
}

// eslint-disable-next-line no-empty-pattern
export default function HeaderPerfil({}: Props) {
  const { id } = useParams()
  const dispatch = useDispatch()
  const abreCart = () => dispatch(open())
  const { items } = useSelector((state: RootReducer) => state.cart)

  const { data: restaurante } = useGetRestauranteQuery(id!)
  return (
    <>
      <Imagem style={{ backgroundImage: `url(${fundoImg})` }}>
        <Text>Restaurantes</Text>
        <Link to="/">
          <img src={logo} alt="Efood" />
        </Link>
        <Cart onClick={abreCart}>{items.length} produto(s) no carrinho</Cart>
      </Imagem>
      <Banner
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${restaurante?.capa})`,
        }}
      >
        <Container>
          <TextBanner>{restaurante?.tipo}</TextBanner>
          <RestaurantName>{restaurante?.titulo}</RestaurantName>
        </Container>
      </Banner>
    </>
  )
}
