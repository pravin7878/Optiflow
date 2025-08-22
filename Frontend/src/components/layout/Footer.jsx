import { Box, Text } from "@chakra-ui/react";
import React from 'react';
const Footer = () => {
    return (
        <Box shadow={"md"} as="footer" w="full" py={3} textAlign="center">
            <Text fontSize="sm">
                © {new Date().getFullYear()} Dev Track. All rights reserved.
            </Text>
        </Box>
    );
};

export default Footer;