// ** React Imports
import { ReactNode } from "react";

// ** MUI Imports
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// ** Layout Imports
import VerticalLayout from "src/@core/layouts/VerticalLayout";

// ** Navigation Imports
import VerticalNavItems from "src/navigation/vertical";

// ** Component Import
import VerticalAppBarContent from "./components/vertical/AppBarContent";

// ** Hook Import
import { useSettings } from "src/@core/hooks/useSettings";
import { useRouter } from "next/router";

interface Props {
  children: ReactNode;
}

const UserLayout = ({ children }: Props) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings();

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/components/use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  const router = useRouter();

  const getLayout = () => {
    if (router.pathname === "/") {
      return <div>랜딩페이지</div>;
    } else {
      return (
        <VerticalLayout
          hidden={hidden}
          settings={settings}
          saveSettings={saveSettings}
          verticalNavItems={VerticalNavItems()} // Navigation Items
          verticalAppBarContent={(
            props // AppBar Content
          ) => <VerticalAppBarContent hidden={hidden} settings={settings} saveSettings={saveSettings} toggleNavVisibility={props.toggleNavVisibility} />}>
          {children}
        </VerticalLayout>
      );
    }
  };

  return getLayout();
};

export default UserLayout;
