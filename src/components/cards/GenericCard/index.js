import { Divider } from "../../Divider";
import { Container, Subtitle, Title, TitleContainer } from "./styles";

/**
 *      
 * @param {{
 *   title: string
 *   subtitle?: string
 *   withFeedBack:? boolean
 *   children: import("react").ReactElement 
 * } & import("react-native").PressableProps} props
 * @returns 
 */
export function GenericCard({ title, subtitle, withFeedBack = false, children, ...props }) {
  return (
    <Container
      style={({ pressed }) => [
        { opacity: pressed ? (withFeedBack ? 0.2 : 1) : 1 } 
      ]}
      {...props}
    >
      <TitleContainer>
        <Title numberOfLines={2} ellipsizeMode="tail" >{title}</Title>
        {subtitle && <Divider vertical />}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </TitleContainer>

      <Divider />

      {children}

    </Container>
  )
}
