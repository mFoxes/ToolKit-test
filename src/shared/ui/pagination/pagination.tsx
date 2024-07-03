import styled, { css } from 'styled-components';

interface PaginationProps {
    itemsPerPage: number;
    currentPage: number;
    itemsCount: number;
    onChange?: (currentPage: number) => void;
}

export const Pagination = ({
    itemsPerPage,
    currentPage,
    itemsCount,
    onChange
}: PaginationProps) => {
    const getPaginationArray = () => {
        const res = [];
        for (let i = 0; i < Math.min(10, Math.ceil(itemsCount / itemsPerPage)); i++) {
            res.push(i);
        }

        return res;
    };
    const paginationArray = getPaginationArray();

    const handleClick = (value: number) => {
        onChange && onChange(value);
    };

    return (
        <PaginationContainer>
            {paginationArray.map((num) => (
                <PaginationItem
                    key={num}
                    $active={num === currentPage}
                    onClick={() => handleClick(num)}>
                    {num + 1}
                </PaginationItem>
            ))}
        </PaginationContainer>
    );
};

const PaginationContainer = styled.div`
    display: flex;
    gap: 20px;
`;

const PaginationItem = styled.div<{ $active?: boolean }>`
    font-size: 22px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;

    ${(props) =>
        props.$active &&
        css`
            border: 2px solid ${props.theme.colors.darkGrey};
            border-radius: 50%;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
        `}
`;
