import { Modal } from "react-native-paper";
import styled, { css } from "styled-components/native";

export const ModalContainer = styled(Modal).attrs(({ theme }) => ({
    contentContainerStyle: {
        backgroundColor: theme.colors.background,
        margin: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 12,
        gap: 6,
        maxHeight: '70%',
    }   
}))``

export const ContentContainer = styled.ScrollView.attrs({
    showsVerticalScrollIndicator: false,
})``

export const Title = styled.Text`
    ${({ theme }) => css`
        font-family: ${theme.fontFamily.bold};
        font-size: ${theme.fontSizes.base};
        colors: ${theme.colors.black};
    `}
    text-align: center;
`

export const InfoWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    gap: 12px;
`

export const NotesWrapper = styled.View`
    padding: 12px;
    gap: 6px;
`

export const Label = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.gray200};
  `}
`

export const NotesText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSizes.base};
    color: ${theme.colors.gray300};
    border: 1px solid ${theme.colors.gray100};
  `}

  padding: 12px;
  border-radius: 12px;
`
