// ** Icon imports
import HomeOutline from "mdi-material-ui/HomeOutline";

// ** Type import
import { VerticalNavItemsType } from "src/@core/layouts/types";

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: "홈",
      icon: HomeOutline,
      path: "/",
    },
    {
      sectionTitle: "정시 경쟁률",
    },
    {
      title: "2023 실시간 경쟁률",
      icon: HomeOutline,
      path: "/real",
    },
    {
      title: "지난 경쟁률",
      icon: HomeOutline,
      path: "/last",
    },
  ];
};

export default navigation;
