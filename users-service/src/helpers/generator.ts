import { randomBytes } from 'crypto';

export class Generator {
  private getRandomInt(min: number, max: number) {
    const randomBuffer = randomBytes(4);
    const randomInt = randomBuffer.readUInt32BE(0);
    return min + (randomInt % (max - min + 1));
  }

  private randomNumber() {
    const randomNumberString = Math.floor(
      this.getRandomInt(10000, 90000),
    ).toString();
    return randomNumberString;
  }

  private generateBankCode(): string {
    const bankCode = this.getRandomInt(100, 999).toString();
    return bankCode;
  }

  private generateBranchCode(): string {
    const branchCode = this.getRandomInt(10, 99).toString();
    return branchCode;
  }

  accountNumber(): string {
    const bankCode = this.generateBankCode();
    const branchCode = this.generateBranchCode();
    const randomNumber = this.randomNumber();

    const accountNumber = `${bankCode}${branchCode}${randomNumber}`;
    return accountNumber;
  }
}
