import { Portal } from 'react-native-paper'
import { ButtonsWrapper, ModalContainer, Title, CustomButton } from './styles'

/**
 * @typedef {Object} DeleteConfirmationModalProps
 * @property {boolean} visible
 * @property {() => void} onCancel
 * @property {() => void} onConfirm
 * @property {string} [message]
 */

export function DeleteConfirmationModal({
  visible,
  onCancel,
  onConfirm,
  message = 'Tem certeza que deseja deletar?',
}) {
  return (
    <Portal>
      <ModalContainer
        visible={visible}
        onDismiss={onCancel}
      >
        <Title variant='labelLarge'>{message}</Title>

        <ButtonsWrapper>
          <CustomButton onPress={onCancel} type="cancel">
            Cancelar
          </CustomButton>
          <CustomButton onPress={onConfirm} type="confirm">
            Confirmar
          </CustomButton>
        </ButtonsWrapper>
      </ModalContainer>
    </Portal>
  )
}
