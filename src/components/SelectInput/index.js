import { useState } from 'react';
import { CaretDown } from 'phosphor-react-native';
import { AnchorWrapper, ButtonText, Container, DropdownButton, Label, MenuContainer, MenuItem } from './styles';
import { useTheme } from 'styled-components';

export function SelectInput({ label, value, onChange, options }) {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Container>
      <Label>{label}</Label>

      <MenuContainer
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <AnchorWrapper>
            <DropdownButton onPress={openMenu}>
              <ButtonText>{value || 'Selecionar'}</ButtonText>
              <CaretDown size={20} color={theme.colors.black} />
            </DropdownButton>
          </AnchorWrapper>
        }
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onPress={() => {
              onChange(option);
              closeMenu();
            }}
            title={option}
          />
        ))}
      </MenuContainer>
    </Container>
  );
}
