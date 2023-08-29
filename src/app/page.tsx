'use client';

import {MessageList} from "@/app/components/message-list";
import {NewMessageForm} from "@/app/components/new-message-form";
import {useState} from "react";
import {MessageType} from "@/app/components/message";
import {Loading} from "@/app/components/loading";


export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<MessageType[]>([]);

    async function processMessageToChatGPT(chatMessages: MessageType[]) { // messages is an array of messages
        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";

            if (messageObject.isChatGPT) {
                role = "assistant";
            } else {
                role = "user";
            }

            return {role: role, content: messageObject.body};
        });

        const res = await fetch("http://localhost:3000/api/open-ai", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(apiMessages),
        });

        const result = await res.json()

        setData([...chatMessages, {
            body: result.data.message,
            isChatGPT: true
        }]);
    }

    const handleSend = async (text: string) => {
        setIsLoading(true);
        const newMessages = [...data, {body: text, isChatGPT: false}];
        setData(newMessages);
        await processMessageToChatGPT(newMessages);
        setIsLoading(false);
    }

    return (
        <div className="flex flex-col bg-white h-screen justify-between">
            <div className="flex-1 h-full overflow-y-scroll no-scrollbar p-6">
                <div className="max-w-4xl mx-auto flex flex-col gap-4">
                    <h1 className='text-teal-600 text-center text-xl font-bold border-b pb-3'>Demo Chat GPT</h1>

                    <div className="flex justify-between items-center">
                        <MessageList data={data}/>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                {isLoading && <Loading/>}

                <div className="p-6 bg-white/5 border-t">
                    <div className="max-w-4xl mx-auto">
                        <NewMessageForm isLoading={isLoading} onSubmit={handleSend}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
