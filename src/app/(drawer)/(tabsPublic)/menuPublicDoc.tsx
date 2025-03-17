import ListMenuWindow from "@/screens/listMenuWindow";
import { APP_DATA } from "@/utils/constant";

const MenuPublicDoc = () => {
    return (
        <ListMenuWindow title="TÀI LIỆU" data={APP_DATA.MENU_PRIVATE_DOC} />
    );
}
export default MenuPublicDoc;