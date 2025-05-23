import styled, { css } from "styled-components/native";

export const Container = styled.Pressable`
  gap: 16px;
  border: 1px solid ${({ theme }) => theme.colors.gray200 + 50};
  border-radius: 8px;
  width: 100%;
`

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 24px 16px 0px;
`

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSizes.base};
    color: ${theme.colors.black};
  `}
  flex: 1;
`

export const Subtitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.gray200};
  `}
`
