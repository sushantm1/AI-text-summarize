"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function summarizeText(text: string): Promise<string> {
  try {
    const { text: summary } = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt: `
        Summarize the following text in a concise way, preserving the key points and main ideas.
        Make the summary approximately 25% of the original length.
        
        Text to summarize:
        ${text}
      `,
      maxTokens: 500,
    })

    return summary.trim()
  } catch (error) {
    console.error("Error in summarizeText:", error)
    return "Sorry, there was an error generating the summary. Please try again."
  }
}

