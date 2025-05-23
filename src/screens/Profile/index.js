import { Container, ContentContainer, InfoContainer } from "./styles";
import { GenericCard } from "../../components/cards/GenericCard";
import { InfoCard } from "../../components/cards/InfoCard";
import { CalendarDots, EnvelopeSimple, PersonArmsSpread, Phone, Scales, SignOut, User } from "phosphor-react-native";
import { CustomButton } from './../../components/CustomButton/index';
import { useState } from "react";
import { signOut } from '../../services/authService'
import { useNavigation } from "@react-navigation/native";

export function Profile() {
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)

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
        <GenericCard 
          title="Informações Pessoais" 
          children={(
            <InfoContainer>
              <InfoCard icon={User} title="Nome" value="Não informado." editable />
              <InfoCard icon={CalendarDots} title="Idade" value="Não informado." editable />
              <InfoCard icon={PersonArmsSpread} title="Altura (cm)" value="Não informado." editable />
              <InfoCard icon={Scales} title="Peso (kg)" value="Não informado." editable />
            </InfoContainer>
          )}
        />

        <GenericCard 
          title="Informações de Contato" 
          children={(
            <InfoContainer>
              <InfoCard icon={EnvelopeSimple} title="Email" value="Não informado." editable />
              <InfoCard icon={Phone} title="Telefone" value="Não informado." editable />
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
