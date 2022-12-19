# 섹션4. Netflix앱 만들기 시작

## Axios 인스턴스 생성 및 요청 보내기

### Axios란?

> 브라우저, Node.js를 위한 **Promise API**를 활용하는 HTTP 비동기 통신 **라이브러리**
>
- `npm install axios --save`
- Axios **인스턴스화**를 하자
    - URL의 중복된 부분을 계속 입력하지 않도록
    - 뒷부분의 경로만 입력해주면 편하니깐
    1. 인스턴스를 생성할 **폴더 파일** 생성
        - `src/api/api.js`
        - `src/api/requests.js`