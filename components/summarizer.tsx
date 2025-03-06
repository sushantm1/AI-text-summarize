"use client"

import type React from "react"

import { useState } from "react"
import { Bot, Copy, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { summarizeText } from "@/app/actions"

export function Summarizer() {
  const [text, setText] = useState("")
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    setLoading(true)
    try {
      const result = await summarizeText(text)
      setSummary(result)
    } catch (error) {
      console.error("Error summarizing text:", error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="Paste your text here (minimum 100 characters for best results)"
          className="min-h-[200px] p-4 text-base"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={loading || text.length < 50} className="px-6">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Summarizing...
              </>
            ) : (
              "Summarize"
            )}
          </Button>
        </div>
      </form>

      {summary && (
        <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <div className="prose dark:prose-invert">
                  <p>{summary}</p>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" className="text-xs" onClick={copyToClipboard}>
                    <Copy className="mr-2 h-3 w-3" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

