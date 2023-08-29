import {NextResponse} from "next/server";

const systemMessage = {
    "role": "system",
    "content": "Explain things like you're talking to a software professional with 2 years of experience."
}

export async function POST(request: Request) {
    const json = await request.json();

    const apiRequestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [
            systemMessage,  // The system message DEFINES the logic of our chatGPT
            ...json // The messages from our chat with ChatGPT
        ]
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions",
        {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
        return data.json();
    })

    let json_response = {
        data: {
            message: res.choices[0].message.content,
            sender: "ChatGPT"
        },
    };

    return NextResponse.json(json_response);
}
