import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Post from "../../Components/Post/Post";
import LiveScore from "../../Components/LiveScore/LiveScore";
import AdContainer from "../../Components/AdContainer/AdContainer";
import LeftAdContainer from "../../Components/LeftAdContainer/LeftAdContainer";
import { FaFire, FaHome } from "react-icons/fa";
import axios from "axios";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  background: #171717;
  width: 100%;
  height: 70px;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  position: fixed;
  top: 0%;
  z-index: 99;
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 100%;
  margin-left: 15px;
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  font-size: 40px;
  color: #939393;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 250px;
  height: 100%;
`;

const LoginButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 60%;
  background: #292929;
  color: #c9c9c9;
  border-radius: 10px;
  margin-right: 15px;
  font-family: "Montserrat", sans-serif;
  font-weight: 900;

  &:hover {
    cursor: pointer;
    background: #424242;
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  /* background: #969696; */
  margin-top: 80px;
  justify-content: center;
  align-items: center;
  margin-right: 2222px;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  align-items: center;
  position: fixed;
  top: 0%;
  left: 11%;
  margin-top: 80px;
  z-index: 2;

  /* @media (max-width: 1520px) {
    position: relative;
    left: 0%;
    margin-top: 0px;
    margin-right: 75px;
  } */

  @media (max-width: 1850px) {
    position: fixed;
    top: 0%;
    left: 10%;
    bottom: 0%;
  }

  @media (max-width: 1800px) {
    position: fixed;
    top: 0%;
    left: 9%;
    bottom: 0%;
  }

  @media (max-width: 1750px) {
    position: fixed;
    top: 0%;
    left: 8%;
    bottom: 0%;
  }

  @media (max-width: 1700px) {
    position: fixed;
    top: 0%;
    left: 7%;
    bottom: 0%;
  }

  @media (max-width: 1650px) {
    position: fixed;
    top: 0%;
    left: 6%;
    bottom: 0%;
  }

  @media (max-width: 1600px) {
    position: fixed;
    top: 0%;
    left: 5%;
    bottom: 0%;
  }

  @media (max-width: 1550px) {
    position: fixed;
    top: 0%;
    left: 4%;
    bottom: 0%;
  }

  @media (max-width: 1500px) {
    position: fixed;
    top: 0%;
    left: 3%;
    bottom: 0%;
  }

  @media (max-width: 1450px) {
    position: fixed;
    top: 0%;
    left: 1%;
    bottom: 0%;
  }

  @media (max-width: 1400px) {
    position: fixed;
    top: 0%;
    left: -1%;
    bottom: 0%;
  }

  /* @media (max-width: 1350px) {
    display: none;
  } */
`;

const EnhancedButton = styled.div`
  display: flex;
  width: 300px;
  background: #424242;
  border-radius: 10px;
  height: 50px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  color: #fff;

  &:hover {
    cursor: pointer;
    background: #616161;
  }
`;

const Logo = styled.svg`
  width: 60px;
  height: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 820px;
  height: 100%;
  align-items: center;
  margin-right: 50px;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 100%;
  top: 0%;
  right: 11%;
  position: fixed;
  margin-top: 80px;
  align-items: center;
  z-index: 2;

  @media (max-width: 1850px) {
    position: fixed;
    top: 0%;
    right: 10%;
    bottom: 0%;
  }

  @media (max-width: 1800px) {
    position: fixed;
    top: 0%;
    right: 9%;
    bottom: 0%;
  }

  @media (max-width: 1750px) {
    position: fixed;
    top: 0%;
    right: 8%;
    bottom: 0%;
  }

  @media (max-width: 1700px) {
    position: fixed;
    top: 0%;
    right: 7%;
    bottom: 0%;
  }

  @media (max-width: 1650px) {
    position: fixed;
    top: 0%;
    right: 6%;
    bottom: 0%;
  }

  @media (max-width: 1600px) {
    position: fixed;
    top: 0%;
    right: 5%;
    bottom: 0%;
  }

  @media (max-width: 1550px) {
    position: fixed;
    top: 0%;
    right: 4%;
    bottom: 0%;
  }

  @media (max-width: 1500px) {
    position: fixed;
    top: 0%;
    right: 3%;
    bottom: 0%;
  }

  @media (max-width: 1450px) {
    position: fixed;
    top: 0%;
    right: 1%;
    bottom: 0%;
  }

  @media (max-width: 1400px) {
    position: fixed;
    top: 0%;
    right: -1%;
    bottom: 0%;
  }

  /* @media (max-width: 1350px) {
    display: none;
  } */
`;

export const Home = () => {
  const navigate = useNavigate();
  const [postsType, setPostsType] = React.useState(true);

  const changePostsTypeToFY = () => {
    setPostsType(false);
  };
  const changePostsTypeToPopular = () => {
    setPostsType(true);
  };
  const NavigateToLogin = () => {
    navigate("/login");
  };
  const NavigateToCms = () => {
    navigate("/cms");
  };

  const [popularPosts, setPopularPosts] = React.useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1234/posts")
      .then((res) => {
        setPopularPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  var token = localStorage.getItem("token");
  var decodedToken = jwt_decode(token);

  const isAdmin = () => {
    if (decodedToken.ismod === 1) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Header>
        <HeaderLogo>EPICGOALZ</HeaderLogo>
        <ButtonsContainer>
          {isAdmin() ? (
            <LoginButton onClick={NavigateToCms}>CMS</LoginButton>
          ) : null}
          <LoginButton onClick={NavigateToLogin}>Log in</LoginButton>
        </ButtonsContainer>
      </Header>
      <Container>
        <LeftSide>
          <EnhancedButton onClick={changePostsTypeToFY}>
            <Logo>
              <FaHome />
            </Logo>
            FOR YOU
          </EnhancedButton>
          <EnhancedButton onClick={changePostsTypeToPopular}>
            <Logo>
              <FaFire />
            </Logo>
            POPULAR
          </EnhancedButton>
          <LeftAdContainer />
        </LeftSide>
        <Content>
          {postsType ? (
            <>
              {popularPosts.map((post) => (
                <Post
                  key={post.id}
                  title={post.title}
                  content={post.content}
                  author={post.author}
                  date={post.time_date}
                  likes={post.likes}
                  category_name={post.category_name}
                  id={post.id}
                />
              ))}
            </>
          ) : (
            <h1>For you</h1>
          )}
        </Content>
        <RightSide>
          <LiveScore />
          <AdContainer />
        </RightSide>
      </Container>
    </>
  );
};
