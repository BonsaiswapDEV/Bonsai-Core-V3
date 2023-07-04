# Bonsaiswap V3

This repository contains the core smart contracts for the Bonsaiswap V3 Protocol.

## Local deployment

In order to deploy this code to a local testnet, you should install the npm package
`@bonsaiswap/v3-core`
and import the factory bytecode located at
`@bonsaiswap/v3-core/artifacts/contracts/BonsaiswapV3Factory.sol/BonsaiswapV3Factory.json`.
For example:

```typescript
import {
  abi as FACTORY_ABI,
  bytecode as FACTORY_BYTECODE,
} from '@bonsaiswap/v3-core/artifacts/contracts/BonsaiswapV3Factory.sol/BonsaiswapV3Factory.json'

// deploy the bytecode
```

This will ensure that you are testing against the same bytecode that is deployed to
mainnet and public testnets, and all Bonsaiswap code will correctly interoperate with
your local deployment.

## Using solidity interfaces

The Bonsaiswap v3 interfaces are available for import into solidity smart contracts
via the npm artifact `@bonsaiswap/v3-core`, e.g.:

```solidity
import '@bonasiswap/v3-core/contracts/interfaces/IBonsaiswapV3Pool.sol';

contract MyContract {
  IBonsaiswapV3Pool pool;

  function doSomethingWithPool() {
    // pool.swap(...);
  }
}

```
