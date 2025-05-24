import { AvatarImage, Container } from './styles';

/**
 * 
 * @param {{
 *  sourcePath?: string,
 *  size?: "sm" | "lg"
 * }} props
 */
export function Avatar({ sourcePath, size='lg' }) {
  const fallback = require('../../../assets/logo.png');

  return (
    <Container size={size}>
      <AvatarImage source={sourcePath ? { uri: sourcePath } : fallback} />
    </Container>
  );
}
