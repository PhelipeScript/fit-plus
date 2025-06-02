import { Text } from "react-native-paper";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px;
  border-radius: 16px;
  width: 48%;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray200 + 80};
  gap: 12px;
`;

export const StatCardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const StatCardTitle = styled(Text)`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.medium};
    font-size: ${theme.fontSizes.base};
    color: ${theme.colors.black};
  `}
`;

export const StatCardValue = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.medium};
    font-size: ${theme.fontSizes['2xl']};
    color: ${theme.colors.black};
  `}
`;

export const StatCardUnit = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSizes.base};
    color: ${theme.colors.gray300};
  `}
`;
