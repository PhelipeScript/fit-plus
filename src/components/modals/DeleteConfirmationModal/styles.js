import { Modal, Text, Button } from "react-native-paper";
import styled, { css } from "styled-components/native";

export const ModalContainer = styled(Modal).attrs(({ theme }) => ({
  contentContainerStyle: {
    marginHorizontal: 32,
    padding: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.background,
    gap: 32,
  }
}))``

export const Title = styled(Text)`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.medium};
    font-size: ${theme.fontSizes.base};
    color: ${theme.colors.black};
  `}
`

export const ButtonsWrapper = styled.View`
  flex-direction: row;
  align-self: flex-end;
  gap: 8px;
`

export const CustomButton = styled(Button).attrs(({ theme, type }) => ({
  textColor: type === 'confirm' ? theme.colors.red500 : theme.colors.gray300,
}))`
  background: ${({ theme, type }) => type === 'confirm' ? theme.colors.red100 : theme.colors.gray100};
  border-radius: 8px;
`
