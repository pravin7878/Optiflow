import React from 'react';
import { Avatar, Box, Button, HStack, Icon, IconButton, Image } from "@chakra-ui/react";
import { Input, InputGroup, Kbd } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import { ColorModeButton } from "../ui/color-mode";
import { BiBell } from "react-icons/bi";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { SideBarDrawer } from "../ui/Drawer";
import Sidebar from "./Sidebar";
import logo from "../../assets/logo_deshboard.png"
import { MdAddTask } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../app/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import ProfileButton from '../custom/ProfileButton';
import PresenceCard from '../ui/Presence';
import UserInfoCard from '../custom/UserInfoCard';

const Header = () => {
    const [isSerchActive, setIsSerchActive] = useState(false)
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('user');
        navigate('/singin');
    }

    return (
        <HStack
            px={{ base: 2, md: 4 }}
            py={{ base: 1, md: 3 }}
            align="center"
            justify="space-between"
            boxShadow="md"
            zIndex={1}
        >
            {/* sm screen only */}
            <HStack
                hideFrom={"md"}
            >
                <Box

                >
                    <SideBarDrawer>
                        <Sidebar />
                    </SideBarDrawer>
                </Box>
                <Box >
                    <Icon>
                        <MdAddTask size={20} />
                    </Icon>
                </Box>
            </HStack>

            <Box
                w={"60%"}
                display={{ base: isSerchActive ? "block" : "none", md: "block" }}
            >
                <InputGroup flex="1" startElement={<LuSearch />} >
                    <Input placeholder="Search task..." />
                </InputGroup>
            </Box>

            <HStack>
                <IconButton
                    variant={"ghost"}
                    size={["xs", "sm", "md"]}
                    hideFrom={"md"}
                    aria-label="Search database"
                    onClick={() => setIsSerchActive(!isSerchActive)}
                >
                    {isSerchActive ? <CgClose /> : <LuSearch />}
                </IconButton>

                <ColorModeButton
                    hidden={isSerchActive}
                />

                <IconButton
                    variant={"ghost"}
                    size={["xs", "sm", "md"]}
                    rounded={"full"}
                    hidden={isSerchActive}
                >
                    <BiBell />
                </IconButton>

                {user ? (<HStack gap={3}>
                    

                    <PresenceCard clickItem={<ProfileButton />} >
                       <UserInfoCard handleLogout={handleLogout} isSerchActive={isSerchActive}/>
                    </PresenceCard>
                </HStack>
                ) : (
                    <Link to={"/singin"}>
                        <Button size={"md"} hidden={isSerchActive}>
                            SingIn
                        </Button>
                    </Link>
                )}

            </HStack>
        </HStack>
    );
};


export default Header