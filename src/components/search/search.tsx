import { Formik } from 'formik';
import React, { ChangeEventHandler, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchSvg } from '../../assets/svg/search.svg';

interface SearchProps {
    onSubmit?: (value: string) => void;
}

export const Search = ({ onSubmit, ...props }: SearchProps) => {
    const handleFormSubmit = (data: { searchValue: string }) => {
        onSubmit && onSubmit(data.searchValue);
    };

    return (
        <Container>
            <Formik var initialValues={{ searchValue: '' }} onSubmit={handleFormSubmit}>
                {({ values, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <FormikContent>
                            <StyledInput
                                name="searchValue"
                                value={values.searchValue}
                                onChange={handleChange}
                                placeholder="Поиск..."
                            />
                            <StyledButton type="submit">
                                <SearchSvg />
                            </StyledButton>
                        </FormikContent>
                    </form>
                )}
            </Formik>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const FormikContent = styled.div`
    display: flex;
`;

const StyledInput = styled.input`
    padding: 4px 0 4px 8px;
    border: 2px solid ${(props) => props.theme.colors.darkGrey};
    border-right: none;
    border-radius: 8px 0 0 8px;
    outline: none;

    font-size: 18px;
`;

const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${(props) => props.theme.colors.white};
    border: 2px solid ${(props) => props.theme.colors.darkGrey};
    border-radius: 0 8px 8px 0;

    cursor: pointer;

    padding: 4px 8px;
    svg {
        height: 24px;
        width: 24px;
    }
`;
