import {
    HStack,
    Input,
    InputGroup
} from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

const Filter = ({globalFilter,setGlobalFilter}) => {

    return(
        <>
        <HStack mb={5}>
            <InputGroup size="sm" maxW="12rem" startElement={<LuSearch/>}>
                <Input
                type="text"
                variant="filled"
                placeholder="Buscar..."
                borderRadius={5}
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                />
            </InputGroup>
        </HStack>
        </>
    )
}

export default Filter;