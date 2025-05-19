import { useTheme } from "styled-components/native";
import { Container, Title } from "./styles";

/**
 * 
 * @param {{    
 *  title: string,
 *  icon?: React.ElementType<import("phosphor-react-native").IconProps>,
 *  type?: 'PRIMARY' | 'SECONDARY' | 'DANGER' | 'SUCCESS'
 * } & import('react-native').TouchableOpacityProps} props 
 */
export function CustomButton({title, icon: Icon, type = 'PRIMARY', ...props}) {
    const theme = useTheme()

    return (
        <Container {...props} type={type}>
            {Icon && (
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
            <Title type={type}>
                {title}
            </Title>
        </Container>
    )
}
