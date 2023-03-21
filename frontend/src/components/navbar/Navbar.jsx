import React from "react";
import { Link } from "react-router-dom";

/**상단바 컴포넌트 */
import {
  Container,
  Logo,
  ServiceName,
  Title,
  RightMargin,
} from "components/navbar/NavbarStyle";
import NavbarLogo from "assets/image/navGirin.png";
import Sidebar from "components/sidebar/Sidebar";

const Navbar = () => {
  return (
    <Container>
      <Sidebar />
      <Link to="/">
        <Title>
          <Logo src={NavbarLogo} alt="NavbarLogo" />
          <ServiceName>내가 기린 그림</ServiceName>
        </Title>
      </Link>
      <RightMargin />
    </Container>
  );
};

export default Navbar;
