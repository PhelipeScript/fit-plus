import styled, { css } from "styled-components/native";

export const Container = styled.View`
  gap: 6px;
  width: 100%;
`;

export const Label = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSizes.base};
    color: ${theme.colors.gray200};
  `}
`;

export const InputWrapper = styled.View`
  border-radius: 6px;
  padding: 0px 16px;
  align-items: center;
  gap: 6px;

  ${({ theme, isFocused, iconPos, separateIcon }) => css`
    border: ${isFocused ? '2px solid ' + theme.colors.secondary : '1px solid '+ theme.colors.gray300};
    justify-content: ${separateIcon ? 'space-between' : 'flex-start'};
    flex-direction: ${iconPos === 'left' ? 'row' : 'row-reverse'};
  `}
`

export const Input = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.gray200,
}))`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSizes.base};
    color: ${theme.colors.black};
    flex: 1;
    height: 50px;
  `}
`
