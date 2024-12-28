// "use client";

// import { ReactNode, useMemo } from "react";
// import {
//   ConnectionProvider,
//   WalletProvider,
// } from "@solana/wallet-adapter-react";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
// import { clusterApiUrl } from "@solana/web3.js";

// import "@solana/wallet-adapter-react-ui/styles.css";

// import { WalletConnectWalletAdapter } from "@walletconnect/solana-adapter";

// const SolanaContext = ({ children }: { children: ReactNode }) => {
//   const endpoint = useMemo(
//     () => clusterApiUrl(WalletAdapterNetwork.Mainnet),
//     []
//   );

//   const wallets = useMemo(
//     () => [
//       new WalletConnectWalletAdapter({
//         network: WalletAdapterNetwork.Mainnet,
//         options: {
//           projectId: process.env.NEXT_PUBLIC_WALLET_ID,
//         },
//       }),
//     ],
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     []
//   );

//   return (
//     <ConnectionProvider endpoint={endpoint}>
//       <WalletProvider wallets={wallets} autoConnect>
//         <WalletModalProvider>{children}</WalletModalProvider>
//       </WalletProvider>
//     </ConnectionProvider>
//   );
// };

// export default SolanaContext;
