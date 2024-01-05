import { CurrencyAmount, Percent, Token, TradeType } from "@uniswap/sdk-core";
import { AlphaRouter } from "@uniswap/smart-order-router";
import { BigNumber, ethers } from "ethers";

const V3_SWAP_ROUTER_ADDRESS = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";

const chainId = 1;

const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-mainnet.g.alchemy.com/v2/ikWCa20Rp63UZiGfHtwXzfd6UT5bFA43"
);

const router = new AlphaRouter({ chainId: chainId, provider: provider });

const name0 = "WETH";
const symbol0 = "WETH";
const decimals0 = 18;
const address0 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

const name1 = "DAI";
const symbol1 = "DAI";
const decimals1 = 18;
const address1 = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

const WETH = new Token(chainId, address0, decimals0, symbol0, name0);
const DAI = new Token(chainId, address1, decimals1, symbol1, name1);

export const swapUpdatePrice = async ({
  inputAmount,
  slippageAmount,
  deadline,
  walletAddress,
}: {
  inputAmount: any;
  slippageAmount: any;
  deadline: number;
  walletAddress: string;
}) => {
  const percentSlippage = new Percent(slippageAmount, 100);
  const wei: any = ethers.utils.parseUnits(inputAmount.toString(), decimals0);

  const currencyAmount = CurrencyAmount.fromRawAmount(WETH, BigNumber.from(wei) as any);

  const SwapOptionsSwapRouter02: any = {
    recipient: walletAddress,
    slippageTolerance: percentSlippage,
    deadline: deadline,
  };
  const route = await router.route(currencyAmount, DAI, TradeType.EXACT_INPUT, SwapOptionsSwapRouter02);

  const transaction = {
    data: route.methodParameters.calldata,
    to: V3_SWAP_ROUTER_ADDRESS,
    value: BigNumber.from(route.methodParameters.value),
    from: walletAddress,
    gasPrice: BigNumber.from(route.gasPriceWei),
    gasLimit: ethers.utils.hexlify(35000),
  };

  const quoteAmountOut: any = route.quote.toFixed(6);
  const ratio = (inputAmount / quoteAmountOut).toFixed(3);

  console.log({ quoteAmountOut, ratio });

  return [transaction, quoteAmountOut, ratio];
};
