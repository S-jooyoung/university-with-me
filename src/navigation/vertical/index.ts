// ** Icon imports
import HomeOutline from "mdi-material-ui/HomeOutline";

// ** Type import
import { VerticalNavItemsType } from "src/@core/layouts/types";

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: "전체",
      icon: HomeOutline,
      path: "/",
    },
    {
      sectionTitle: "카테고리",
    },
    // {
    //   title: "4년제",
    //   icon: AccountPlusOutline,
    //   path: "/pages/login",
    //   openInNewTab: true,
    // },
    // {
    //   title: "전문대학(교)",
    //   icon: AccountPlusOutline,
    //   path: "/pages/register",
    //   openInNewTab: true,
    // },
    // {
    //   title: "대학원",
    //   icon: AccountPlusOutline,
    //   path: "/pages/register",
    //   openInNewTab: true,
    // },
  ];
};

export default navigation;
