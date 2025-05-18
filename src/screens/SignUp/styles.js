import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.background}
`;

export const Title = styled.Text`
  font-family: ${props => props.theme.fontFamily.regular};
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: ${props => props.theme.colors.black};
`;
