import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import styled, { css } from "styled-components/native";

export const Container = styled(BottomSheetModal)`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => theme.colors.gray100};
`

export const Content = styled(BottomSheetView)`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 16px 24px;
  min-width: 100%;
  background: ${({ theme }) => theme.colors.gray100};
`
export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSizes['xl']};
    color: ${theme.colors.black};
  `}
  margin-bottom: 32px; 
`

export const ErrorText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.medium};
    font-size: ${theme.fontSizes.base};
    color: ${theme.colors.red500};
  `}
`

export const SuccessText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.medium};
    font-size: ${theme.fontSizes.base};
    color: ${theme.colors.green500};
  `}
`
