import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import App from '../App';
import { Router, MemoryRouter, useParams } from 'react-router-dom';
import axiosClient from '../axiosClient';

jest.mock('react-redux');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

let languages = {};
let language = {};

describe('compiler', () => {
  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.queryByText(/learn react/i);
    expect(linkElement).toBeInDoument();
  });
});
