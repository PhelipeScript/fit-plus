import { Portal } from "react-native-paper";
import { ContentContainer, InfoWrapper, Label, ModalContainer, NotesText, NotesWrapper, Title } from "./styles";
import { Barbell, Calendar, ListNumbers, Pencil, Person, Repeat, Trash } from "phosphor-react-native";
import { InfoCard } from "../../cards/InfoCard";
import { CustomButton } from "../../CustomButton";
import { useWorkouts } from "../../../hooks/useWorkouts";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { deleteExercise } from "../../../services/firestoreService";
import { DeleteConfirmationModal } from "../DeleteConfirmationModal";

/**
 * @param {{
 *   visible: boolean,
 *   onDismiss: (action: 'edit' | 'deleted' | null) => void,
 * }} props
 */
export function ExerciseDetailsModal({ visible, onDismiss }) {
  const navigation = useNavigation()
  const { currentExercise: exercise, currentWorkout } = useWorkouts()
  const [isDeleting, setIsDeleting] = useState(false)
  const [delConfirmModalVisible, setDelConfirmModalVisible] = useState(false)
  if (!exercise) return null;


  function goToEditExercise() {
    navigation.push('EditExercise')
    onDismiss('edit')
  }

  async function handleDeleteExercise() {
    setDelConfirmModalVisible(false)
    setIsDeleting(true)
    try {
      await deleteExercise(currentWorkout.id, exercise.id)
      onDismiss('deleted')
    } catch (error) {
      console.error(error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Portal>
        <ModalContainer
          visible={visible}
          onDismiss={onDismiss}
        >
          <Title variant="titleMedium">{exercise.name}</Title>
          <ContentContainer>
              <InfoWrapper>
                  <InfoCard
                  icon={ListNumbers} 
                  title="Séries" 
                  value={`${exercise.series}x`}  
                  style={{ flex: 1 }}
                  />
                  
                  <InfoCard
                  icon={Repeat} 
                  title="Repetições" 
                  value={`${exercise.repetitions} rep`}  
                  style={{ flex: 1 }}
                  />
              </InfoWrapper>

              <InfoWrapper>
                  <InfoCard
                  icon={Barbell} 
                  title="Peso" 
                  value={`${exercise.weight} kg`}  
                  style={{ flex: 1 }}
                  />
                  
                  <InfoCard
                  icon={Person} 
                  title="Grupo muscular" 
                  value={exercise.muscleGroup}  
                  style={{ flex: 1 }}
                  />
              </InfoWrapper>

              <InfoWrapper>
                  <InfoCard
                  icon={Calendar} 
                  title="Data de criação" 
                  value={new Date(exercise.createdAt).toLocaleDateString('pt-BR', { dateStyle: 'short' })}  
                  style={{ flex: 1 }}
                  />

                  <InfoCard
                  icon={Calendar} 
                  title="Ultima atualização" 
                  value={new Date(exercise.updatedAt).toLocaleDateString('pt-BR', { dateStyle: 'short' })}  
                  style={{ flex: 1 }}
                  />
              </InfoWrapper>

              <NotesWrapper>
                  <Label>Observações</Label>
                  <NotesText>{exercise.notes || "Nenhuma observação"}</NotesText>
              </NotesWrapper>
          </ContentContainer>

          <CustomButton 
              title="Editar Exercício"
              icon={Pencil}
              type="SECONDARY"
              style={{ marginTop: 10, }}
              onPress={goToEditExercise}
          />

          <CustomButton 
              title="Remover Exercício"
              icon={Trash}
              type="DANGER"
              isLoading={isDeleting}
              onPress={() => setDelConfirmModalVisible(true)}
          />
          {/* Só vai ter esse se tiver iniciado o treino
          <CustomButton 
              title="Marcar como concluído"
              icon={CheckFat}
              type="SUCCESS"
          /> */}
        </ModalContainer>
      </Portal>

      <DeleteConfirmationModal
        visible={delConfirmModalVisible}
        onCancel={() => setDelConfirmModalVisible(false)}
        onConfirm={handleDeleteExercise}
        message="Deseja realmente remover este exercício?"
      />  
    </>
  );
}
