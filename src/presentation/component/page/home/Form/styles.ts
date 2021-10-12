import styled from '@emotion/styled';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  padding: 20px;
  margin: 0 auto;
  width: 400px;
  height: min-content;
  display: grid;
  grid-auto-flow: row;
  row-gap: 10px;
  background-color: ${({ theme }) => theme.colors.base};
  border-radius: 8px;
`
