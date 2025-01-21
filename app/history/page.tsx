// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/router'
// import { createClient } from '@supabase/supabase-js'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { useAuth } from '@/context/auth-context'
// import { toast } from 'sonner'

// // Initialize Supabase client
// const supabaseUrl = 'https://mdrrqtjreosxokhqrgbc.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY!
// const supabase = createClient(supabaseUrl, supabaseKey)

// export default function HistoryPage() {
//   const [prompt, setPrompt] = useState('')
//   const [result, setResult] = useState('')
//   const { user } = useAuth()
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       const { data, error } = await supabase
//         .from('linkedin-history')
//         .insert([
//           { user_id: user?.uid, prompt, result, timestamp: new Date() },
//         ])

//       if (error) throw error
//       toast.success('History saved successfully!')
//       setPrompt('')
//       setResult('')
//     } catch (error) {
//       if (error instanceof Error) {
//         toast.error(error.message)
//       } else {
//         toast.error('An error occurred')
//       }
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle>Save Prompt and Result</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Input
//                 type="text"
//                 placeholder="Prompt"
//                 value={prompt}
//                 onChange={(e) => setPrompt(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <Input
//                 type="text"
//                 placeholder="Result"
//                 value={result}
//                 onChange={(e) => setResult(e.target.value)}
//                 required
//               />
//             </div>
//             <Button type="submit" className="w-full">
//               Save
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }