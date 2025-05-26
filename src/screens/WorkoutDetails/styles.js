import { Barbell, CheckSquare, Square } from "phosphor-react-native";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
`

export const Header = styled.View`
  width: 100%;
  height: 180px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 0px 0px 48px 48px;
`

export const DescriptionText = styled.Text.attrs({
  numberOfLines: 5,
  ellipsizeMode: 'tail',
})`
  ${({ theme }) => css`
    font-size: ${theme.fontSizes.base};
    font-family: ${theme.fontFamily.regular};
    color: ${theme.colors.gray100};
  `}
`

export const TabsContainer = styled.View`
  flex-direction: row;
  width: 90%;
  height: 60px;
  margin-top: -35px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.white};
`

export const TabTextWrapper = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.background};
`

export const TabText = styled.Text`
  ${({ theme, active }) => css`
    font-size: ${theme.fontSizes.base};
    font-family: ${theme.fontFamily.bold};
    color: ${active ? theme.colors.primary : theme.colors.gray200};
  `}

`

export const Main = styled.View`
  flex: 1;
  gap: 12px;
  width: 100%;
  padding: 16px 16px 32px;
`

export const ExerciseList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``

export const ExerciseListEmpty = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 16px;
`

export const EmptyText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.medium};
    font-size: ${theme.fontSizes.base};
    color: ${theme.colors.gray200};
  `}
  text-align: center;
  max-width: 260px;
`

export const EmptyIcon = styled(Barbell).attrs(({ theme }) => ({
  size: 64,
  color: theme.colors.gray200,
}))``

export const ExerciseCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray200 + 80};
`

export const ExerciseTitle = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSizes.base};
    color: ${theme.colors.black};
  `}
  flex: 1;
`

export const ExerciseInfoText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.gray200};
  `}
`

export const ExerciseCheckbox = styled(Square).attrs(({ theme }) => ({
  size: 24,
  color: theme.colors.primary,
}))``

export const ExerciseCheckboxMarked = styled(CheckSquare).attrs(({ theme }) => ({
  size: 24,
  color: theme.colors.primary,
  weight: 'fill',
}))``
