import React from 'react';
import { Input, InputGroup, InputLeftAddon, Radio, RadioGroup, Stack, VStack, Text, Switch, Flex } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';

const Filter = ({ search, setSearch, searchLocation, setSearchLocation, sort, setSort, gearNeeds, setGearNeeds }) => {
    return (
        <VStack spacing="20px" align="left">
            <InputGroup>
                <InputLeftAddon children={<SearchIcon />} />
                <Input placeholder="Search by role" value={search} onChange={(e) => setSearch(e.target.value)} />
            </InputGroup>
            <InputGroup>
                <InputLeftAddon children={<SearchIcon />} />
                <Input placeholder="Search by location" value={searchLocation} onChange={e => setSearchLocation(e.target.value)} />
            </InputGroup>
            <RadioGroup onChange={setSort} value={sort}>
                <Stack direction="column">
                    <Text>Sort by:</Text>
                    <Radio value="Start Date">Start Date</Radio>
                    <Radio value="Length of Time">Length of Time</Radio>
                </Stack>
            </RadioGroup>
            <Flex alignItems="center">
                <Text mb="0" mr="2">No gear needed</Text>
                <Switch isChecked={gearNeeds} onChange={() => setGearNeeds(!gearNeeds)}/>
            </Flex>
        </VStack>
    )
}

export default Filter;