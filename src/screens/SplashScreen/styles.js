import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

export const Container = styled(SafeAreaView)`
    flex: 1;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.background};
`

export const LoadingText = styled.Text`
    ${({ theme }) => css`
        font-family: ${theme.fontFamily.medium};
        font-size: ${theme.fontSizes.lg};
        color: ${theme.colors.secondary};
    `}
`

export const ProgressBar = styled.View`
  height: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-self: flex-start;
  margin-top: 24px;
  border-radius: 2px;
`;
