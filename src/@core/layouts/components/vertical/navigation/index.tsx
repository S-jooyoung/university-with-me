// ** React Import
import { ReactNode, useRef, useState } from "react";

// ** MUI Import
import List from "@mui/material/List";
import Box, { BoxProps } from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";

// ** Third Party Components
import PerfectScrollbar from "react-perfect-scrollbar";

// ** Type Import
import { Settings } from "src/@core/context/settingsContext";
import { VerticalNavItemsType } from "src/@core/layouts/types";

// ** Component Imports
import Drawer from "./Drawer";
import VerticalNavItems from "./VerticalNavItems";
import VerticalNavHeader from "./VerticalNavHeader";

interface Props {
  hidden: boolean;
  navWidth: number;
  settings: Settings;
  children: ReactNode;
  navVisible: boolean;
  toggleNavVisibility: () => void;
  setNavVisible: (value: boolean) => void;
  verticalNavItems?: VerticalNavItemsType;
  saveSettings: (values: Settings) => void;
  verticalNavMenuContent?: (props?: any) => ReactNode;
  afterVerticalNavMenuContent?: (props?: any) => ReactNode;
  beforeVerticalNavMenuContent?: (props?: any) => ReactNode;
}

const StyledBoxForShadow = styled(Box)<BoxProps>({
  top: 50,
  left: -8,
  zIndex: 2,
  height: 75,
  display: "none",
  position: "absolute",
  pointerEvents: "none",
  width: "calc(100% + 15px)",
  "&.d-block": {
    display: "block",
  },
});

const Navigation = (props: Props) => {
  // ** Props
  const { hidden, afterVerticalNavMenuContent, beforeVerticalNavMenuContent, verticalNavMenuContent: userVerticalNavMenuContent } = props;

  // ** States
  const [groupActive, setGroupActive] = useState<string[]>([]);
  const [currentActiveGroup, setCurrentActiveGroup] = useState<string[]>([]);

  // ** Ref
  const shadowRef = useRef(null);

  // ** Fixes Navigation InfiniteScroll
  const handleInfiniteScroll = (ref: HTMLElement) => {
    if (ref) {
      // @ts-ignore
      ref._getBoundingClientRect = ref.getBoundingClientRect;

      ref.getBoundingClientRect = () => {
        // @ts-ignore
        const original = ref._getBoundingClientRect();

        return { ...original, height: Math.floor(original.height) };
      };
    }
  };

  const ScrollWrapper = Box;

  return (
    <Drawer {...props}>
      <VerticalNavHeader {...props} />
      <Box sx={{ height: "100%", position: "relative", overflow: "hidden" }}>
        {/* @ts-ignore */}
        <ScrollWrapper containerRef={(ref: any) => handleInfiniteScroll(ref)}>
          {beforeVerticalNavMenuContent ? beforeVerticalNavMenuContent(props) : null}
          <Box sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            {userVerticalNavMenuContent ? (
              userVerticalNavMenuContent(props)
            ) : (
              <List className="nav-items" sx={{ transition: "padding .25s ease", pr: 4.5 }}>
                <VerticalNavItems groupActive={groupActive} setGroupActive={setGroupActive} currentActiveGroup={currentActiveGroup} setCurrentActiveGroup={setCurrentActiveGroup} {...props} />
              </List>
            )}
          </Box>
        </ScrollWrapper>
      </Box>
      {afterVerticalNavMenuContent ? afterVerticalNavMenuContent(props) : null}
    </Drawer>
  );
};

export default Navigation;
