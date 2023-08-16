import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupForm from "../components/SignupForm";
import { LoginWrapper } from "./Login";
import { AiOutlineClose } from "react-icons/ai";
const Signup = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [focusInputId, setFocusInputId] = useState("");
  const [formErrors, setFormErrors] = useState({
    userId: false,
    password: false,
    name: false,
    email: false,
  });

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [userInfo, navigate]);

  const isValidUserId = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]*$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!isValidUserId.test(userId)) {
      errors.userId = true;
    }

    if (!userId || !password || !name || !email) {
      errors.userId = !userId;
      errors.password = !password;
      errors.name = !name;
      errors.email = !email;
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);

      if (errors.userId) {
        alert("아이디는 영어와 숫자로만 구성되어야 합니다.");
        setFocusInputId("uid");
      } else if (errors.password) {
        alert("비밀번호를 입력해주세요.");
        setFocusInputId("password");
      } else if (errors.name) {
        alert("이름을 입력해주세요.");
        setFocusInputId("name");
      } else if (errors.email) {
        alert("이메일을 입력해주세요.");
        setFocusInputId("email");
      }
      return;
    }

    setFormErrors({});

    const payload = {
      uid: userId,
      pass: password,
      name: name,
      email: email,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/user/join", payload);

      if (response.status === 200) {
        alert("회원가입 성공!");
        navigate("/");
      } else {
        alert("회원가입 실패...");
      }

      setUserId("");
      setPassword("");
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error: ", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <LoginWrapper>
      <div style={{ display: "flex" }}>
        <h1 style={{ margin: "0" }}>회원가입</h1>
        <Link
          to="/home"
          style={{
            textDecoration: "none",
            color: "black",
            position: "absolute",
            right: "10px",
            top: "10px",
            fontSize: "2rem",
          }}
        >
          <AiOutlineClose />
        </Link>
      </div>
      <p>빠르고 쉽게 가입할 수 있습니다.</p>
      <SignupForm
        userId={userId}
        password={password}
        name={name}
        email={email}
        formErrors={formErrors}
        onUserIdChange={(e) => setUserId(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onNameChange={(e) => setName(e.target.value)}
        onEmailChange={(e) => setEmail(e.target.value)}
        onSubmit={handleSubmit}
      />
    </LoginWrapper>
  );
};

export default Signup;
