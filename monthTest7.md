# 7차 월별 평가: 카운터 구현 및 트랜잭션 추적

## 목표

학생 여러분이 **Sepolia 퍼블릭 네트워크 상에서 트랜잭션이 생성 → 기록 → 조회되는 전체 흐름을 온전히 체화했는가**를 평가합니다.  
이를 위해 **Counter 스마트 컨트랙트**를 활용하여,  
Ganache에서의 로컬 실습을 거쳐 Sepolia 퍼블릭 네트워크까지 경험을 확장하는 과정을 수행합니다.

## 주의 사항

- 반드시 **Ganache → Sepolia**로 점진적으로 확장하는 구조를 따라야 합니다.
- 모든 트랜잭션은 **기록되고 증명**되어야 합니다. 세폴리아 네트워크 상호작용은 Etherscan에서 결과를 반드시 확인하세요.
- Gas의 의미, 트랜잭션 객체 구성, 퍼블릭 네트워크 상에서의 책임성까지 고민해보는 것이 중요합니다.

## 프로젝트 시작을 위한 준비

1. 필요한 라이브러리는 스스로 준비되어 있어야 합니다.
2. Ganache 네트워크에서 상호작용을 원한다면, RPC 서버는 항상 열려 있어야 합니다.
3. Sepolia RPC 연결을 위한 환경 변수를 점검하세요.
4. 폴더는 반드시 약속된 형태로 정리되어 있어야 합니다. (아래에 폴더 및 파일 제출 구조를 따르십시오.)

## 월별 평가 항목 (총 10개)

| 번호 | 항목                                                                            | 평가 방식                                                              | 비고               |
| :--- | :------------------------------------------------------------------------------ | :--------------------------------------------------------------------- | :----------------- |
| 1    | 초기 계정과 잔액을 눈으로 확인한다                                              | Ganache CLI or GUI에서 초기 계정 목록과 잔액 확인                      | 개념 체화          |
| 2    | Ganache에 Counter 컨트랙트 배포                                                 | `solc`로 컴파일 → ABI 및 Bytecode 추출 파일 저장                       | 실습 기반          |
| 3    | `Counter` 상태 변화 확인                                                        | Ganache 환경에서 `increment()` 호출 후 상태 변화 확인 (Node.js 실행)   | 실습 기반          |
| 4    | Sepolia 네트워크에서 최신 블록의 순번을 확인한다                                | Sepolia 네트워크 상 최신 블록 번호 조회                                | 네트워크 상태 확인 |
| 5    | Sepolia 네트워크에 트랜잭션 전파                                                | web3.js를 사용해 트랜잭션 전송 후 해시 확보                            | 핵심               |
| 6    | 트랜잭션을 보낼 때 필요한 'gas'는 단순한 수수료일까요?                          | gas의 의미를 여러 관점에서 고민하고, your_think_gas.md에 정리          | 트랜잭션 구조 체화 |
| 7    | 퍼블릭 네트워크 상 '요청'을 직접 설계하고 전송한다 (트랜잭션 객체 작성 및 전송) | nonce, gas, chainId를 포함한 트랜잭션 객체 작성 및 전송                | 트랜잭션 구조 체화 |
| 8    | 트랜잭션 해시 → Etherscan 조회                                                  | Tx 해시를 통해 Etherscan에서 트랜잭션 내역 확인                        | 체화 확인          |
| 9    | Sepolia 네트워크에서 `reset()` 함수를 호출하여 상태 변화를 확인한다             | `reset()` 호출 후 상태 변화 및 Etherscan에서 결과 확인                 | 상태 변화 체화     |
| 10   | 컨트랙트 Sepolia 배포 → 주소 및 배포 트랜잭션 확인                              | etherscan_links.txt 파일에 Contract Address 및 Deployment Tx 링크 작성 | 핵심               |

## 폴더 및 파일 제출 구조

```plaintext
04_evaluation_sepolia/
├── 01_contracts/
│   ├── Counter.sol
│   ├── 01_contracts_Counter_sol_Counter.abi
│   ├── 01_contracts_Counter_sol_Counter.bin
│
├── 02_ganache_test/
│   ├── deploy.js                # Ganache 배포 스크립트
│   └── call_set_increment.js    # Ganache에서 increment() 호출 스크립트
│
├── 03_sepolia_tx/
│   ├── deploy_to_sepolia.js      # Sepolia 배포 스크립트
│   ├── your_think_gas.md        # gas에 대한 본인 해석 정리 파일
│   └── etherscan_links.txt       # 배포된 Contract Address와 Deployment Tx 링크 기록
│
├── 04_explorer_ui/
│   └── index.html                # Explorer UI (Web3.js 기반)
```

# 세부 특이 사항

## 3번 `Counter` 상태 변화 확인

- Ganache에 배포한 `Counter` 컨트랙트의 `increment()` 함수를 Node.js로 실행하는 `call_set_increment.js` 파일을 작성합니다.
- **직접 Node.js로 스크립트를 실행해서 호출**하고, 상태 변화가 발생하는 것을 확인합니다.

## 6번 트랜잭션 gas 의미 해석

- 트랜잭션 객체를 구성하는 과정에서 'gas'가 어떤 의미를 가지는지 고민해봅니다.
- **your_think_gas.md** 파일을 작성하여,  
  다음 세 가지 관점(비용, 자원 소모, 책임)을 기반으로 여러분의 생각을 정리합니다.

## 10번 컨트랙트 Sepolia 배포 → 주소 및 트랜잭션 기록

- Sepolia 네트워크에 스마트 컨트랙트를 배포한 후,
- **etherscan_links.txt** 파일에 다음 두 가지를 동적으로 작성합니다.
  1. 배포된 **Contract Address 링크**
  2. 해당 **Deployment Transaction 링크**

**예시**

```plaintext
# Contract Address
https://sepolia.etherscan.io/address/0x68953b680543d8f97aa48c3bedf91abdcffaf6c7

# Deployment Transaction
https://sepolia.etherscan.io/tx/0xf54ce7bb7823adc11b2a07d3adbd959ae7eabf5756a43e45fc6f8d9015cbd8d3
```

## 제출 방법

- **GitHub 레포지토리에 업로드**합니다.
- 레포지토리 이름: **250428_monthTest7**
- 전체 폴더 구조와 파일들을 그대로 제출해야 하며,  
  평가 항목별로 작업을 정확히 구분해서 제출하세요.
