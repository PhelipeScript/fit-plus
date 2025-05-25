import { Container, ContentContainer, InfoContainer } from "./styles";
import { GenericCard } from "../../components/cards/GenericCard";
import { InfoCard } from "../../components/cards/InfoCard";
import { CalendarDots, EnvelopeSimple, PersonArmsSpread, Phone, Scales, SignOut, User } from "phosphor-react-native";
import { CustomButton } from './../../components/CustomButton/index';
import { useState } from "react";
import { signOut } from '../../services/authService'
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "../../components/Avatar";
import { useUser } from '../../hooks/useUser';

export function Profile() {
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser()

  async function handleSignOut() {
    setIsLoading(true)
    try {
      await signOut()
      navigation.replace('SplashScreen')
    } catch (error) {
      console.error(error)
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <ContentContainer>
        <Avatar sourcePath={user.avatarUri} />

        <GenericCard 
          title="Informações Pessoais" 
          children={(
            <InfoContainer>
              <InfoCard icon={User} title="Nome" value={user.name} editable />
              <InfoCard icon={CalendarDots} title="Idade" value={user.age || "Não informado."} editable />
              <InfoCard icon={PersonArmsSpread} title="Altura (cm)" value={user.height || "Não informado."} editable />
              <InfoCard icon={Scales} title="Peso (kg)" value={user.weight || "Não informado."} editable />
            </InfoContainer>
          )}
        />

        <GenericCard 
          title="Informações de Contato" 
          children={(
            <InfoContainer>
              <InfoCard icon={EnvelopeSimple} title="Email" value={user.email} editable />
              <InfoCard icon={Phone} title="Telefone" value={user.phone || "Não informado."} editable />
            </InfoContainer>
          )}
        />

        <CustomButton 
          title="Sair da conta"
          type="DANGER"
          icon={SignOut}
          isLoading={isLoading}
          onPress={handleSignOut}
          style={{ marginTop: 16 }}
        />
      </ContentContainer>
    </Container>
  )
}
