import React from "react";
/**상단바 컴포넌트 */
import {
  Container,
  Logo,
  ServiceName,
  Title,
  RightMargin,
} from "components/navbar/NavbarStyle";
import NavbarLogo from "assets/image/navGirin.png";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import Sidebar from "components/sidebar/Sidebar";

const Navbar = () => {
  return (
    <Container>
      <Sidebar />
      <Title>
        <Logo src={NavbarLogo} alt="NavbarLogo" />
        <ServiceName>내가 기린 그림</ServiceName>
      </Title>
      <RightMargin />
    </Container>
  );
};

export default Navbar;
