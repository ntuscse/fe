import React from "react";
import { Box } from "@chakra-ui/react";
import { theme } from "../../config/theme";

type BoxOptionType = {
  active: boolean;
  // eslint-disable-next-line react/require-default-props
  disabled?: boolean;
  onClick: (param: any) => void;
};

export const BoxOption: React.FC<BoxOptionType> = (props) => {
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
      cursor={disabled ? "not-allowed" : "pointer"}
      border={`1px solid ${theme.colors.secondary[500]}`}
      color={active ? "#FFF" : theme.colors.secondary[500]}
      backgroundColor={active ? theme.colors.secondary[500] : "#FFF"}
      _active={{ color: "#FFF", backgroundColor: theme.colors.secondary[500] }}
    >
      {children}
    </Box>
  );
};
