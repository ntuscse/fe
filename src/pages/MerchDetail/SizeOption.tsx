import React from "react";
import { Box } from "@chakra-ui/react";

type SizeOptionType = {
  active: boolean;
  disabled?: boolean;
  onClick: (param: any) => void;
};

export const SizeOption: React.FC<SizeOptionType> = (props) => {
  const { active = false, disabled = false, onClick, children } = props;
  return (
    <Box
      display="inline-block"
      userSelect="none"
      width="40px"
      height="40px"
      textAlign="center"
      onClick={onClick}
      fontWeight={500}
      lineHeight={10}
      opacity={disabled ? 0.4 : 1}
      pointerEvents={disabled ? "none" : "all"}
      cursor={disabled ? "not-allowed" : "pointer"}
      borderWidth={1}
      borderColor="secondary.400"
      color={active ? "#FFF" : "secondary.400"}
      backgroundColor={active ? "red.600" : "#FFF"}
      _active={{ color: "#FFF", backgroundColor: "secondary.500" }}
    >
      {children}
    </Box>
  );
};