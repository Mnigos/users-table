import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'

import { UsersView } from './components/users'
import { rootStore } from './store'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={rootStore}>
        <main className="dark min-h-screen w-screen bg-neutral-900 p-16 text-neutral-50">
          <UsersView />
        </main>
      </Provider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
