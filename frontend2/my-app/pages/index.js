import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/NavBar'
import { getPrice, addTeamAddress, addContractAddress, removeContractAddress ,
  setTokenPrice, isBuyEnabled, enablePurchases, batchMinting, redeem, disablePurchases, fundWalletForRedemption, drainWallet} from "../init";

export default function Home() {

  return (
    
    <div style={{
      backgroundColor: 'grey'}} className={styles.container}>
      <main className={styles.main}>
      <Navbar/>
        <h1 className={styles.title}>
        Testing Interaction
        </h1>
        {/* <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p> */}

        <div >
          
          <div className={styles.card}>
          {/* <label for="first">Private Key: </label>
          <input className={styles.grid} type="text" id="first" name="first" /> */}
          <label for="last"> Team Address: </label>
          <input className={styles.grid} type="text" id="last" name="last" />
          <button  onClick={addTeamAddress}> Adding Team Address </button>
          <div id="addTeamAddress"> </div>
          </div>

          <div className={styles.card}>
          {/* <label for="PkContractAddContractAddress">Private Key: </label>
          <input className={styles.grid} type="text" id="PkContractAddContractAddress" name="first" /> */}
          <label for="AddContractAddress"> Contract Address: </label>
          <input className={styles.grid} type="text" id="AddContractAddress" name="last" />
          <button onClick={addContractAddress}> Adding Controller Contract Address </button>
          <div id="addContractAddress"> </div>
          <div id="addContractAddressFunc"> </div>
          </div>


          <div className={styles.card}>
          {/* <label for="PkContractRemoveContractAddress">Private Key: </label>
          <input className={styles.grid} type="text" id="PkContractRemoveContractAddress" name="first" /> */}
          <label for="ContractAddressRemoveContractAddress"> Contract Address: </label>
          <input className={styles.grid} type="text" id="ContractAddressRemoveContractAddress" name="last" />
          <button onClick={removeContractAddress}> Removing Controller Contract Address </button>
          <div id="removeContractAddress"> </div>
          <div id="removeContractAddressFunc"> </div>
          </div>

          <div className={styles.card}>
          {/* <label for="PkContractSetTokenPrice">Private Key: </label>
          <input className={styles.grid} type="text" id="PkContractSetTokenPrice" name="first" /> */}
          <label for="setNewTokenPrice"> New Token Price: </label>
          <input className={styles.grid} type="number" id="setNewTokenPrice" name="last" />
          <button onClick={setTokenPrice}> Set New Token Price </button>
          <div id="showSetNewTokenPrice"> </div>
          <div id="setNewTokenPriceFunc"> </div>
          </div>

          <div className={styles.card}>
          <button onClick={isBuyEnabled}> Is Buying Feature Enabled </button>
          <div id="isBuyEnabled"></div>
          <div id="isBuyEnabledFunc"> </div>
        </div>

        <div className={styles.card}>
          {/* <label for="PkContractEnablePurchases">Private Key: </label>
          <input className={styles.grid} type="text" id="PkContractEnablePurchases" name="first" /> */}
          <button onClick={enablePurchases}> Enable Purchase of tokens </button>
          <div id="enablePurchases"> </div>
          <div id="enablePurchasesFunc"> </div>
          </div>

          <div className={styles.card}>
          {/* <label for="PkContractDisablePurchases">Private Key: </label>
          <input className={styles.grid} type="text" id="PkContractDisablePurchases" name="first" /> */}
          <button onClick={disablePurchases}> Disable Purchase of tokens </button>
          <div id="disablePurchases"> </div>
          <div id="disablePurchasesFunc"> </div>
          </div>


          <div className={styles.card}>
          <label for="PkTeambatchMinting">Team Private Key: </label>
          <input className={styles.grid} type="text" id="PkTeambatchMinting" name="first" />
          <label for="AddressWalletsBatchMinting">Batch Wallet Addresses: </label>
          <input className={styles.grid} type="text" id="AddressWalletsBatchMinting" name="first" />
          <label for="TokenValuesBatchMinting">Token Values: </label>
          <input className={styles.grid} type="text" id="TokenValuesBatchMinting" name="first" />
          <button onClick={batchMinting}> Batch Minting </button>
          <div id="batchMinting"> </div>
          <div id="batchMintingFunc"> </div>
          </div>

          <div className={styles.card}>
          <label for="PkfundWalletForRedemption">Funder Wallet Private Key: </label>
          <input className={styles.grid} type="text" id="PkfundWalletForRedemption" name="first" />
          <label for="addressWalletFunds">Wallet Address: </label>
          <input className={styles.grid} type="text" id="addressWalletFunds" name="first" />
          <label for="AmountToFund">Amount To Fund: </label>
          <input type="text" id="AmountToFund" name="first" />
          <button onClick={fundWalletForRedemption}> Fund Wallets </button>
          <div id="fundWalletForRedemption"> </div>
          <div id="fundWalletForRedemptionFunc"> </div>
          </div>

          <div className={styles.card}>
          <label for="PkRedeemtokens">Wallet Private Key: </label>
          <input className={styles.grid} type="text" id="PkRedeemtokens" name="first" />
          <label for="addressWalletRedeem">Wallet Address: </label>
          <input className={styles.grid} type="text" id="addressWalletRedeem" name="first" />
          <label for="AmountofRedeem">Redeem amount: </label>
          <input type="text" id="AmountofRedeem" name="first" />
          <button onClick={redeem}> Redeem Tokens</button>
          <div id="redeemAmount"> </div>
          <div id="redeemAmountFunc"> </div>
          </div>

          <div className={styles.card}>
          <label for="PkofTargetAddresses">Target Wallet Private Keys: </label>
          <input className={styles.grid} type="text" id="PkofTargetAddresses" name="first" />
          <label for="recieverAddress">Reciever Address: </label>
          <input className={styles.grid} type="text" id="recieverAddress" name="first" />
          <button onClick={drainWallet}> Emergency Drain Wallets </button>
          <div id="WalletDrained"> </div>
          <div id="WalletDrainedFunc"> </div>
          </div>
          

          {/* <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a> */}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
