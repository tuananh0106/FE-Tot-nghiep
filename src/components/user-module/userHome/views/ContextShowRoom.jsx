import { formatCurrency } from "@common/Utils";
import { STATUS_RENDER } from "@components/admin-module/am.02-room_manger/am.0201-list/views/Contant";

export function ContextShowRoom(props) {
    const { item } = props;

    return (
        <div className="info-wrap mt-3">
            <div className=" ">
                <div>
                    {`${item?.roomResponse?.nameHotel}`}
                </div>

                <div>
                    {`Phòng ${item?.roomResponse?.numberRoom} - Tầng ${item?.roomResponse?.floor}`}
                </div>

                <div>
                    {`Giá phòng: `}
                    <span
                        className="font-bold"
                        style={{ color: '#2EB553' }}
                    >
                        {formatCurrency(item?.roomResponse?.cost)}
                    </span>
                    {` VND`}
                </div>

                <div>
                    {`Loại phòng: ${item?.roomResponse?.roomType.map((room) => (" " + room.nameRoomType))}`}
                </div>

                <div>
                    {`Trạng thái: `}
                    {STATUS_RENDER(item?.roomResponse?.status)}
                </div>

            </div>
        </div>
    );
}