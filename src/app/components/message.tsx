export type MessageType = {
    body: string;
    isChatGPT: boolean;
};

interface Props {
    message: MessageType;
}

export const Message = ({message}: Props) => {
    return (
        <div
            className={`flex flex-col relative space-x-1 space-y-1 ${
                message.isChatGPT ? "text-left" : "text-right"
            }`}
        >
            <div
                className={`flex relative space-x-1 ${
                    message.isChatGPT
                        ? "flex-row" : "flex-row-reverse space-x-reverse"

                }`}
            >
                <div className="w-12 h-12 overflow-hidden flex-shrink-0 rounded">
                        <span
                            className='h-12 w-12 bg-amber-600'
                        />
                </div>
                <span
                    className={`inline-flex rounded-2xl space-x-2 items-start p-3 text-white ${
                        message.isChatGPT
                            ? "bg-teal-600" : "bg-amber-600"
                    } `}
                >
                    <span className="font-semibold">{message.isChatGPT ? 'ChatGPT' : 'You'}:&nbsp;</span>
                    <span className="max-w-sm">{message.body}</span>
                </span>
            </div>
        </div>
    );
};