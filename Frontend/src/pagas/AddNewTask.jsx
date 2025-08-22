import React, { useState, useEffect } from "react";
import {
  Button,
  Center,
  Field,
  Fieldset,
  Input,
  NativeSelect,
  Textarea,
  Text,
  VStack,
} from "@chakra-ui/react";
import { toaster } from "../components/ui/toaster"
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../app/actions/task";
import { fetchAllUsers } from "../app/actions/user";
import { Link, useNavigate } from "react-router-dom";
import MentionsInputChakra from '../components/custom/MentionsInputChakra';
import { AiOutlineArrowLeft } from "react-icons/ai";

const AddNewTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.tasks);
  const { allUsers } = useSelector((state) => state.user);
  const [errors, setErrors] = useState({});
  const [mentions, setMentions] = useState([]);
  const [taskData, setTaskData] = useState({
    title: "",
    priority: "low",
    description: "",
    tags: ""
  });

  console.log(useSelector((state) => state.tasks))
  console.log("allUsers", allUsers);



  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!taskData.title.trim()) newErrors.title = "Title is required";
    if (!taskData.description.trim()) newErrors.description = "Description is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Prepare data for MentionsInputChakra
  const handleMentionsChange = (newMentions) => {
    setMentions(newMentions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateErrors = validate();
    console.log(validateErrors)
    setErrors(validateErrors);

    if (errors && Object.keys(validateErrors).length === 0) {
      const submitData = {
        ...taskData,
        tags: taskData.tags
          ? taskData.tags.split(',').map(t => t.trim()).filter(Boolean)
          : [],
        mentions: mentions.map(u => u._id),
      };
      console.log(submitData)
      const result = await dispatch(addTask(submitData));
      console.log(result)
      if (result.meta.requestStatus === "fulfilled") {
        toaster.create({
          title: "Task added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        navigate("/tasks");
      }
    }
  };

  return (<>
    <div
      className='flex justify-end py-3'
    >
      <Link to={"/tasks"}>
        <Button fontWeight={"bold"} mb={4}>
          <AiOutlineArrowLeft />
          View Tasks
        </Button>
      </Link>
    </div>

    <Center w={{ base: "full", md: "80%" }} m={"auto"}>
      <Fieldset.Root size="md" as="form" onSubmit={handleSubmit}>
        <Fieldset.Legend>Task details</Fieldset.Legend>

        {error && <Text color="red.500">{error?.message}</Text>}

        {errors && Object.keys(errors).length > 0 && (
          Object.values(errors).map((err, index) => (
            <Text color="red.500" key={index}>{err}</Text>
          ))
        )}
        <Field.Root>
          <Field.Label>Title</Field.Label>
          <Input name="title" value={taskData.title} onChange={handleChange} />
        </Field.Root>

        <Field.Root>
          <Field.Label>Priority</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field
              name="priority"
              value={taskData.priority}
              onChange={handleChange}
            >
              {["low", "medium", "high"].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        <Field.Root>
          <Field.Label>Description</Field.Label>
          <Textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Tags (comma separated)</Field.Label>
          <Input
            name="tags"
            value={taskData.tags}
            onChange={handleChange}
            placeholder="e.g. work, urgent, personal"
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Enter UserName to Mentions</Field.Label>
          <MentionsInputChakra
            users={allUsers}
            value={mentions}
            onChange={handleMentionsChange}
            placeholder="Type @ to mention users"
          />
        </Field.Root>


        <Button
          type="submit"
          alignSelf="flex-start"
          loading={loading}
          loadingText="Adding..."
          onClick={handleSubmit}
        >
          ADD TASK
        </Button>
      </Fieldset.Root>
    </Center>
  </>);
};

export default AddNewTask;