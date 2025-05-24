import { Heartbeat, Plus } from "phosphor-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  width: 100%;
  padding: 16px 16px 0px;
  gap: 16px;
  position: relative;
`

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.medium};
    font-size: ${theme.fontSizes.xl};
    color: ${theme.colors.black};
  `}
  align-self: flex-start;
`

export const WorkoutList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``

export const WorkoutListEmpty = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 16px;
`

export const EmptyText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.medium};
    font-size: ${theme.fontSizes.lg};
    color: ${theme.colors.gray200};
  `}
  text-align: center;
`

export const EmptyIcon = styled(Heartbeat).attrs(({ theme }) => ({
  size: 64,
  color: theme.colors.gray200,
}))``

export const DescriptionText = styled.Text.attrs({
  numberOfLines: 3,
  ellipsizeMode: 'tail'
})`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.medium};
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.gray200};
  `}
  margin: 0px 12px 12px;
`

export const NewWorkout = styled.TouchableOpacity`
  position: absolute;
  align-items: center;
  justify-content: center;
  bottom: 16px;
  right: 16px;
  width: 70px;
  height: 70px;
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.primary};
`

export const NewWorkoutIcon = styled(Plus).attrs(({ theme }) => ({
  size: 24,
  color: theme.colors.white,
}))``
