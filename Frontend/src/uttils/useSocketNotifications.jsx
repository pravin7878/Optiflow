import { useEffect } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { toaster } from "../components/ui/toaster";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;


export function useSocketNotifications() {
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    if (!user?.userId) return;

    const socket = io(BACKEND_URI);
    socket.emit("join", user.userId);

    socket.on("taskAssigned", (data) => {
      toaster.create({
        title: "Task Assigned",
        description: data.message,
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);
}