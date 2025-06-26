import {
    HStack,
    Input,
    InputGroup,
    Button,
    ButtonGroup,
    NativeSelect 
} from "@chakra-ui/react";
import { LuSearch, LuFilter, LuFilterX} from "react-icons/lu";



export default function Filter ({ value, onChange, selectedField, onFieldChange, options }) {

    const isCampoActivo = selectedField !== 'search';

    return(
        <>
        <HStack mb={5} justifyContent={"center"}>
            <Button
                size="sm"
                _dark={{
                    bg: "gray.700",
                    color: "white",
                    _hover: { bg: "gray.600" },
                }}
                onClick={() => {
                    if (isCampoActivo) {
                        onFieldChange('search'); 
                    } else {
                        onFieldChange(options[0]?.accessorKey || ''); 
                    }
                }}
            >
                {isCampoActivo ? <LuFilterX /> : <LuFilter />}
            </Button>
            {selectedField !== 'search' && (
                <NativeSelect.Root width="10rem"
                maxW="10rem"
                value={selectedField}
                onChange={(e) => onFieldChange(e.target.value)}
                >
                    <NativeSelect.Field placeholder="Buscar por..." >
                        {options.map((col) => (
                            <option key={col.accessorKey} value={col.accessorKey}>
                                {col.header}
                            </option>
                        ))}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                </NativeSelect.Root>
            )}
            <InputGroup size="sm" maxW="20rem" startElement={<LuSearch/>}>
                <Input
                type="text"
                variant="filled"
                placeholder={`Buscar...`}
                borderRadius={5}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                />
            </InputGroup>
        </HStack>
        </>
    )
}
