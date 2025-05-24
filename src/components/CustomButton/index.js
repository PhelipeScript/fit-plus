import { useTheme } from "styled-components/native";
import { Container, Title } from "./styles";
import { ActivityIndicator } from "react-native";

/**
 * 
 * @param {{    
 *  title: string,
 *  icon?: React.ElementType<import("phosphor-react-native").IconProps>,
 *  type?: 'PRIMARY' | 'SECONDARY' | 'DANGER' | 'SUCCESS',
 *  isLoading?: boolean,
 * } & import('react-native').TouchableOpacityProps} props 
 */
export function CustomButton({title, icon: Icon, type = 'PRIMARY', isLoading = false, ...props}) {
    const theme = useTheme()

    return (
        <Container {...props} type={type} disabled={isLoading}>
            {!isLoading && Icon && (
                <Icon  
                    color={
                        type === 'SECONDARY'
                        ? theme.colors.primary
                        : type === 'DANGER'
                        ? theme.colors.red500
                        : type === 'SUCCESS'
                        ? theme.colors.green500
                        : theme.colors.white
                    }
                />
            )}
            
            {!isLoading ? (
                <Title type={type}>
                    {title}
                </Title>
            ) : (
                <ActivityIndicator 
                    size="small" 
                    color={
                        type === 'SECONDARY'
                        ? theme.colors.primary
                        : type === 'DANGER'
                        ? theme.colors.red500
                        : type === 'SUCCESS'
                        ? theme.colors.green500
                        : theme.colors.white
                    } 
                />
            )}
        </Container>
    )
}
