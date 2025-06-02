import { Container, StatCardHeader, StatCardTitle, StatCardUnit, StatCardValue } from "./styles";

/**
 *  
 * @param {{
 *  title: string,
 *  value: string
 *  unit?: string
 *  icon: React.ElementType<import("phosphor-react-native").IconProps>,
 *  color: 'red' | 'green' | 'blue' | 'purple' | 'orange'
 * }} param0 
 * @returns 
 */
export function StatCard({ title, value, unit, icon: Icon, color = 'blue' }) {
  return (
    <Container style={{ borderColor: color }}>
      <StatCardHeader>
        {Icon && <Icon size={24} color={color} />}
        <StatCardTitle variant="titleSmall">{title}</StatCardTitle>
      </StatCardHeader>
      <StatCardValue>
        {value}
        {unit && <StatCardUnit>{unit}</StatCardUnit>}
      </StatCardValue>
    </Container>
  )
}
