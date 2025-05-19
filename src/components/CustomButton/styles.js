import styled, { css } from "styled-components/native";

export const Container = styled.TouchableOpacity`
    width: 100%;
    padding: 16px 24px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 6px;
    background: ${({ theme, type }) => (
        type === 'SECONDARY'
        ? theme.colors.blue100
        : type === 'DANGER'
        ? theme.colors.red100
        : type === 'SUCCESS'
        ? theme.colors.green100
        : theme.colors.primary
    )};
`

export const Title = styled.Text`
    ${({ theme, type }) => css`
        font-family: ${theme.fontFamily.bold};
        font-size: ${theme.fontSizes.xl};
        color: ${
            type === 'SECONDARY'
            ? theme.colors.primary
            : type === 'DANGER'
            ? theme.colors.red500
            : type === 'SUCCESS'
            ? theme.colors.green500
            : theme.colors.white
        };
  `}
`
