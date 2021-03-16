import Chain from './components/Chain'
import Wallets from './components/Wallets'
import CreateTransactions from './components/CreateTransactions'
import { useSelector } from 'react-redux';
import ChainHelper from './helpers/chain.helper';

function App() {
  const { chain } = useSelector(state => state.blockchain)

  return (
    <div>
      <div className={`h-10 ${ChainHelper.isValidChain(chain) ? 'bg-green-500' : 'bg-red-500'}`}></div>
      <div className="max-w-7xl pt-5 mx-auto px-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <section className="md:col-span-2 xl:col-span-3">
            <Chain />
          </section>
          <div className="md:grid md:grid-cols-2 lg:grid-cols-1 gap-4 right-col">
            <section>
              <Wallets />
            </section>
            <section>
              <CreateTransactions />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
