import React, { useState } from 'react';
import {
  Button,
  CloseButton,
  Dialog,
  HStack,
  Input,
  Portal,
  VStack,
  Text,
  Box
} from '@chakra-ui/react';

const NotesModal = ({ notes = [], onAddNote, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleAddNote = async () => {
    if (!noteText.trim()) return;
    setSubmitting(true);
    await onAddNote(noteText);
    setNoteText('');
    setSubmitting(false);
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Dialog.Root placement={"center"} motionPreset="slide-in-bottom" open={isOpen} onClose={handleClose}>
      <Dialog.Trigger asChild>
        <span onClick={handleOpen}>{children}</span>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Notes</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack align="stretch" spacing={3} maxH="300px" overflowY="auto">
                {notes.length === 0 && <Text color="white">No notes yet.</Text>}
                {notes.map((note, idx) => (
                  <Box key={idx} p={2} border="1px solid #ccc" borderRadius="md">
                    <Text fontSize="sm">{note.text}</Text>
                    <Text fontSize="xs" color="gray.400">
                      {note.createdAt ? new Date(note.createdAt).toLocaleString() : ''}
                    </Text>
                  </Box>
                ))}
              </VStack>
              <HStack mt={4}>
                <Input
                  placeholder="Add a note..."
                  value={noteText}
                  onChange={e => setNoteText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleAddNote(); }}
                  isDisabled={submitting}
                />
                <Button onClick={handleAddNote} isLoading={submitting} colorScheme="blue">
                  Add
                </Button>
              </HStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline" onClick={handleClose}>Close</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default NotesModal; 