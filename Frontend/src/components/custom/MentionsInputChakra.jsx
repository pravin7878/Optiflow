import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Input,
  Tag,
  TagLabel,
  VStack,
  List,
  ListItem,
  HStack,
  Text,
  Flex
  // useOutsideClick,
} from '@chakra-ui/react';


const MentionsInputChakra = ({ users, value, onChange, placeholder }) => {
  const [input, setInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const ref = useRef();
  const inputRef = useRef();

// Outside click handler
useEffect(() => {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowDropdown(false);
    }
  }
  if (showDropdown) {
    document.addEventListener("mousedown", handleClickOutside);
  }
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [showDropdown]);


  useEffect(() => {
    setFilteredUsers(users)
  }, [users])

  // Handle input change
  const handleInputChange = (e) => {
    const val = e.target.value;
    setInput(val);
    // If last word starts with @, show dropdown
    const match = val.match(/@([\w]*)$/);
    if (match) {
      const search = match[1].toLowerCase();
      const filtered = users.filter(
        (u) =>
          !value.some((v) => v._id === u._id) &&
          u.name.toLowerCase().includes(search)
      );
      setFilteredUsers(filtered);
      setShowDropdown(true);
      setFocusedIndex(filtered.length > 0 ? 0 : -1);
    } else {
      setShowDropdown(false);
      setFocusedIndex(-1);
    }
  };

  // Keyboard navigation
  const handleInputKeyDown = (e) => {
    if (!showDropdown || filteredUsers.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % filteredUsers.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev - 1 + filteredUsers.length) % filteredUsers.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < filteredUsers.length) {
        handleUserSelect(filteredUsers[focusedIndex]);
      }
    }
  };

  // Handle user select
  const handleUserSelect = (user) => {
    const newInput = input.replace(/@([\w]*)$/, "");
    setInput(newInput);
    onChange([...value, user]);
    setShowDropdown(false);
    setFocusedIndex(-1);
    inputRef.current.focus();
  };

  // Remove mention
  const handleRemove = (userId) => {
    onChange(value.filter((u) => u._id !== userId));
  };

  return (
    <Box ref={ref} width={"100%"}>
      <VStack align="stretch" spacing={2}>
      {showDropdown && filteredUsers.length > 0 && (
          <List.Root
            border="1px solid #ccc"
            borderRadius="md"
            maxH="150px"
            overflowY="auto"
            boxShadow="md"
          >
            {filteredUsers.map((user, idx) => (
              <List.Item
                key={user._id}
                cursor="pointer"
                bg={idx === focusedIndex ? 'gray.100' : 'transparent'}
                onClick={() => handleUserSelect(user)}
              >
                <HStack 
                color={idx === focusedIndex ? 'black' : 'white'}
                px={3} py={1} _hover={{ color: "black", bg: "gray.100" }} justify={"space-between"} as="span" fontSize="sm">
                  <Text>@{user.name}{' '}</Text>
                  <Text>{user.email}</Text>
                </HStack>
              </List.Item>
            ))}
          </List.Root>
        )}

        <Flex
          align="center"
          flexWrap="wrap"
          gap={2}
          borderWidth={1}
          borderRadius="md"
          px={2}
          minH="40px"
          _focusWithin={{ boxShadow: "outline", borderColor: "white" }}
        onClick={() => inputRef.current.focus()}
        >
          {value.map((user) => (
            <Tag.Root fontWeight={"bold"} key={user._id} bg={"gray.100"} p={2} color="black" borderRadius="full">
              <Tag.Label>@{user.name}</Tag.Label>
              <Tag.EndElement>
                <Tag.CloseTrigger onClick={handleRemove}/>
              </Tag.EndElement>
            </Tag.Root>
          ))}
          <Input
            ref={inputRef}
            variant="unstyled"
            flex={1}
            minW="120px"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder={placeholder}
            autoComplete="off"
          />
        </Flex>

      </VStack>
    </Box>
  );
};

export default MentionsInputChakra;
