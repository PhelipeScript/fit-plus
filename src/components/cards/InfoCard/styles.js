import { NotePencil } from "phosphor-react-native";
import styled, { css } from "styled-components/native";

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 12px;
`

export const InfoContainer = styled.View`
  gap: 4px;
`

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.gray200};
  `}
`

export const ValueText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSizes.base};
    color: ${theme.colors.black};
  `}
`

export const IconContainer = styled.View`
  background: ${({ theme }) => theme.colors.primary};
  width: 48px;
  height: 48px;
  border-radius: 9999px;
  align-items: center;
  justify-content: center;
`

export const EditIcon = styled(NotePencil).attrs(({ theme }) => ({
  size: 16,
  color: theme.colors.primary
}))``
