import logo from './logo.svg';
import './App.css';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Basic from './components/Form';


function App() {
  return (
    <div className="App">
      <main className="">
        <div className="flex flex-col">
          <div className="flex p-4 justify-between ">
            <div className="w-1/2">Lets Do Something New</div>
            <div className="">
              {" "}
              <ConnectButton />
            </div>
          </div>
          <div>

          </div>
          <pre>
            <Basic />
            {/* {erc20.print()} */}
          </pre>
        </div>
      </main>
    </div>
  );
}

export default App;
