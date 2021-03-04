import React from 'react';
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';

const Filter = ({ search, setSearch }) => {
    return (
        <InputGroup>
            <InputLeftAddon children={<SearchIcon/>}/>
            <Input placeholder="Search by role..." value={search} onChange={(e) => setSearch(e.target.value)}/>
        </InputGroup>
    )
}

export default Filter;