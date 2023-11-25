export default function ImgShowRoom(props) {
    const { item } = props;
    return (
        <img src={item?.imageStoreLink[0]?.fileUrl} className="w-full" />
    );
}