import { useEffect, useState } from 'react';
import { AvatarImage, Container } from './styles';
import * as FileSystem from 'expo-file-system'

/**
 * 
 * @param {{
 *  sourcePath?: string,
 *  size?: "sm" | "lg"
 * }} props
 */
export function Avatar({ sourcePath, size='lg' }) {
  const fallback = require('../../../assets/logo.png');
  const [validSourcePath, setValidSourcePath] = useState("")

  async function checkAvatarUri() {
    if (!sourcePath) return setValidSourcePath("")
    
    const fileInfo = await FileSystem.getInfoAsync(sourcePath)
    if (fileInfo.exists) 
      setValidSourcePath(sourcePath)
    else
      setValidSourcePath('')
  } 

  useEffect(() => {
    checkAvatarUri()
  }, [sourcePath])

  return (
    <Container size={size}>
      <AvatarImage source={validSourcePath ? { uri: validSourcePath } : fallback} />
    </Container>
  );
}
