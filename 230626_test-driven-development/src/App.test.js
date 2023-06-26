import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();

  const lintTest = screen.getByRole('button', {
    name: 'lintTest'
  })
  // 틀린 부분, eslint에서 더 좋은 방안 제시
  expect(lintTest.textContent).toBe('lintTest')
  // eslint를 이용해 고친 부분
  expect(lintTest).toHaveTextContent('lintTest')
});
