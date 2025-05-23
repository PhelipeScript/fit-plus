import { Divider } from "../../Divider";
import { Container, Subtitle, Title, TitleContainer } from "./styles";

/**
 *      
 * @param {{
 *   title: string
 *   subtitle?: string
 *   children: import("react").ReactElement 
 * }} props
 * @returns 
 */
export function GenericCard({ title, subtitle, children }) {
  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
        {subtitle && <Divider vertical />}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </TitleContainer>

      <Divider />

      {children}

    </Container>
  )
}
