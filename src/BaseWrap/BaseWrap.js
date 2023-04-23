import ContentWrap from "../Components/ContentWrap"
import BottomMenuWrap from "../BottomMenu/BottomMenuWrap"
function BaseWrap() {
    return (
        <div className="BaseWrap">
            <ContentWrap />
            <BottomMenuWrap />
        </div>
    )
}

export default BaseWrap