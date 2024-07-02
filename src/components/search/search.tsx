import { Formik } from 'formik';
import React, { ChangeEventHandler, useState } from 'react';
import styled from 'styled-components';

interface SearchProps {
    onSubmit?: (value: string) => void;
}

export const Search = ({ onSubmit, ...props }: SearchProps) => {
    const [value, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleClick = () => {
        console.log('value', value);
        onSubmit && onSubmit(value);
    };

    return (
        <Container>
            <input value={value} onChange={handleChange} />
            <button onClick={handleClick}></button>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;
