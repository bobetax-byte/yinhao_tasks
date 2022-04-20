import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom';
import axios from 'axios';

import SearchQQ from '../SearchQQ'

jest.mock("axios");

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
})

const mockSuccData = {
  data:{ 
    code: 1,
    name: "姓名",
    qlogo: `http:\/\/qlogo2.store.qq.com\/qzone\/123456\/123456\/100`,
    qq:123456,
  }
}

const mockErrData = {
  data: { 
    code: 1123,
    msg: "服务器错误",
  }
}

test('test SearchQQ component render', () => {
  const { container } = render(<SearchQQ />);
  
  expect(container.querySelector('.search-qq-container .search-qq-title')).toBeDefined()
})



test('wait calls component handleInputChange', () => {
  const { getByPlaceholderText } = render(<SearchQQ />);

  fireEvent.change(getByPlaceholderText("请输入QQ号"), {
    target: { value: "1234567890!!!" }
  });

  expect(getByPlaceholderText("请输入QQ号")).toHaveValue('1234567890')
})


test('handles server success', async () => {
  
  (axios.get as jest.Mock).mockResolvedValue(mockSuccData);

  const { getByPlaceholderText,container } = render(<SearchQQ />);
  
  fireEvent.change(getByPlaceholderText("请输入QQ号"), {
    target: { value: "123456" }
  });

  await screen.findByText('123456')

  expect(container.querySelector('h4')?.innerHTML).toEqual("姓名")
})

test('handles server error', () => {

  const { getByPlaceholderText, container } = render(<SearchQQ />);

  (axios.get as jest.Mock).mockResolvedValue(mockErrData);

  fireEvent.change(getByPlaceholderText("请输入QQ号"), {
    target: { value: "12345" }
  });

  expect(container.querySelector('.search-item .placeholder-img')).toBeDefined()
})