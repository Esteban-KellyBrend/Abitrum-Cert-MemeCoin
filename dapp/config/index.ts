import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0xb71552387Ff234B71efb0f1225A3F2bb411535cf",
        abi as any,
        signer
    );
}