import { Summarizer } from "@/components/summarizer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl mb-4">
              AI Text Summarizer
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Transform lengthy content into concise, meaningful summaries with the power of AI.
            </p>
          </div>

          <Summarizer />
        </div>
      </div>
    </div>
  )
}

