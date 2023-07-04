import { BigNumber } from 'ethers'
import { ethers } from 'hardhat'
import { MockTimeBonsaiswapV3Pool } from '../../typechain/MockTimeBonsaiswapV3Pool'
import { TestERC20 } from '../../typechain/TestERC20'
import { BonsaiswapV3Factory } from '../../typechain/BonsaiswapV3Factory'
import { TestBonsaiswapV3Callee } from '../../typechain/TestBonsaiswapV3Callee'
import { TestBonsaiswapV3Router } from '../../typechain/TestBonsaiswapV3Router'
import { MockTimeBonsaiswapV3PoolDeployer } from '../../typechain/MockTimeBonsaiswapV3PoolDeployer'

import { Fixture } from 'ethereum-waffle'

interface FactoryFixture {
  factory: BonsaiswapV3Factory
}

async function factoryFixture(): Promise<FactoryFixture> {
  const factoryFactory = await ethers.getContractFactory('BonsaiswapV3Factory')
  const factory = (await factoryFactory.deploy()) as BonsaiswapV3Factory
  return { factory }
}

interface TokensFixture {
  token0: TestERC20
  token1: TestERC20
  token2: TestERC20
}

async function tokensFixture(): Promise<TokensFixture> {
  const tokenFactory = await ethers.getContractFactory('TestERC20')
  const tokenA = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenB = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenC = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20

  const [token0, token1, token2] = [tokenA, tokenB, tokenC].sort((tokenA, tokenB) =>
    tokenA.address.toLowerCase() < tokenB.address.toLowerCase() ? -1 : 1
  )

  return { token0, token1, token2 }
}

type TokensAndFactoryFixture = FactoryFixture & TokensFixture

interface PoolFixture extends TokensAndFactoryFixture {
  swapTargetCallee: TestBonsaiswapV3Callee
  swapTargetRouter: TestBonsaiswapV3Router
  createPool(
    fee: number,
    tickSpacing: number,
    firstToken?: TestERC20,
    secondToken?: TestERC20
  ): Promise<MockTimeBonsaiswapV3Pool>
}

// Monday, October 5, 2020 9:00:00 AM GMT-05:00
export const TEST_POOL_START_TIME = 1601906400

export const poolFixture: Fixture<PoolFixture> = async function (): Promise<PoolFixture> {
  const { factory } = await factoryFixture()
  const { token0, token1, token2 } = await tokensFixture()

  const MockTimeBonsaiswapV3PoolDeployerFactory = await ethers.getContractFactory('MockTimeBonsaiswapV3PoolDeployer')
  const MockTimeBonsaiswapV3PoolFactory = await ethers.getContractFactory('MockTimeBonsaiswapV3Pool')

  const calleeContractFactory = await ethers.getContractFactory('TestBonsaiswapV3Callee')
  const routerContractFactory = await ethers.getContractFactory('TestBonsaiswapV3Router')

  const swapTargetCallee = (await calleeContractFactory.deploy()) as TestBonsaiswapV3Callee
  const swapTargetRouter = (await routerContractFactory.deploy()) as TestBonsaiswapV3Router

  return {
    token0,
    token1,
    token2,
    factory,
    swapTargetCallee,
    swapTargetRouter,
    createPool: async (fee, tickSpacing, firstToken = token0, secondToken = token1) => {
      const mockTimePoolDeployer =
        (await MockTimeBonsaiswapV3PoolDeployerFactory.deploy()) as MockTimeBonsaiswapV3PoolDeployer
      const tx = await mockTimePoolDeployer.deploy(
        factory.address,
        firstToken.address,
        secondToken.address,
        fee,
        tickSpacing
      )

      const receipt = await tx.wait()
      const poolAddress = receipt.events?.[0].args?.pool as string
      return MockTimeBonsaiswapV3PoolFactory.attach(poolAddress) as MockTimeBonsaiswapV3Pool
    },
  }
}
