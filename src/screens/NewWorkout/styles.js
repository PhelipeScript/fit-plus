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
    padding: 16,
  },
  keyboardShouldPersistTaps: 'handled',
}))``;

export const Form = styled.View`
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
