// import Banner from "./components/Banner";
import tableDataComplex from "./variables/tableDataComplex.json";
import ComplexTable from "../default/components/ComplexTable";
import { columnsDataComplex } from "../default/variables/columnsData";

// import NFt2 from "assets/img/nfts/Nft2.png";
// import NFt4 from "assets/img/nfts/Nft4.png";
// import NFt3 from "assets/img/nfts/Nft3.png";
// import NFt5 from "assets/img/nfts/Nft5.png";
// import NFt6 from "assets/img/nfts/Nft6.png";
// import avatar1 from "assets/img/avatars/avatar1.png";
// import avatar2 from "assets/img/avatars/avatar2.png";
// import avatar3 from "assets/img/avatars/avatar3.png";

// import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
// import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
// import HistoryCard from "./components/HistoryCard";
// import TopCreatorTable from "./components/TableTopCreators";
// import NftCard from "components/card/NftCard";

const Customers = () => {
  return (
    <ComplexTable columnsData={columnsDataComplex} tableData={tableDataComplex} />
  );
};


export default Customers;
