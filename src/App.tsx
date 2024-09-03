import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { UsersView } from './components/users'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="dark min-h-screen w-screen bg-neutral-900 p-16 text-neutral-50">
        <UsersView />
      </main>

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
