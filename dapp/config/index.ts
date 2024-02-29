import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0x0B7D6324E52e254C2C04AF3387F7cCB2ad8bEEB6",
        abi as any,
        signer
    );
}