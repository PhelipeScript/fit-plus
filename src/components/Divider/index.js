
import { Horizontal, Vertical } from './styles';
/**
 * 
 * @param {{
 *  vertical?: boolean
 * }} props 
 * @returns 
 */
export function Divider({ vertical = false }) {
  return vertical ? (
    <Vertical />
  ) : (
    <Horizontal />
  )
}
