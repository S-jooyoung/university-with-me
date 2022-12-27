// ** Icon imports
import HomeOutline from "mdi-material-ui/HomeOutline";
import AlarmMultiple from "mdi-material-ui/AlarmMultiple";
import AlarmCheck from "mdi-material-ui/AlarmCheck";

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
      icon: AlarmMultiple,
      path: "/real",
    },
    {
      title: "2022 경쟁률",
      icon: AlarmCheck,
      path: "/last",
    },
  ];
};

export default navigation;
