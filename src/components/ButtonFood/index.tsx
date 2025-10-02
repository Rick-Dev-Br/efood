import { Botao } from './styles'

type ButtonProps = {
  // eslint-disable-next-line no-undef
  children: React.ReactNode
}

const Button = ({ children }: ButtonProps) => <Botao>{children}</Botao>

export default Button
