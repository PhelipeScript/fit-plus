import { Container } from "./styles";
import { GenericCard } from "../../components/cards/GenericCard";
import { InfoCard } from "../../components/cards/InfoCard";
import { User } from "phosphor-react-native";

export function Profile() {
  return (
    <Container>
      <GenericCard 
        title="Informações Pessoais" 
        subtitle="Exercicio" 
        children={<InfoCard icon={<User size={24} />} title="Nome" value="Não informado." />}
      />
    </Container>
  )
}
