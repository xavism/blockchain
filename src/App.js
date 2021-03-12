import Chain from './components/Chain'
import Wallets from './components/Wallets'
import CreateTransactions from './components/CreateTransactions'

function App() {
  return (
    <div className="container pt-10 mx-auto px-4">
      <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4">
        <section className="md:col-span-2 xl:col-span-3">
          <Chain />
        </section>
        <div>
        <section>
          <Wallets />
        </section>
        <section>
          <CreateTransactions />
        </section>
        </div>
      </div>
    </div>
  );
}

export default App;
