import ListMenuWindow from "@/screens/listMenuWindow";
import { APP_DATA } from "@/utils/constant";

const MenuPublicList = () => {
    return (
        <ListMenuWindow title="DANH MỤC" data={APP_DATA.MENU_PUBLIC_LIST} />
    );
}
export default MenuPublicList;