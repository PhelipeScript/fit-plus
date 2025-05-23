import { Container, EditIcon, IconContainer, InfoContainer, Title, ValueText } from "./styles";

export function InfoCard({ icon, title, value, editable = false }) {
  return (
    <Container>
      <IconContainer>
        {icon}
      </IconContainer>
      <InfoContainer>
        <Title>{title}</Title>
        <ValueText>{value}</ValueText>
      </InfoContainer>

      {editable && <EditIcon />}
    </Container>
  )
}
