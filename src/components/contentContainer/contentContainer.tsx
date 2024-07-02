import React, { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';

interface ContentContainerProps extends HTMLAttributes<HTMLDivElement> {
    fullHeight?: boolean;
}

export const ContentContainer = ({ children, fullHeight, ...props }: ContentContainerProps) => {
    return (
        <Wrapper $fullHeight={fullHeight}>
            <Container>{children}</Container>
        </Wrapper>
    );
};

const Wrapper = styled.div<{ $fullHeight?: boolean }>`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    flex: 1 1 ${(props) => (props.$fullHeight ? '100%' : 'auto')};
`;

const Container = styled.div`
    flex: 1 1 100%;
    padding: 0 20px;
    width: 100%;
    max-width: 1200px;
`;
