import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`

export const ContentContainer = styled.ScrollView.attrs(({ theme }) => ({
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    width: '100%',
    padding: 24,
    background: theme.colors.background
  }
}))``

export const InfoContainer = styled.View``
