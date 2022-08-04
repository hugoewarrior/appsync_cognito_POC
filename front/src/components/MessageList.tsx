import { ChatFeed, Message } from "react-chat-ui";


interface IMessageListProps {
    messages: any[]
    username: string
}
export const MessagesList = (props: IMessageListProps) => {
    const { messages, username } = props;

    return (
        <ChatFeed
            maxHeight={window.innerHeight - 80}
            messages={messages.map(
                msg =>
                    new Message({
                        id: msg.handle === username ? 0 : msg.messageId,
                        senderName: msg.handle,
                        message:`${msg.handle}, wrote: "${msg.body}"`,
                    }),
            )}
            isTyping={false}
            showSenderName
            bubblesCentered={false}
        />
    )
};