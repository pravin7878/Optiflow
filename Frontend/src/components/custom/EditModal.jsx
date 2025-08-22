import React, { useState, useEffect } from "react"
import {
  Button,
  CloseButton,
  Dialog,
  For,
  HStack,
  Input,
  Portal,
} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllUsers } from "../../app/actions/user"

export const EditTaskModal = ({ task, onClose, onSave, children }) => {
  const dispatch = useDispatch()
  const { allUsers, allUsersLoading } = useSelector((state) => state.user)
  const [updatedTask, setUpdatedTask] = useState({
    ...task,
    tags: Array.isArray(task.tags) ? task.tags.join(', ') : (task.tags || ''),
    mentions: Array.isArray(task.mentions) ? task.mentions.map(m => m._id || m) : [],
  })

  // useEffect(() => {
  //   dispatch(fetchAllUsers())
  // }, [dispatch])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUpdatedTask({ ...updatedTask, [name]: value })
  }

  const handleMentionsChange = (e) => {
    const options = e.target.options
    const selected = []
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value)
      }
    }
    setUpdatedTask({ ...updatedTask, mentions: selected })
  }

  const handleSave = () => {
    // Convert tags string to array before saving
    const submitTask = {
      ...updatedTask,
      tags: updatedTask.tags
        ? updatedTask.tags.split(',').map(t => t.trim()).filter(Boolean)
        : [],
      mentions: updatedTask.mentions,
    }
    onSave(submitTask)
    onClose()
  }

  return (
    <Dialog.Root
      placement={"center"}
      motionPreset="slide-in-bottom"
    >
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Edit Task</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Input
                name="title"
                value={updatedTask.title}
                onChange={handleChange}
                placeholder="Title"
                mb={4}
              />
              <Input
                name="description"
                value={updatedTask.description}
                onChange={handleChange}
                placeholder="Description"
              />

              <Input
                name="tags"
                value={updatedTask.tags}
                onChange={handleChange}
                placeholder="Tags (comma separated)"
                mt={4}
              />

              <div style={{ marginTop: 16 }}>
                <label>Mentions (select users to mention)</label>
                <select
                  multiple
                  value={updatedTask.mentions}
                  onChange={handleMentionsChange}
                  style={{ minHeight: 40, padding: 4, width: '100%' }}
                  disabled={allUsersLoading}
                >
                  {allUsers.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button onClick={handleSave}>Save</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

  