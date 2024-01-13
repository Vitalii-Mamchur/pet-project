import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SelectField from './selectField';

describe('<Box />', () => {
  test('it should mount', () => {
    render(<SelectField options='' onChange='' defaultValue='' error='' label=''/>);

    const selectField = screen.getByTestId('SelectField');

    expect(selectField).toBeInTheDocument();
  });
});