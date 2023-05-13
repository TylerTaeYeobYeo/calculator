# 계산기

## 실행방법

아래 커맨드로 로컬에서 실행할 수 있습니다.

```shell
npm i
npm run dev
```

## 라이브러리

- Typescript
- Vite: 번들러

## 요구사항

![iOS 내장 계산기 이미지](https://user-images.githubusercontent.com/4952/179162840-5bea22c0-46d6-408e-9d21-f3240d096f34.jpeg)

- UI는 첨부 이미지를 참고하시면 됩니다(iOS 내장 계산기).
- 오른쪽 주황색 버튼을 이용하여 숫자에 대해 사칙연산을 합니다.
  - 숫자 : 정수, 실수(유리수).
- 상단 흰색 숫자 영역은 한 번에 한 가지 상태(state)의 숫자만 표시합니다.
  - -1 + 3 = 2
  - 이 경우, 화면에 표시되는 숫자는 -1 또는 3 또는 2이며, -1 + 3 가 함께 표시되지 않습니다.
- 상단 회색 버튼은 다음 동작입니다.
  - C : 진행 중인 계산 상태 초기화.
  - +/- : 입력할 숫자를 양수나 음수로 전환.
  - % : % 값으로 처리. 즉 `100` 으로 나눕니다.
- 지수 표기를 하지 않으며 값 그대로 표시합니다.
- C 버튼으로 상태를 하기 전에는 현 상태를 유지한 채 계산을 누진합니다.
- `=`를 눌러 계산 결과를 내면, 해당 계산의 계산식과 결과를 출력합니다.
  - 예를 들어, `-1 + 3 + 5 * 2 =`을 입력하면 `12`가 표시됩니다.
- 이외 구현에 필요한 정보(요구사항이나 제한, 제약 등)가 발생 시 대응 방안을 결정하고, 이에 대한 설명을 별첨하시면 됩니다.

## 요구사항에 없는 정의

### 1. 일반적인 계산기와는 다른 방법으로 동작합니다

아래의 요구사항을 보면, 일반적인 계산기와는 다른 방법으로 동작합니다.

```text
- `=`를 눌러 계산 결과를 내면, 해당 계산의 계산식과 결과를 출력합니다.
```

따라서, 입력되는 순서대로 계산하는 일반적인 계산기와는 다르게,
`=`를 누르는 순간 계산식을 계산하고, 결과를 출력합니다.

#### 예시

일반적인 계산기에서는  `-1 + 3 + 5 * 2 =`을 입력하면 `14`이 표시됩니다.
하지만, 이 계산기에서는 `*`를 먼저 계산하여, `-1 + 3 + 5 * 2 =`을 입력하면 `12`가 표시됩니다.
