import { Menu, Text } from "react-native-paper";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
`;

export const MenuContainer = styled(Menu).attrs(({ theme }) => ({
  contentStyle: {
    backgroundColor: theme.colors.background,
    borderRadius: 8,
  }
}))`
  width: 90%;
  align-items: center;
`

export const MenuItem = styled(Menu.Item).attrs(({ theme }) => ({
  titleStyle: {
    color: theme.colors.black,
    minWidth: '100%',
  },
}))``

export const Label = styled(Text)`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSizes.base};
    color: ${theme.colors.gray200};
  `}
  margin-bottom: 6px;
`;

export const AnchorWrapper = styled.View`
  width: 100%;
`;

export const DropdownButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray300};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 14px 16px;
  width: 100%;
`;

export const ButtonText = styled(Text)`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSizes.base};
    color: ${theme.colors.black};
  `}
`;
