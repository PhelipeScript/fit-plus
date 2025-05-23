import styled from "styled-components/native"

const Base = styled.View`
  background: ${({ theme }) => theme.colors.gray200 + 80};
`

export const Vertical = styled(Base)`
  height: 100%;
  width: 1px;
  align-self: stretch;
`

export const Horizontal = styled(Base)`
  width: 100%;
  height: 1px;
`
