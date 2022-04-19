import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';

import { SearchQQItem } from '../SearchQQItem'
import { QQDetailInfo } from '@/qq'

jest.useFakeTimers();

const mockData: QQDetailInfo = {
  qq: 123,
  qlogo: 'http:\/\/qlogo2.store.qq.com\/qzone\/774740085\/774740085\/100',
  name: "testName"
}

test('test SearchQQItem component prop isEmpty', () => {
  const {container } = render(<SearchQQItem isEmpty={true} qqInfo={mockData} />);
  
  expect(container.querySelector('.search-item .placeholder-img')).toBeDefined()
})

test('test SearchQQItem component prop isLoading', () => {
  const {container } = render(<SearchQQItem isLoading={true} qqInfo={mockData} />);
  
  expect(container.querySelector('.search-item .animation')).toBeDefined()
})

test('should test components prop qqInfo', async () => {
  render(<SearchQQItem qqInfo={mockData} />);
  expect(await screen.queryByText(/testName/)).toBeInTheDocument();
});
