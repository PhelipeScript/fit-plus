import { useTheme } from "styled-components/native";
import { Container, EditIcon, IconContainer, InfoContainer, Title, ValueText } from "./styles";

/**
 * 
 * @param {{
 *  icon: React.ElementType<import("phosphor-react-native").IconProps>
 *  title: string
 *  value: string
 *  editable?: boolean
 * } & import("react-native").TouchableOpacityProps} props
 */
export function InfoCard({ icon: Icon, title, value, editable = false, ...props }) {
  const theme = useTheme()

  return (
    <Container {...props}>
      <IconContainer>
        <Icon 
          size={24}
          color={theme.colors.primary}
        />
      </IconContainer>
      <InfoContainer>
        <Title>{title}</Title>
        <ValueText>{value}</ValueText>
      </InfoContainer>

      {editable && <EditIcon />}
    </Container>
  )
}
