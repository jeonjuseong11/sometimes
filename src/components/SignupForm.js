import styled from "styled-components";
import { LoginBtn, LoginEle, LoginEleInput, LoginForm } from "../pages/Login";

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.75rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  opacity: ${(props) => (props.show ? 1 : 0)};
  max-height: ${(props) => (props.show ? "100px" : "0")};
  overflow: hidden;
  transition: opacity 0.5s, max-height 0.5s;
`;

const SignupForm = ({
  userId,
  password,
  name,
  email,
  formErrors,
  onUserIdChange,
  onPasswordChange,
  onNameChange,
  onEmailChange,
  onSubmit,
}) => {
  return (
    <LoginForm onSubmit={onSubmit}>
      <LoginEle>
        <LoginEleInput
          type="text"
          id="uid"
          value={userId}
          placeholder="아이디를 입력해주세요"
          onChange={onUserIdChange}
          hasError={formErrors.userId}
        />
      </LoginEle>
      <ErrorMessage show={formErrors.userId}>
        아이디는 영어와 숫자로만 구성되어야 합니다.
      </ErrorMessage>
      <LoginEle>
        <LoginEleInput
          type="password"
          id="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={onPasswordChange}
          hasError={formErrors.password}
        />
      </LoginEle>
      <ErrorMessage show={formErrors.password}>비밀번호를 입력해주세요.</ErrorMessage>
      <LoginEle>
        <LoginEleInput
          type="text"
          id="name"
          value={name}
          placeholder="이름를 입력해주세요"
          onChange={onNameChange}
          hasError={formErrors.name}
        />
      </LoginEle>
      <ErrorMessage show={formErrors.name}>이름을 입력해주세요</ErrorMessage>
      <LoginEle>
        <LoginEleInput
          type="email"
          id="email"
          value={email}
          placeholder="이메일을 입력해주세요"
          onChange={onEmailChange}
          hasError={formErrors.email}
        />
      </LoginEle>
      <ErrorMessage show={formErrors.email}>이메일을 입력해주세요</ErrorMessage>
      <LoginBtn style={{ marginTop: "0" }} type="submit">
        가입하기
      </LoginBtn>
    </LoginForm>
  );
};
export default SignupForm;
