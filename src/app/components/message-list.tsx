import {Message, MessageType} from './message'

interface Props {
    data: MessageType[];
}

export const MessageList = ({data}: Props) => {
    return (
        <div className="flex flex-col w-full space-y-3 overflow-y-scroll no-scrollbar">
            {data?.map((message, index) => (
                <Message key={index} message={message}/>
            ))}
        </div>
    );
};
