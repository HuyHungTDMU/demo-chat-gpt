import {useState} from "react";

interface Props {
    onSubmit: (text: string) => void;
    isLoading?: boolean
}

export const NewMessageForm = ({onSubmit, isLoading = false}: Props) => {
    const [body, setBody] = useState("");

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                if (body) {
                    onSubmit(body)
                    setBody("");
                }
            }}
            className="flex items-center space-x-3"
        >
            <input
                autoFocus
                id="message"
                name="message"
                placeholder="Write a message..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="flex-1 h-12 px-3 rounded-2xl bg-amber-600 text-white placeholder-white"
            />
            <button
                type="submit"
                className="bg-teal-600 rounded-2xl h-12 font-medium text-white w-24 text-lg border border-transparent hover:bg-teal-800 transition"
                disabled={!body || isLoading}
            >
                Send
            </button>
        </form>
    );
};