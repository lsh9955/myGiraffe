import React from "react";
/**상단바 컴포넌트 */
import { Container, Logo, ServiceName } from "components/navbar/NavbarStyle";
import NavbarLogo from "assets/image/navGirin.png";

const Navbar = () => {
  return (
    <Container>
      <Logo src={NavbarLogo} alt="NavbarLogo" />
      <ServiceName>내가 기린 그림</ServiceName>
    </Container>
  );
};

export default Navbar;
