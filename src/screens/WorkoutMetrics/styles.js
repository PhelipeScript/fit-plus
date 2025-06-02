import { ChartBar } from "phosphor-react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0px 0px 40px;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`

export const HeaderTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSizes['2xl']};
    color: ${theme.colors.black};
  `}
`;

export const HeaderSubtitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSizes.base};
    color: ${theme.colors.gray300};
  `}
`;

export const HeaderIcon = styled(ChartBar).attrs(({ theme }) => ({
  size: 48,
  color: theme.colors.black
}))``

export const TabsContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
`;

export const TabsHeader = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.background}
`;

export const TabButton = styled.TouchableOpacity`
  flex: 1;
  padding: 16px;
  align-items: center;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme, isSelected }) => isSelected ? theme.colors.primary : 'transparent'};
`;

export const TabButtonText = styled.Text`
  ${({ theme, isSelected }) => css`
    font-family: ${isSelected ? theme.fontFamily.bold : theme.fontFamily.regular};
    font-size: ${theme.fontSizes.base};
    color: ${isSelected ? theme.colors.primary : theme.colors.gray200};
  `}
`;

export const TabContent = styled.View`
  padding: 16px;
  gap: 16px;
`;

export const StatsRow = styled.View`
  flex-direction: row;
  gap: 12px;
`;

export const ChartContainer = styled.View`
  gap: 12px;
  padding: 12px;
  border-radius: 16px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray200 + 80};
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ChartTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSizes.xl};
    color: ${theme.colors.black};
  `}
`;

export const WeeklyChart = styled(BarChart).attrs(({ theme }) => ({
  width: 320,
  height: 220,
  chartConfig: {
    backgroundGradientFrom: theme.colors.background,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: theme.colors.background,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 0.6,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontSize: 12,
      fontWeight: '500',
    },
  }
}))`
  border-radius: 20px;
`

export const MuscleGroupDistributionPieChart = styled(PieChart).attrs(({ theme }) => ({
  width: 320,
  height: 220,
  chartConfig: {
    backgroundGradientFrom: theme.colors.background,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: theme.colors.background,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 0.6,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontSize: 12,
      fontWeight: '500',
    },
  }
}))`
  border-radius: 20px;
`

export const ExerciseItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  margin-bottom: 12px;
`;

export const ExerciseInfo = styled.View`
  flex: 1;
  gap: 4px;
`;

export const ExerciseName = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.medium};
    font-size: ${theme.fontSizes.base};
    color: ${theme.colors.black};
  `}
`;

export const ExerciseGroup = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSizes.base};
    color: ${theme.colors.gray200};
  `}
`;

export const ExerciseStats = styled.View`
  align-items: flex-end;
`;

export const ExerciseCount = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSizes.base};
    color: ${theme.colors.primary};
  `}
  padding: 6px 12px;
`;

export const ExerciseWeight = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.gray300};
  `}
`;
