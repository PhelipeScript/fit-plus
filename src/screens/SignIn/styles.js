import { Eye, EyeClosed } from "phosphor-react-native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background: ${props => props.theme.colors.background};
`

export const ContentWrapper = styled(ScrollView).attrs(({theme}) => ({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: 24,
  },
  keyboardShouldPersistTaps: 'handled',
}))``;

export const Text = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSizes.lg};
    color: ${theme.colors.gray300};
  `}
`

export const Form = styled.View`
  margin-top: 62px;
  width: 100%;
  gap: 16px;
`

export const ErrorText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.medium};
    font-size: ${theme.fontSizes.base};
    color: ${theme.colors.red500};
  `}
`

export const EyeClosedIcon = styled(EyeClosed).attrs({
  size: 24,
})`
  ${({ theme }) => css`
    color: ${theme.colors.gray300};
  `}
`

export const EyeOpenIcon = styled(Eye).attrs({
  size: 24,
})`
  ${({ theme }) => css`
    color: ${theme.colors.gray300};
  `}
`

export const ForgotPasswordText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSizes.base};
    color: ${theme.colors.secondary};
  `}
  text-align: center;
`

export const SignUpContainer = styled.TouchableOpacity`
  flex-direction: row;
  gap: 6px;
  align-items: center;
  justify-content: center;
`

export const SignUpText = styled.Text`
  ${({ theme, type }) => css`
    font-family: ${type === 'regular' ? theme.fontFamily.regular : theme.fontFamily.bold};
    font-size: ${theme.fontSizes.base};
    color: ${type === 'regular' ? theme.colors.gray300 : theme.colors.primary};
  `}

  margin-top: 48px;
`
