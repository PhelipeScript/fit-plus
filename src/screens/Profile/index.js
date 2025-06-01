import { Container, ContentContainer, InfoContainer } from "./styles";
import { GenericCard } from "../../components/cards/GenericCard";
import { InfoCard } from "../../components/cards/InfoCard";
import { CalendarDots, EnvelopeSimple, PersonArmsSpread, Phone, Scales, SignOut, User } from "phosphor-react-native";
import { CustomButton } from './../../components/CustomButton/index';
import { useRef, useState } from "react";
import { signOut } from '../../services/authService'
import { Avatar } from "../../components/Avatar";
import { useUser } from '../../hooks/useUser';
import { UpdateFieldModal } from "../../components/modals/UpdateFieldModal";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import { updateUser } from "../../services/firestoreService";

/** @typedef {'name'| 'age' | 'height' | 'weight' | 'phone' | null} FieldName */

export function Profile() {
  const bottomSheetRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [editingField, setEditingField] = useState(/** @type {FieldName} */(null))
  const { user, setUser } = useUser()

  /**
   * 
   * @param {FieldName} fieldName 
   */
  const openModal = (fieldName) => {
    setEditingField(fieldName)
    bottomSheetRef.current?.present()
  }

  async function handleSignOut() {
    setIsLoading(true)
    try {
      await signOut()
    } catch (error) {
      console.error(error)
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleAvatarChange() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images', 
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      /** @type {UserProps} */
      const userUpdated = {
        ...user,
        avatarUri: uri,
      }
      setUser(userUpdated)
      try {
        await updateUser(userUpdated);
      } catch (error) {
        console.error(error);
        alert('Erro ao salvar avatar');
      }
    }
  }

  return (
    <Container>
      <ContentContainer>
        <TouchableOpacity onPress={handleAvatarChange}>
          <Avatar sourcePath={user?.avatarUri} />
        </TouchableOpacity>

        <GenericCard 
          title="Informações Pessoais" 
          children={(
            <InfoContainer>
              <InfoCard 
                onPress={() => openModal('name')} 
                icon={User} 
                title="Nome" 
                value={user.name} 
                editable 
              />
              <InfoCard 
                onPress={() => openModal('age')} 
                icon={CalendarDots} 
                title="Idade" 
                value={user.age ? `${user.age} anos` : "Não informado."} 
                editable 
              />
              <InfoCard 
                onPress={() => openModal('height')}
                icon={PersonArmsSpread} 
                title="Altura (cm)" 
                value={user.height ? `${user.height} cm` : "Não informado."} 
                editable 
              />
              <InfoCard 
                onPress={() => openModal('weight')}
                icon={Scales} 
                title="Peso (kg)" 
                value={user.weight ? `${user.weight} kg` : "Não informado."} 
                editable 
              />
            </InfoContainer>
          )}
        />

        <GenericCard 
          title="Informações de Contato" 
          children={(
            <InfoContainer>
              <InfoCard icon={EnvelopeSimple} title="Email" value={user.email} />
              <InfoCard 
                onPress={() => openModal('phone')}
                icon={Phone} 
                title="Telefone" 
                value={user.phone || "Não informado."} 
                editable 
              />
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

        <UpdateFieldModal bottomSheetRef={bottomSheetRef} fieldName={editingField} />
      </ContentContainer>
    </Container>
  )
}
