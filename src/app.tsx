import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'

import { UsersView } from './components/users'
import { rootStore } from './store'
import { Footer } from './components/footer'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={rootStore}>
        <div className="max-w-screen dark flex min-h-screen flex-col justify-between bg-neutral-900 text-neutral-50">
          <main className="p-2 md:p-4 lg:p-8 xl:p-16">
            <UsersView />
          </main>

          <Footer />
        </div>
      </Provider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
