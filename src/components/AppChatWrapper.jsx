import React from "react";
import { GiftedChat } from "react-native-gifted-chat";

const AppChatWrapper = ({
  messages = [],
  onSend = () => {},
  user = {},
  ...props
}) => {
  return (
    <GiftedChat messages={messages} onSend={onSend} user={user} {...props} />
  );
};

export default AppChatWrapper;
