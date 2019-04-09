import React, {useContext} from 'react';
import MetaMaskContext from "../shared/metamask";


/**
 * The MetaMaskContext needs to be used within a functional component but we 
 * want to use it in a class component. As a workaround, embed this functional component
 * and set the context values
 */
const InjectWeb3 = (WrappedComponent) => {
    const { web3, accounts } = useContext(MetaMaskContext);
    return (<WrappedComponent web3={web3} accounts={accounts}/>)
}

export default InjectWeb3;