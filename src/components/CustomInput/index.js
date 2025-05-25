import { useState } from "react";
import { Container, Input, InputWrapper, Label } from "./styles";
import { TouchableOpacity } from "react-native";

/**
 * 
 * @param {{
  * label?: string, 
  * placeholder: string, 
  * value: string,
  * secureTextEntry?: boolean,
  * icon?: import('phosphor-react-native').Icon
  * iconPos?: 'left' | 'right',
  * separateIcon?: boolean,
  * onChangeText?: () => void,
  * onIconPress?: () => void,
 * } & import("react-native").TextInputProps} props 
 */
export function CustomInput({ 
  label, 
  placeholder, 
  value = "",
  secureTextEntry = false,
  icon,
  iconPos = 'left', 
  separateIcon = false,
  onChangeText, 
  onIconPress,
  ...props 
}) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <Container {...props}>
      {label && <Label>{label}</Label>}
      <InputWrapper isFocused={isFocused} iconPos={iconPos} separateIcon={separateIcon}>
        {icon && onIconPress ? (
          <TouchableOpacity onPress={onIconPress}>
            {icon}
          </TouchableOpacity>
        ) : (
          icon
        )}

        <Input 
          placeholder={placeholder} 
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)} 
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry}
          {...props}
        />
      </InputWrapper>
    </Container>
  )
}
