import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { ColorModeSwitch } from '../ui/color-mode';
import { Switch } from '../ui/switch';
import CustomSelect from '../ui/SelectButton';

const items = [
    { label: "English", value: "english" },
    { label: "Hindi", value: "hindi" },
]



const Settings = () => {
    return (
        <Box w={"full"}>
            <Text fontSize={{ base: "sm", md: "xl" }} >
                Settings
            </Text>
            <Flex direction={"column"} w={"full"} px={3}>
                <HStack w={"full"} justify={"space-between"}>
                    <Text>Dark Mode</Text>
                    <Box>
                        <ColorModeSwitch />
                    </Box>
                </HStack>
                <HStack w={"full"} justify={"space-between"}>
                    <Text>Notification</Text>
                    <Box>
                        <Switch />
                    </Box>
                </HStack>

                <HStack w={"full"} justify={"space-between"} align={"center"} mt={1}>
                    <Text>Language</Text>
                    <CustomSelect
                    data={items}
                    placeholder={"Select Language"}
                    size="xs"
                    />
                </HStack>

            </Flex>
        </Box>
    );
};

export default Settings;