import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;
const Title = styled.h1`
    color: blue;
`;
const Link = styled.a`
    padding-left: 10px;
    padding-right: 10px;
    color: black;
    &:hover {
        color: red;
    }
`;

export default function Header() {
    return (
        <StyledHeader>
            <Title>Sandbox</Title>
            <nav>
                <Link href="#">Home</Link>
                <Link href="#">About</Link>
                <Link href="#">Contact</Link>
            </nav>
        </StyledHeader>
    )
}
